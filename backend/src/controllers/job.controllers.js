import { Job } from "../models/job.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateJobDescription } from "../utils/openAi.service.js";
import { User } from "../models/user.model.js";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

// Testing endpoints
const ping = (req, res) => {
  res.send({ msg: "API is healthy!" });
};
const authPing = (req, res) => {
  res.send("Job Auth is working");
};

const getJobs = asyncHandler(async (req, res) => {
  let query = {};

  // Pagination functionality
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Job.countDocuments(query);

  // Search functionality

  // if (req.query.search) {
  //   query.title = { $regex: req.query.search, $options: "i" };
  // }

  if (req.query.search) {
    query.description = { $regex: req.query.search, $options: "i" };
  }

  // Date posted filter
  if (req.query.datePosted) {
    const today = new Date();
    if (req.query.datePosted === "today") {
      query.datePosted = { $gte: new Date(today.setHours(0, 0, 0, 0)) };
    } else if (req.query.datePosted === "yesterday") {
      query.datePosted = {
        $gte: new Date(today.setDate(today.getDate() - 1)),
        $lt: new Date(today.setHours(0, 0, 0, 0)),
      };
    } else if (req.query.datePosted === "this_week") {
      query.datePosted = {
        $gte: new Date(today.setDate(today.getDate() - 7)),
      };
    } else if (req.query.datePosted === "this_month") {
      query.datePosted = {
        $gte: new Date(today.setMonth(today.getMonth() - 1)),
      };
    }
  }

  // Job type filter
  if (req.query.type) {
    query.type = req.query.type;
  }

  // Experience filter
  if (req.query.experience) {
    query.experience = { $lte: req.query.experience };
  }

  //Salary filters

  if (req.query.salaryFrom && req.query.salaryTo) {
    query.$or = [
      {
        "salaryRange.from": {
          $gte: req.query.salaryFrom,
          $lte: req.query.salaryTo,
        },
      },
      {
        "salaryRange.to": {
          $gte: req.query.salaryFrom,
          $lte: req.query.salaryTo,
        },
      },
      {
        "salaryRange.from": { $lte: req.query.salaryFrom },
        "salaryRange.to": { $gte: req.query.salaryTo },
      },
    ];
  }

  // Work mode filter
  if (req.query.workMode) {
    query.workMode = req.query.workMode;
  }

  if (req.query.location) {
    query.location = { $regex: req.query.location, $options: "i" };
  }

  const jobs = await Job.find(query)
    .populate({
      path: "employer",
      select: "userProfile.companyLogo  userProfile.companyName",
    })
    .sort({ datePosted: -1 })
    .skip(startIndex)
    .limit(limit)
    .select("-applicants -shortlistedCandidates");

  // Pagination result
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  if (!jobs.length) {
    return res
      .status(200)
      .json(new ApiResponse(200, { jobs, pagination }, "No Job found "));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { jobs, pagination }, "Jobs fetched successfully")
    );
});

const getJobById = asyncHandler(async (req, res, next) => {
  let job = await Job.findById(req.params.id)
    .populate({
      path: "employer",
      select: "userProfile.companyLogo  userProfile.companyName",
    })
    .select("-applicants -shortlistedCandidates");

  let jobCopy = await Job.findById(req.params.id);
  let numApplicants = jobCopy.applicants.length;

  // Convert the Mongoose document to a plain JavaScript object
  job = job.toObject();

  // Add the numberOfApplicants property
  job.numberOfApplicants = numApplicants;

  // Sanitize the job description
  job.description = DOMPurify.sanitize(job.description);

  if (!job) {
    return next(new ApiError(404, "Job not found in the database"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, job, "Job fetched successfully"));
});

const postJob = asyncHandler(async (req, res, next) => {
  const { role, _id } = req.user;
  if (role !== "employer") {
    throw new ApiError(403, "Only employers are authorized to post a job");
  }

  const { title, description } = req.body;

  if (!title) {
    throw new ApiError(400, "Title input is required.");
  }

  if (!description) {
    throw new ApiError(400, "Description input is required.");
  }

  const job = new Job({ ...req.body, employer: _id });
  await job.save();

  const company = await User.findById(_id);
  company.userProfile.jobListings.push(job._id);
  company.markModified("userProfile.jobListings");
  await company.save();

  return res
    .status(200)
    .json(new ApiResponse(200, job, "Job posted successfully"));
});

const sendJobDescription = asyncHandler(async (req, res) => {
  const { role, _id } = req.user;
  const jobDetails = req.body;

  if (role !== "employer") {
    throw new ApiError(
      403,
      "Unauthorized action. Only users with an 'employer' role are permitted to generate job descriptions."
    );
  }

  const user = await User.findById(_id);
  if (user.userProfile?.aiUseLimit < 1) {
    throw new ApiError(
      429,
      "Quota exceeded. The user has reached the limit for free job description generations. An upgrade to the plan is required to continue using this feature."
    );
  }

  const response = await generateJobDescription(jobDetails);

  if (response) {
    user.userProfile.aiUseLimit -= 1;
    await user.save();
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, response, "Job description generated successfully")
    );
});

const applyForJob = asyncHandler(async (req, res) => {
  const { role, _id } = req.user;
  const jobId = req.params.id;
  if (role !== "jobSeeker") {
    throw new ApiError(
      403,
      "Only applicants are authorized to apply for a job"
    );
  }

  const job = await Job.findById(jobId);
  if (!job) {
    throw new ApiError(404, "Job not found in the database");
  }
  if (job.applicants.includes(_id)) {
    throw new ApiError(400, "Job has already been applied for");
  }
  job.applicants.push(_id);
  job.markModified("applicants");
  await job.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Job applied successfully"));
});

const saveJob = asyncHandler(async (req, res) => {
  const { role, _id } = req.user;
  const jobId = req.params.id;
  if (role !== "jobSeeker") {
    throw new ApiError(403, "Only employers are authorized to save a job");
  }

  const user = await User.findById(_id);
  if (
    user.userProfile.savedJobs.some(
      (job) => job.toString() === jobId.toString()
    )
  ) {
    throw new ApiError(400, "Job is already saved");
  }

  user.userProfile.savedJobs.push(jobId);
  user.markModified("userProfile.savedJobs");
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Saved the job successfully"));
});

const getJobLocations = asyncHandler(async (req, res) => {
  let query = {};

  if (req.query.search) {
    query.location = { $regex: req.query.search, $options: "i" };
  }

  let locations = await Job.distinct("location", query);

  if (!locations.length) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No job locations found"));
  }

  if (locations.length > 5) {
    locations = locations.slice(0, 5);
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, locations, "Job locations fetched successfully")
    );
});

const getCompanies = asyncHandler(async (req, res) => {
  const companies = await User.find({
    role: "employer",
    "userProfile.doneOnboarding": true,
    "userProfile.jobListings.0": { $exists: true },
  }).select(
    "userProfile.companyName userProfile.companyLogo userProfile.jobListings userProfile.companySize userProfile.companySocialProfiles"
  );

  for (let company of companies) {
    for (let i = 0; i < company.userProfile.jobListings.length; i++) {
      const job = await Job.findById(company.userProfile.jobListings[i]).select(
        "title location _id"
      );
      company.userProfile.jobListings[i] = job;
    }
  }

  res
    .status(200)
    .json(new ApiResponse(200, companies, "Companies fetched successfully"));
});

const getSavedJobs = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const savedJobs = user.userProfile.savedJobs;

  for (let i = 0; i < savedJobs.length; i++) {
    let job = await Job.findById(savedJobs[i])
      .populate({
        path: "employer",
        select: "userProfile.companyLogo  userProfile.companyName",
      })
      .select("salaryRange _id title location");
    savedJobs[i] = job;
  }
  res
    .status(200)
    .json(new ApiResponse(200, savedJobs, "Saved jobs fetched successfully"));
});

const removeSavedJob = asyncHandler(async (req, res) => {
  const { role, _id } = req.user;
  const jobId = req.params.id;

  if (role !== "jobSeeker") {
    throw new ApiError(403, "Only job seekers are authorized to remove a job");
  }
  const user = await User.findById(_id);
  const index = user.userProfile.savedJobs
    .map((id) => id.toString())
    .indexOf(jobId.toString());

  if (index === -1) {
    throw new ApiError(400, "Job is not saved");
  }

  user.userProfile.savedJobs.splice(index, 1);
  user.markModified("userProfile.savedJobs");
  await user.save();
  return res

    .status(200)
    .json(
      new ApiResponse(200, {}, "Successfully removed job from saved jobs list")
    );
});

export {
  ping,
  authPing,
  getJobs,
  getJobById,
  postJob,
  sendJobDescription,
  applyForJob,
  saveJob,
  getJobLocations,
  getCompanies,
  getSavedJobs,
  removeSavedJob,
};

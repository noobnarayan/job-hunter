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
  res.send("Job API is working");
};
const authPing = (req, res) => {
  res.send("Job Auth is working");
};

const getJobs = asyncHandler(async (req, res) => {
  try {
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
  } catch (error) {
    throw new ApiError(
      500,
      `Something went wrong while fetching jobs from MongoDB:: ${error}`
    );
  }
});

const getJobById = asyncHandler(async (req, res, next) => {
  try {
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
  } catch (error) {
    throw new ApiError(
      500,
      `Something went wrong while fetching the job from MongoDB:: Error: ${error}`
    );
  }
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

  try {
    const job = new Job({ ...req.body, employer: _id });
    await job.save();

    const company = await User.findById(_id);
    company.userProfile.jobListings.push(job._id);
    return res
      .status(200)
      .json(new ApiResponse(200, job, "Job posted successfully"));
  } catch (error) {
    throw new ApiError(500, "An error occurred while creating the job");
  }
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

  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:
        "An error occurred while generating the job description. A retry is suggested.",
      error: error.message,
    });
  }
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

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      throw new ApiError(404, "Job not found in the database");
    }
    job.applicants.push(_id);
    job.markModified("applicants");
    await job.save();

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Job applied successfully"));
  } catch (error) {
    throw new ApiError(
      500,
      `An error occurred while applying for the job :: ${error}`
    );
  }
});

const saveJob = asyncHandler(async (req, res) => {
  const { role, _id } = req.user;
  const jobId = req.params.id;
  if (role !== "jobSeeker") {
    throw new ApiError(403, "Only employers are authorized to save a job");
  }
  try {
    const user = await User.findById(_id);
    user.userProfile.savedJobs.push(jobId);
    user.markModified("userProfile.savedJobs");
    await user.save();

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Saved the job successfully"));
  } catch (error) {
    throw new ApiError(500, "An error occurred while saving the job");
  }
});

const getJobLocations = asyncHandler(async (req, res) => {
  try {
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
  } catch (error) {
    throw new ApiError(
      500,
      `Something went wrong while fetching job locations from MongoDB:: ${error}`
    );
  }
});

const getCompanies = asyncHandler(async (req, res) => {
  try {
    const companies = await User.find({ role: "employer" }).select(
      "userProfile.companyName userProfile.companyLogo userProfile.jobListings userProfile.companySize"
    );

    res
      .status(200)
      .json(new ApiResponse(200, companies, "Companies fetched successfully"));
  } catch (error) {
    throw new ApiError(
      500,
      `Something went wrong while fetching job locations from MongoDB:: ${error}`
    );
  }
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
};

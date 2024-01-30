import { Job } from "../models/job.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
    if (req.query.search) {
      query.title = { $regex: req.query.search, $options: "i" };
    }

    // Date posted filter
    if (req.query.datePosted) {
      const today = new Date();
      if (req.query.datePosted === "Today") {
        query.datePosted = { $gte: new Date(today.setHours(0, 0, 0, 0)) };
      } else if (req.query.datePosted === "Yesterday") {
        query.datePosted = {
          $gte: new Date(today.setDate(today.getDate() - 1)),
          $lt: new Date(today.setHours(0, 0, 0, 0)),
        };
      } else if (req.query.datePosted === "This week") {
        query.datePosted = {
          $gte: new Date(today.setDate(today.getDate() - 7)),
        };
      } else if (req.query.datePosted === "This month") {
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
    if (req.query.experienceFrom && req.query.experienceTo) {
      query.experience = {
        from: { $gte: req.query.experienceFrom },
        to: { $lte: req.query.experienceTo },
      };
    }

    // Salary range filter
    if (req.query.salaryFrom && req.query.salaryTo) {
      query.salaryRange = {
        from: { $gte: req.query.salaryFrom },
        to: { $lte: req.query.salaryTo },
      };
    }

    // Work mode filter
    if (req.query.workMode) {
      query.workMode = req.query.workMode;
    }

    const jobs = await Job.find(query)
      .populate({
        path: "employer",
        select: "userProfile.companyLogo  userProfile.companyName",
      })
      .skip(startIndex)
      .limit(limit)
      .select("-applicants");

    if (!jobs.length) {
      throw new ApiError(404, "No jobs found in the database");
    }

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
      .select("-applicants");

    const numApplicants = await Job.countDocuments({
      _id: req.params.id,
      "applicants.0": { $exists: true },
    });

    // Convert the Mongoose document to a plain JavaScript object
    job = job.toObject();

    // Add the numberOfApplicants property
    job.numberOfApplicants = numApplicants;

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

    return res
      .status(200)
      .json(new ApiResponse(200, job, "Job posted successfully"));
  } catch (error) {
    throw new ApiError(500, "An error occurred while creating the job");
  }
});

export { ping, authPing, getJobs, getJobById, postJob };

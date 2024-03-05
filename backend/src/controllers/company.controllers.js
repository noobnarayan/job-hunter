import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Job } from "../models/job.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
const getAllJobListings = asyncHandler(async (req, res) => {
  const { _id, role } = req.user;
  if (role !== "employer") {
    throw new ApiError(401, "Unauthorized request, only employers are allowed");
  }

  const jobListings = await Job.find({
    employer: _id,
  });
  if (!jobListings) {
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "No job listings found"));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, jobListings, "Job listings fetched successfully")
    );
});
const getActiveJobListings = asyncHandler(async (req, res) => {
  const { _id, role } = req.user;
  if (role !== "employer") {
    throw new ApiError(401, "Unauthorized request, only employers are allowed");
  }
  const jobListings = await Job.find({
    employer: _id,
    active: true,
  });
  if (!jobListings) {
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "No job listings found"));
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        jobListings,
        "successfully fetched active job listings"
      )
    );
});

const getNonActiveJobListings = asyncHandler(async (req, res) => {
  const { _id, role } = req.user;
  if (role !== "employer") {
    throw new ApiError(401, "Unauthorized request, only employers are allowed");
  }
  const jobListings = await Job.find({
    employer: _id,
    active: false,
  });
  if (!jobListings) {
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "No job listings found"));
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        jobListings,
        "Succfully fetched non-active job listings"
      )
    );
});

const getAllApplications = asyncHandler(async (req, res) => {
  const { _id, role } = req.user;
  if (role !== "employer") {
    throw new ApiError(401, "Unauthorized request, only employers are allowed");
  }
  const applicants = await Job.aggregate([
    {
      $match: {
        employer: _id,
      },
    },
    {
      $match: {
        "applicants.0": { $exists: true },
      },
    },
    {
      $unwind: "$applicants",
    },
    {
      $project: {
        _id: 1,
        applicant: "$applicants",
        job: "$_id",
      },
    },
  ]);

  let final = [];

  for (const application of applicants) {
    const applicantId = application.applicant;
    const jobId = application.job;

    const applicatProfilePromise = User.findById(applicantId)
      .select(
        "_id userProfile.profilePicture userProfile.address userProfile.bio userProfile.location userProfile.yearsOfExperience userProfile.socialProfiles userProfile.workExperience userProfile.education userProfile.skills userProfile.name userProfile.resume "
      )
      .exec();
    const jobDetailsPromise = Job.findById(jobId).select("_id title").exec();

    const [applicantProfile, jobDetails] = await Promise.all([
      applicatProfilePromise,
      jobDetailsPromise,
    ]);

    final.push({ applicantProfile, jobDetails });
  }

  if (!final || final.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "No job listings found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, final, "Job listings fetched successfully"));
});

const getShortListedCandidates = asyncHandler(async (req, res) => {
  const { _id, role } = req.user;
  if (role !== "employer") {
    throw new ApiError(401, "Unauthorized request, only employers are allowed");
  }
  const shortlistedCandidates = await Job.aggregate([
    {
      $match: {
        employer: _id,
      },
    },
    {
      $match: {
        "shortlistedCandidates.0": { $exists: true },
      },
    },
    {
      $unwind: "$shortlistedCandidates",
    },
    {
      $project: {
        _id: 1,
        applicant: "$shortlistedCandidates",
        job: "$_id",
      },
    },
  ]);

  let final = [];

  for (const application of shortlistedCandidates) {
    const applicantId = application.applicant;
    const jobId = application.job;

    const applicatProfilePromise = User.findById(applicantId)
      .select(
        "_id userProfile.profilePicture userProfile.address userProfile.bio userProfile.location userProfile.yearsOfExperience userProfile.socialProfiles userProfile.workExperience userProfile.education userProfile.skills userProfile.name userProfile.resume "
      )
      .exec();
    const jobDetailsPromise = Job.findById(jobId).select("_id title").exec();

    const [applicantProfile, jobDetails] = await Promise.all([
      applicatProfilePromise,
      jobDetailsPromise,
    ]);

    final.push({ applicantProfile, jobDetails });
  }

  if (!final || final.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "No job listings found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, final, "Job listings fetched successfully"));
});

const removeFromApplications = asyncHandler(async (req, res) => {
  const { _id, role } = req.user;
  if (role !== "employer") {
    throw new ApiError(401, "Unauthorized request, only employers are allowed");
  }

  const { jobId, applicantId } = req.body;

  const job = await Job.findByIdAndUpdate(
    jobId,
    {
      $pull: {
        applicants: applicantId,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Applicant has been successfully removed from the job application."
      )
    );
});

const shortlistCandidate = asyncHandler(async (req, res) => {
  const { _id, role } = req.user;
  if (role !== "employer") {
    throw new ApiError(401, "Unauthorized request, only employers are allowed");
  }
  const { jobId, applicantId } = req.body;

  const job = await Job.findByIdAndUpdate(
    jobId,
    {
      $addToSet: {
        shortlistedCandidates: applicantId,
      },
      $pull: {
        applicants: applicantId,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        job,
        "Applicant has been successfully shortlisted and removed from the job application."
      )
    );
});

const removeFromShortlist = asyncHandler(async (req, res) => {
  const { _id, role } = req.user;
  if (role !== "employer") {
    throw new ApiError(401, "Unauthorized request, only employers are allowed");
  }
  const { jobId, applicantId } = req.body;

  const job = await Job.findByIdAndUpdate(
    jobId,
    {
      $pull: {
        shortlistedCandidates: applicantId,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Applicant has been successfully removed from shortlist."
      )
    );
});

export {
  getAllJobListings,
  getAllApplications,
  getActiveJobListings,
  getNonActiveJobListings,
  getShortListedCandidates,
  removeFromApplications,
  shortlistCandidate,
  removeFromShortlist,
};

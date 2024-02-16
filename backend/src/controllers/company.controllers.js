import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Job } from "../models/job.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const getAllJobListings = asyncHandler(async (req, res) => {
  const { _id, role } = req.user;
  if (role !== "employer") {
    throw new ApiError(401, "Unauthorized request, only employers are allowed");
  }
  try {
    const jobListings = await Job.find({
      employer: _id,
    });
    if (!jobListings) {
      throw new ApiError(404, "No job listings found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, jobListings, "Job listings fetched successfully")
      );
  } catch (error) {
    throw new ApiError(
      500,
      `Something went wrong while fetching the job listings from MongoDB:: Error: ${error}`
    );
  }
});

export { getAllJobListings };

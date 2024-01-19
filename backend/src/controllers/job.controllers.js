import { all } from "axios"
import { Job } from "../models/job.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

// Testing endpoints
const ping = (req, res) => {
    res.send("Job API is working")
}
const authPing = (req, res) => {
    res.send("Job Auth is working")
}

const getJobs = asyncHandler(async (req, res) => {
    try {
        const allJobs = await Job.find({})
        if (!allJobs) {
            return next(new ApiError(404, "No jobs found in the database"))
        }
        return res
            .status(200)
            .json(new ApiResponse(200, allJobs, "Jobs fetched successfully"))
    } catch (error) {
        throw new ApiError(500, "Something wrong while fetching jobs from mongoDB")
    }
})

const postJob = asyncHandler(async (req, res, next) => {

    const { role, _id } = req.user
    if (role !== "employer") {
        throw new ApiError(403, "Only employers are authorized to post a job")
    }

    const { title, description } = req.body

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
            .json(new ApiResponse(200, job, "Job posted successfully"))
    } catch (error) {
        throw new ApiError(500, "An error occurred while creating the job");
    }
});




export {
    ping,
    authPing,
    getJobs,
    postJob
}
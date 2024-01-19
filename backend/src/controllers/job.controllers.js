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

const postJobs = asyncHandler(async (req, res) => { })



export { ping, authPing }
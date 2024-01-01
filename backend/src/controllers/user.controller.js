import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
const registerUser = asyncHandler(async (req, res) => {
    const { email, password, role, userProfile } = req.body

    if (
        [email, password].some((field) => field?.trim() === "")

    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(409, "User already exists")
    }

    const username = email.split('@')[0];
    const user = await User.create({ email: email.toLowerCase(), username: username.toLowerCase(), password, role, userProfile })

    const createdUser = await User.findById(user._id).select("-password -refreshtoken")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(201, {}, "User registered successfully")
    )
})

export {
    registerUser
}

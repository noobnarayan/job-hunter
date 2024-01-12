import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

// Testing endpoints
const ping = (req, res) => {
    res.send("API is working")
}
const authPing = (req, res) => {
    res.send("Auth is working")
}


const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, `Something went wrong while generating referesh and access token: ${error}`)
    }
}

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

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email) {
        throw new ApiError(400, "Email is required")
    }

    if (!password) {
        throw new ApiError(400, "Password is required")
    }

    const user = await User.findOne({ email: email.toLowerCase() })

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const { refreshToken, accessToken } = await generateAccessAndRefereshTokens(user._id)

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        domain: process.env.NODE_ENV === 'production' ? 'your-production-url' : 'localhost'
    };

    res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { accessToken, refreshToken }, "User login successful"));

})



export {
    ping,
    authPing,
    registerUser,
    loginUser
}

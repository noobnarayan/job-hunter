import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.service.js"

// Testing endpoints
const ping = (req, res) => {
    res.send("User API is working")
}
const authPing = (req, res) => {
    res.send("User Auth is working")
}

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    domain: process.env.NODE_ENV === 'production' ? 'your-production-url' : 'localhost'
};

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


    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(200, { accessToken, refreshToken }, "User login successful"));

})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id,
        {
            $unset:
            {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, {}, "User logged out"))
})

const getUserProfile = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "User profile fetch successful"))
})

const updateUserProfile = asyncHandler(async (req, res) => {

})

const updateProfilePicture = asyncHandler(async (req, res) => {
    const profilePictureLocalPath = req.file?.path

    if (!profilePictureLocalPath) {
        throw new ApiError(400, "Profile Picture file is missing")
    }

    const profilePicture = await uploadOnCloudinary(profilePictureLocalPath)
    if (!profilePicture?.url) {
        throw new ApiError(400, "Error while uploading profile picture")
    }

    let user = await User.findById(req.user._id);

    if (user.role === 'jobSeeker') {
        user = await User.findByIdAndUpdate(req.user._id, {
            $set: {
                "userProfile.profilePicture": profilePicture.url
            }
        }, { new: true }).select("-password");
    } else if (user.role === 'employer') {
        user = await User.findByIdAndUpdate(req.user._id, {
            $set: {
                "userProfile.companyLogo": profilePicture.url
            }
        }, { new: true }).select("-password");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, user, "User profile picture updated successfully"))
})

export {
    ping,
    authPing,
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    updateProfilePicture
}

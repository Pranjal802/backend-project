import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // console.log("Request body:", req.body);
    // res.status(200).json({
    //     message: "User registered successfully",
    // });

    const {username, email, fullname, password} = req.body;
    console.log("email :" ,email);

    // if(username === "" || email === "" || fullname === "" || password === "") {
    //     throw new ApiError(400,"All fields are required");
    //     // return res.status(400).json({
    //     //     message: "All fields are required",
    //     // });
    // }

    if(
        [username, email, fullname, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400,"All fields are required");
    }

    const existedUser = User.findOne({
        $or : [{ username },{ email }]
    })

    if(existedUser) {
        throw new ApiError(409,"User with this Username or email is already exists");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.avatar[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar is required");
    }

    const user = await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user..!!")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
})



export {registerUser}
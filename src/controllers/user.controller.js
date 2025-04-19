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

    if(
        [username, email, fullname, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400,"All fields are required");
    }

    // const existedUser = await User.findOne({
    //     $or : [{ username },{ email }]
    // })
    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            // throw new ApiError(409,"User with this Username or email is already exists");
            // throw new ApiError(409, `A user with the username "${username}" or email "${email}" already exists.`);
            throw new ApiError(409, `A user with the username "${username}" or email "${email}" already exists.`);
        }
    } catch (error) {
        // res.status(500).json({ success: false, message: error.message });
        throw new ApiError(500, error.message);
    }

    // if(existedUser) {
    //     throw new ApiError(409,"User with this Username or email is already exists");
    // }

    const avatarLocalPath = req.files?.avatar[0]?.path
    // const coverImageLocalPath = req.files?.coverImage[0]?.path || null;
    let coverImageLocalPath;
    if(req.files && req.files.coverImage && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path;
    }else{
        coverImageLocalPath = null;
    }


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

// import { ApiError } from "../utils/ApiError.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import { User } from "../models/user.model.js";
// import { uploadOnCloudinary } from "../utils/Cloudinary.js";
// import { ApiResponse } from "../utils/ApiResponse.js";

// // const registerUser = asyncHandler(async (req, res) => {
//     const registerUser = asyncHandler(async (req, res) => {
//   const username = req.body.username?.toLowerCase();
//   const email = req.body.email?.toLowerCase();
//   const { fullname, password } = req.body;

//   console.log("email:", email);

//   if (
//     [username, email, fullname, password].some((field) => field?.trim() === "")
//   ) {
//     throw new ApiError(400, "All fields are required");
//   }

//   const existedUser = await User.findOne({
//     $or: [{ username }, { email }],
//   });

//   if (existedUser) {
//     throw new ApiError(
//       409,
//       "User with this Username or email is already exists"
//     );
//   }

//   const avatarLocalPath = req.files?.avatar?.[0]?.path;
//   const coverImageLocalPath = req.files?.coverimage?.[0]?.path;

//   if (!avatarLocalPath) {
//     throw new ApiError(400, "Avatar is required");
//   }

//   const avatar = await uploadOnCloudinary(avatarLocalPath);
//   const coverImage = coverImageLocalPath
//     ? await uploadOnCloudinary(coverImageLocalPath)
//     : null;

//   if (!avatar) {
//     throw new ApiError(400, "Avatar upload failed");
//   }

//   const user = await User.create({
//     fullname,
//     avatar: avatar.url,
//     coverImage: coverImage?.url || "",
//     email,
//     password,
//     username,
//   });

//   const createdUser = await User.findById(user._id).select(
//     "-password -refreshToken"
//   );

//   if (!createdUser) {
//     throw new ApiError(
//       500,
//       "Something went wrong while registering the user..!!"
//     );
//   }

//   return res
//     .status(201)
//     .json(new ApiResponse(200, createdUser, "User registered successfully"));
// });

import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { createRef } from "react";

export const registerUser = async (req, res) => {  
  const { fullName, email, username, password } = req.body;
  console.log("email:", email);

  if (
    [fullName, email, username, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({   
    $or: [{ username }, { email }]
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  const avatar = await uploadOnCloudinary(avatarLocalPath);        
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar){
    throw new ApiError(400,"avatar  file is required")
  }
 const user =await User.create({
  fullName,
  avatar: avatar.url,
  coverImage: coverImage?.url || " ",
  email,
  password,
  username: username.toLowerCase()
 })

 const createUser= await user.findById(user._id).select(
  "-password -refreshToken"
 )

 if(!createUser){
  throw new ApiError(500,"something went wrong while registered the user")
 }
  return res.status(201).json(
    new ApiResponse(200, createUser, "User registered successfully")
  )
}

const Profile = require("../models/Profile");
const User = require("../models/User");
const uploadImageToCloudinary = require("../utils/imageUploader");

exports.updateProfile = async (req, res) => {
  try {
    const { dateOfBirth = "", about = "", contactNumber } = req.body;
    const id = req.user.id;
    // if (!contactNumber || !gender) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "All fields are require",
    //   });
    // }
    const userDetails = await User.findById(id);
    const profile = await Profile.findById(userDetails.additionalDetails);

    profile.dateOfBirth = dateOfBirth;
    profile.about = about;
    profile.contactNumber = contactNumber;
    await profile.save();
    return res.status(200).json({
      success: true,
      message: "Profile Updated",
      profileDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Profile can not update, Please try again later",
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    console.log("PROFILE id: ", req.user.id);
    const id = req.user.id;
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    console.log("USER find: ", user);

    //issues here
    await Profile.findByIdAndDelete({ _id: user.additionalDetails });
    // TODO: Unenroll User From All the Enrolled Courses
    // Now Delete User
    await User.findByIdAndDelete({ _id: id });
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

    // await Profile.findByIdAndDelete({ id: user.additionalDetails });
    // console.log("Profile.findByAndDelete pass");
    // await User.findByIdAndDelete({ _id: id });
    // console.log("User.findByAndDelete pass");

    // //todo unenroll user from all enrolled courses
    // return res.status(200).json({
    //   success: true,
    //   message: "User deleted successfully",
    // });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Profile can not be deleted, Please try again later",
    });
  }
};

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    return res.status(200).json({
      success: true,
      message: "User Data fetched Successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "getAllUSerDetails errror",
      // message: error.message,
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    console.log(image);
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });

    // mine

    // try {
    //   const displayPicture = req.files.displayPicture;
    //   console.log("Enter in updateDisplayPicture");
    //   const userId = req.user.id;
    //   const image = await uploadImageToCloudinary(
    //     displayPicture,
    //     process.env.FOLDER_NAME,
    //     1000,
    //     1000
    //   );
    //   console.log("Image uploaded successfully in Clodinary");
    //   console.log(image);
    //   const updatedProfile = await User.findByIdAndUpdate(
    //     { _id: userId },
    //     { image: image.secure_url },
    //     { new: true }
    //   );
    //   res.send({
    //     success: true,
    //     message: `Image Updated successfully`,
    //     data: updatedProfile,
    //   });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      message: "Upload to cloudinary failed",
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findOne({
      _id: userId,
    })
      .populate("courses")
      .exec();
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

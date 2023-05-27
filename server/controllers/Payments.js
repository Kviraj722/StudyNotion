const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { default: mongoose } = require("mongoose");

const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");

 exports.capturePayment = async (req, res) => {
  //get CourseID and UserID

  const { course_id } = req.body;
  const userId = req.user.id;

  if (!course_id) {
    return res.json({
      success: false,
      message: "Please provide valid course ID",
    });
  }
  let course;
  try {
    course = await Course.findById(course_id);
    if (!course) {
      return res.json({
        success: false,
        message: "Could not find the course",
      });
    }

    // user already buy this course or not?
    const uid = new mongoose.Types.ObjectId(userId);
    if (course.studentsEnrolled.includes(uid)) {
      return res.status(200).json({
        success: false,
        message: "Student is already enrolled",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  //order create

  const amount = course.price;
  const currency = "INR";
  const options = {
    amount: amount * 100,
    currency,
    receipt: Math.random(Date.now()).toString(),
    notes: {
      courseId: course_id,
      userId,
    },
  };

  //function call
  try {
    const paymentResponse = await instance.orders.create(options);
    console.log(paymentResponse);
    return res.status(200).json({
      success: false,
      courseName: course.courseName,
      courseDescription: course.courserDescription,
      thumbnail: course.thumbnail,
      orderId: paymentResponse.id,
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Could not intitate order",
    });
  }
};

//verify signature

exports.verifySignature = async (req, res) => {
  const webhookSecret = "12345678";
  const signature = req.headers("x-razorpay-signature");

  crypto.shasum("sha256", webhookSecret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (signature === digest) {
    console.log("Payment is authorized");

    const { courseId, userId } = req.body.payload.payment.entity.notes;
    try {
      const enrolledCourse = await Course.findOneAndUpdate(
        { id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );
      if (!enrolledCourse) {
        return res.status(500).json({
          success: false,
          message: "Course not fond",
        });
      }
      console.log(enrolledCourse);

      const enrolledStudent = await User.findOneAndUpdate(
        { id: userId },
        { $push: { courses: courseId } },
        { new: true }
      );
      console.log(enrolledStudent);

      //sending mails

      const emailResponse = await mailSender(
        enrolledStudent.email,
        "Congratulation from studyNotion",
        "You are enrolled in course"
      );

      console.log(emailResponse);
      return res.status(200).json({
        success: true,
        message: "Signature verification and Course added",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "invalid request",
    });
  }
};

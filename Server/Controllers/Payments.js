const { default: mongoose } = require("mongoose");
const {instance} = require("../Config/razorpay");
const Course = require("../Models/Course");
const User = require("../Models/User");
const mailSender = require("../Utils/mailSender");
const { paymentSuccessEmail } = require("../mailTemplates/paymentSuccessEmail");
require("dotenv").config();
const crypto = require("crypto");
const CourseProgress = require("../Models/CourseProgress");

// const {courseEnrollmentEmail} = require("../mailTemplates/courseEnrollmentEmail");

// Capture the payment and initate the Razorpay order
// exports.capturePayment = async (req, res) => {
//     try{
//         // Get CourseId and UserID
//         const userId = req.user.id;
//         const {courseId} = req.body;
        
//         // Validation
//         if(! courseId || ! userId){
//             return res.status(400).json({
//                 success: false,
//                 message: "Please provide valid details",
//             });
//         }

//         // Valid CourseId
//         if(! courseId){
//             return res.status(400).json({
//                 success: false,
//                 message: "Please Provide valid Course Id",
//             });
//         }

//         // Valid CourseDetails
//         let course;
//         try{
//             course = await Course.findById(courseId);
//             if(! course){
//                 return res.status(400).json({
//                     success: false,
//                     message: "Couldn't find the course",
//                 })
//             }

//             // User already pay for same course
//             const uid = new mongoose.Types.ObjectId(userId);
//             if(course.studentsEnrolled.includes(uid)){
//                 return res.status(401).json({
//                     success: false,
//                     message: "User has already purchased the Course",
//                 });
//             }
//         }catch(error){
//             return res.status(500).json({
//                 success: false,
//                 message: `Error while validating the course Id :- ${error}`,
//             });
//         }

//         // Order Create
//         const amount = course.price;
//         const currency = "INR";

//         const options = {
//             amount: amount * 100,
//             currency,
//             receipt: Math.random(Date.now()).toString(),
//             notes: {
//                 courseId: courseId,
//                 userId: userId,
//             }
//         };

//         try{
//             // Initiate the payment using razorpay
//             const paymentResponse = await instance.orders.create(options);
//             console.log("Payment resp. :- ", paymentResponse);

//             // Return response
//             return res.status(200).json({
//                 success: true,
//                 courseName: course.courseName,
//                 courseDescription: course.courseDescription,
//                 thumbnail: course.courseThumbnail,
//                 orderId: paymentResponse.id,
//                 currency: paymentResponse.currency,
//                 amount: paymentResponse.amount,
//                 message: "Capture payment done Successfully",
//             });
//         }catch(error){
//             return res.status(500).json({
//                 success: false,
//                 message: `Couldn't Initiate order :- ${error} `,
//             });
//         }
//     }catch(error){
//         return res.status(500).json({
//             success: false,
//             message: `Payment Capture failed :- ${error}`,
//         })
//     }
// };

// // Verify signature of Razorpay and Server
// exports.verfiySignature = async (req, res) => {
//     try{
//         const webhookSecret = "12345678";
//         const signature = req.headers("x-razorpay-signature");

//         const shaSum = crypto.createHmac("sha256", webhookSecret);
//         shaSum.update(JSON.stringify(req.body));
//         const digest = shaSum.digest("hex");

//         if(signature === digest){
//             console.log("Payment is Authorised");

//             const {courseId, userId} = req.body.payload.payment.entity.notes;

//             try{
//                 // Fulfill the action
//                 // Find the course and enroll the student in it
//                 const enrolledCourse = await Course.findOneAndUpdate(
//                     {_id: courseId},
//                     {
//                         $push: {
//                             studentsEnrolled: userId,
//                         }
//                     },
//                     {new: true}
//                 );

//                 if(! enrolledCourse){
//                     return res.status(500).json({
//                         success: false,
//                         message: "Course not found",
//                     });
//                 }
//                 console.log("Enrolled Course :- ", enrolledCourse);

//                 // Find the student and add course in its courseList
//                 const enrolledStudent = await User.findOneAndUpdate(
//                     {_id: userId},
//                     {
//                         $push: {
//                             courses: courseId,
//                         }
//                     },
//                     {new: true},
//                 );

//                 console.log("Enrolled Student :- ", enrolledStudent);
//             }catch(error){
//                 return res.status(500).json({
//                     success: false,
//                     message: "Failure in fulfilling the signature verification actions",
//                 });
//             }

//             // Send the Mail of Confirmation
//             const emailResponse = await mailSender(
//                 enrolledStudent.email,
//                 "Congratultions, from StudyNotion",
//                 "Congratulations, you are onboarded to new Course"
//             );

//             console.log("Email Response :- ", emailResponse);
//             return res.status(200).json({
//                 success: true,
//                 message: "Signature verified Successfully",
//             });
//         }
//         else{
//             return res.status(400).json({
//                 success: false,
//                 message: "Signature doesn't matches",
//             });
//         }
//     }catch(error){
//         return res.status(500).json({
//             success: false,
//             message: "Failure in signature verification",
//         });
//     }
// };


// For multiple Items :- 
exports.capturePayment = async (req, res) => {
    try{
        const {courses} = req.body;
        const userId = req.user.id;

        // console.log("Courses :- ", courses)
        if(courses?.length === 0){
            return res.status(404).json({
                success: false,
                message: "Please provide course Id",
            });
        }

        let totalAmount = 0;
        for(const course_id of courses){
            let course;
            try{
                course = await Course.findById(course_id);

                if(! course){
                    return res.status(400).json({
                        success: false,
                        message: "Couldn't find the course"
                    });
                }

                const uid = new mongoose.Types.ObjectId(userId);
                if(course.studentsEnrolled.includes(uid)){
                    return res.status(400).json({
                        success: false,
                        message: "Student is already enrolled",
                    });
                }

                totalAmount += course.price;
            }catch(error){
                console.log("Error in finding total Amount", error);
                return res.status(500).json({
                    success: false,
                    message: `Error in calculating total Amount for courses :- ${error.message}`,
                });
            }
        }

        const options = {
            amount: totalAmount * 100,
            currency: "INR",
            receipt: Math.random(Date.now()).toString(),
        }

        try{
            const paymentResponse = await instance.orders.create(options);
            return res.status(200).json({
                success: true,
                message: "Payment successfully created",
                data: paymentResponse,
            });
        }catch(error){
            console.log("Error in creating payment");
            return res.status(500).json({
                success: false,
                message: `Error in creating payment :- ${error}`
            });
        }
    }catch(error){
        console.log("Error in order initiations");
        return res.status(500).json({
            success: false,
            message: `Error in order initiations :- ${error}`
        });
    }
}

exports.verifySignature = async (req, res) => {
    try{
        // console.log("Request :- ", req.body)
        const razorpay_order_id = req.body?.razorpay_order_id;
        const razorpay_payment_id = req.body?.razorpay_payment_id;
        const razorpay_signature = req.body?.razorpay_signature;

        const courses = req.body?.courses;
        const userId = req.user.id;

        if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
            return res.status(400).json({
                success: false,
                message: "Payment failed as something is empty"
            });
        }

        let body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

        if(expectedSignature === razorpay_signature){
            // Enroll Student
            await enrollStudents(courses, userId, res);
            
            //return response
            return res.status(200).json({
                success: true,
                message: "Payment Verified"
            });
        }
        return res.status(400).json({
            success: false,
            message: "Payment verification failed"
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Payment Failed",
        })
    }
}

async function enrollStudents (courses, userId, res) {
    try{
        if(! courses || ! userId){
            return res.status(400).json({
                success: false,
                message: "Please provide data of courses and User Id",
            });
        }

        for(const courseId of courses){
            //find the course and enroll student in it
            try{
                const enrolledCourse = await Course.findOneAndUpdate({_id: courseId},
                    {
                        $push: {
                            studentsEnrolled: userId,
                        }
                    },
                    {new: true},
                )
    
                if(! enrolledCourse){
                    return res.status(500).json({
                        success: false,
                        message: "Course not found",
                    });
                }

                const newCourseProgress = await CourseProgress.create({
                    courseID: courseId,
                    userId: userId,
                    completedVideos: [],
                });
    
                // Find the user and add course in their enrolled Courses list
                const enrolledStudent = await User.findByIdAndUpdate({_id: userId},
                    {
                        $push: {
                            courses: courseId,
                            courseProgress: newCourseProgress._id
                        },
                    },
                    {new: true},
                );
    
                // Send mail to student
                const emailResponse = await mailSender(enrollStudents.email,
                    "Name", "you have bought the course"
                );
                console.log("Email Sent successfully :- ", emailResponse);
            }
            catch(error){
                return res.status(400).json({
                    success: false,
                    message: `Error while buying course :- `
                })
            }
        }
    }catch(error){
        return res.status(400).json({
            success: false,
            message: `Error while buying course :- `
        });
    }
}

exports.sendPaymentSuccessEmail = async (req, res) => {
    try{
        const {orderId, paymentId, amount} = req.body;
        const userId = req.user.id;

        if(! orderId || ! paymentId || ! amount || !userId){
            return res.status(404).json({
                success: false,
                message: "Provide all valid details (i.e. Something is missing)"
            });
        }

        try{
            // Student Finding
            const enrolledStudent = await User.findById(userId);

            await mailSender(
                enrolledStudent?.email,
                "Payment Recieved",
                paymentSuccessEmail(`${enrolledStudent.firstName}`, amount/100, orderId, paymentId)
            )
        }catch(error){
            console.log("Error in sending mail", error);
            return res.status(500).json({
                success: false,
                message: "Couldn't send email"
            });
        }
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Couldn't send email"
        });
    }
}
import toast from "react-hot-toast";
import { studentEndpoints } from "../apis"
import { apiConnector } from "../apiConnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../reducer/slices/courseSlice";
import { resetCart } from "../../reducer/slices/cartSlice";

const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints

function loadScript(src){
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export const buyCourse = async (token, courses, userDetails, navigate, dispatch) => {
    const toastId = toast.loading("Loading...");

    console.log("Courses :- ", courses);
    try{
        // Load the Script;
        const res = loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(! res){
            toast.error("Razorpay SDK failed to load");
            return ;
        }

        // Initiate the order
        const orderResponse = await apiConnector("POST", 
            COURSE_PAYMENT_API, 
            {courses: courses},
            {
                Authorization: `Bearer ${token}`,
            }
        )

        console.log("Order response :- ", orderResponse);
        if(! orderResponse?.data?.success){
            throw new Error(orderResponse.data.message);
        }

        // Create options
        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: orderResponse.data.data.amount,
            order_id: orderResponse.data.data.id,
            name: "StudyNotion",
            description: "Thank You for purchasing the course",
            image: rzpLogo,
            prefill: {
                name: `${userDetails.firstName}`,
                email: userDetails?.email
            },
            handler: function(response){
                // Send Success mail
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token);
                
                // Verify Payments
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response){
            toast.error("OOPs, Payment failed");
            console.log(response);
        })
    }
    catch(error){
        console.log("Payment API error....", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token){
    try{
        await apiConnector("POST", 
            SEND_PAYMENT_SUCCESS_EMAIL_API, 
            {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount,
            },
            {
                Authorization: `Bearer ${token}`
            }
        )
    }catch(error){
        console.log("Payment success email API error :- ", error);

    }
}

// Verify Payment
async function verifyPayment(bodyData, token, navigate, dispatch){
    const toastId = toast.loading("Verifying Payment...");
    dispatch(setPaymentLoading(true));
    try{
        console.log("Body Data :- ", bodyData);
        const response = await apiConnector("POST", 
            COURSE_VERIFY_API, 
            bodyData, 
            {
                Authorization: `Bearer ${token}`,
            }
        )

        if(! response?.data?.success){
            throw new Error(response.data.message);
        }
        
        toast.success("Payment successfull");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }catch(error){
        console.log("Payment verify error", error);
        toast.error("Couldn't verify Payment");
    } 
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}
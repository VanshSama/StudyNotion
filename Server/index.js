const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 4000;

const userRoutes = require("./Routers/user");
const profileRoutes = require("./Routers/profile");
const courseRoutes = require("./Routers/Course");
const paymentRoutes = require("./Routers/Payments");
const contactUsRoute = require("./Routers/Contact");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const {cloudinaryConnect} = require("./Config/cloudinary");

const {dbConnect} = require("./Config/database");
dbConnect();

app.use(express.json());


app.use(cookieParser());
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);
cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running....",
	});
});

app.listen(PORT, () => {
    console.log(`App successfully started at Port :- ${PORT}`);
});
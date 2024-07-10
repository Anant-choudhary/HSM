const express = require("express");
const app = express();
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");

require("dotenv").config();
const PORT = process.env.PORT || 4000;


//database connect
database.connect();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)


//routes
app.use("/api/v1/admin" , adminRoutes);
app.use("/api/v1/user" , userRoutes);

//defult route
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....Tension not bro'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})
const User = require("../models/User");
const Profile = require("../models/Profile");
const Admin = require("../models/Admin");
const adminId = "668e39a6296a56910cfc529e";
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

exports.requestRegister = async (req, res) => {
  try {
    //destructure
    const { firstName, lastName, email, sid } = req.body;

    if (!firstName || !lastName || !email || !sid) {
      return res.status(403).json({
        success: false,
        message: "All Fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    const profileDetails = await Profile.create({
      batch: null,
      course: null,
      fatherName: null,
      roomNo: null,
      address: null,
      dateOfbirth: null,
      contactNumber: null,
    });

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      sid,
      profileDetails: profileDetails,
      status: "Pending",
      password: undefined,
    });

    await Admin.findByIdAndUpdate(
      {
        _id: adminId,
      },
      {
        $push: {
          requests: newUser._id,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: newUser,
      message: "newUser Created Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create newUser",
      error: error.message,
    });
  }
};



exports.userSignUp = async (req, res) => {
  try {
    const { email, password, confirmPassword, adminId } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "All Fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password do not match. Please try again.",
      });
    }

    const user = await User.findOne({ email });  // Use findOne instead of find

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    console.log(user.status);

    if (user.status !== "Approved") {
      return res.status(401).json({
        success: false,
        message: "User is not approved by admin",
      });
    }

    console.log(adminId);
    const admin = await Admin.findById("668e39a6296a56910cfc529e");  // Await for the result

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Check if the user is already signed up
    const isUserSignedUp = admin.users.some(userId => userId.equals(user._id));
    if (isUserSignedUp) {
      return res.status(401).json({
        success: false,
        message: "User already signed up",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        password: hashedPassword,
      },
      { new: true }
    );

    // Push in admin's user list
    await Admin.findByIdAndUpdate(
      "668e39a6296a56910cfc529e",
      {
        $push: {
          users: updatedUser._id,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "User signed up successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be signed up. Please try again.",
    });
  }
};

exports.login = async (req, res) => {
	try {
		// Get email and password from request body
		const { email, password } = req.body;

		// Check if email or password is missing
		if (!email || !password) {
			// Return 400 Bad Request status code with error message
			return res.status(400).json({
				success: false,
				message: `Please Fill up All the Required Fields`,
			});
		}

		// Find user with provided email
		const user = await User.findOne({ email })

		// If user not found with provided email
		if (!user) {
			// Return 401 Unauthorized status code with error message
			return res.status(401).json({
				success: false,
				message: `User is not Registered with Us Please SignUp to Continue`,
			});
		}

		// Generate JWT token and Compare Password
    const isValid = await bcrypt.compare(password, user.password)
		if (isValid) {
			const token = jwt.sign(
				{ email: user.email, id: user._id, accountType: user.accountType},
				process.env.JWT_SECRET,
				{
					expiresIn: "24h",
				}
			);

			// Save token to user document in database
			user.token = token;
			user.password = undefined;
			// Set cookie for token and return success response
			const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
			res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: `User Login Success`,
			});
		} else {
			return res.status(401).json({
				success: false,
				message: `Password is incorrect`,
			});
		}
	} catch (error) {
		console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
		});
	}
};
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const User = require("../models/User")
const adminId = "668e39a6296a56910cfc529e";

exports.adminRegister = async (req,res) => {
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        } = req.body;


        if(!firstName || !lastName || !email || !password || !confirmPassword){
            return res.status(400).json({
				success: false,
				message: "User already exists. Please sign in to continue.",
			});
        }

        if(password !== confirmPassword) {
            return res.status(400).json({
                success:false,
                message:"ConfirmPassword not matched"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
            firstName,
			lastName,
			email,
            password:hashedPassword,
        })

        return res.status(200).json({
			success: true,
			admin,
			message: "admin registered successfully",
		});
    }catch(error){
        console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
    }
};

exports.approveRequest = async (req,res) => {
    try{
        const { userId } = req.body;

        const user = await User.findById(userId);

        if(!user){
            return res.status(401).json({
                success:false,
                message:"invalid userId"
            })
        }

        if(user.status == "Approved"){
            return res.status(401).json({
                success:false,
                message:"user already approved"
            })
        }

        await Admin.findByIdAndUpdate(adminId , {
            $pull:{
                requests:userId,
            }
        },{ new: true })

        const updatedUser = await User.findByIdAndUpdate(userId , {
            status:"Approved"
        },{new: true});   
        
        //send mail to user
        await mailSender(
			email,
			"Kurukshetra Hostel",
			"You successfully apporved by Hostel management Please go and signUp"
		);
        
        res.status(200).json({
            success: true,
            message: "User approved successfully",
            user: updatedUser
        });

    }catch(error){
        // Handle errors
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
    }
}

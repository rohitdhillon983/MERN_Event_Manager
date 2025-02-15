const otpGenerator = require("otp-generator")
const OTP = require("../models/OTP")
const User = require("../models/User");
const  mailSender = require("../utils/mailSender");

const otpCreate =async (req, res) => {  
    try {
        const {email} = req.body;
        
        const user = await User.findOne({email:email});
        if(user){
            console.log("user already exist")
            res.status(404).json({
                success:false,
                message:"Email already exist!"
            })
        }

        if(!email){
            res.status(404).json({
                success:false,
                message:"Email not found!"
            })
        }

        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
          })
        
          await mailSender(email, "OTP Authentication",`your OTP for Verification is ${otp}. Please Enter the valid OTP`);

        const otpPayload = { email, otp } 
        const otpBody = await OTP.create(otpPayload)
        console.log(otpBody)
        res.status(200).json({
            success: true,
            message: `OTP Sent Successfully`,
            otp,
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, error: error.message })
    }
};

module.exports = otpCreate;
const twilioClient = require("../config/twilio");
const User = require("../models/user.model");

exports.sendOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({
        message: "Phone number is required"
      });
    }

    await twilioClient.verify
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications
      .create({
        to: phoneNumber,
        channel: "sms"
      });

    res.status(200).json({
      message: "OTP sent successfully"
    });
  } catch (error) {
    console.error("Send OTP Error:", error.message);
    res.status(500).json({
      message: "Failed to send OTP"
    });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    // validation
    if (!phoneNumber || !otp) {
      return res.status(400).json({
        message: "Phone number and OTP are required"
      });
    }

    // verify OTP with Twilio
    const verificationCheck = await twilioClient.verify
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks
      .create({
        to: phoneNumber,
        code: otp
      });

    if (verificationCheck.status !== "approved") {
      return res.status(400).json({
        message: "Invalid or expired OTP"
      });
    }

    // create or update user
    let user = await User.findOne({ phoneNumber });

    if (!user) {
      user = await User.create({
        phoneNumber,
        isVerified: true
      });
    } else {
      user.isVerified = true;
      await user.save();
    }

    return res.status(200).json({
      message: "OTP verified successfully",
      user
    });
  } catch (error) {
    console.error("Verify OTP Error:", error.message);
    return res.status(500).json({
      message: "OTP verification failed"
    });
  }
};

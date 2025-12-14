const twilioClient = require("../config/twilio");

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

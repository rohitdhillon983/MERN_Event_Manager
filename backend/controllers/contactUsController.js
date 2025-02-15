const  mailSender = require("../utils/mailSender");

exports.contactUs = async (req, res) => {
    const { lastName, firstName, email, message } = req.body;
    try {
        await mailSender("rohitdhillon983@gmail.com", "Contact Us", `Hii, ${firstName} ${lastName} \n Email : ${email} \n Message : ${message}`);
        await mailSender(email, "Contact Us Reply ", `Hii, ${firstName} ${lastName} \n Thanks for reaching out to us. We will get back to you soon.`);
        res.status(200).json({ message: "Email sent successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
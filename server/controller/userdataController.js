const jwt = require("jsonwebtoken");
const UserData = require("../model/userdata");
const userdata = new UserData();

exports.getUserData = async (req, res) => {
  const token = req.cookies.authToken;
  try {
    const decoded = jwt.verify(token, process.env.JWT_PASS);
    const data = await userdata.getUserData(decoded.userid);
    res.json({
      isSuccess: true,
      userdata: data,
    });
  } catch (err) {
    res.json({ isSuccess: false, message: "Invalid Token." });
  }
};

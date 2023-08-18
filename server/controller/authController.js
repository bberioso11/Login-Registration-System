const jwt = require("jsonwebtoken");
const Authentication = require("../model/authentication");
const UserData = require("../model/userdata");

const userdata = new UserData();
const authentication = new Authentication();

exports.register = async (req, res) => {
  const form = req.body;
  const response = await authentication.register(form);
  res.json(response);
};

exports.login = async (req, res) => {
  const form = req.query;
  const response = await authentication.login(form);
  if (!response.isSuccess) {
    res.json(response);
  } else {
    const token = jwt.sign({ userid: response.userid }, process.env.JWT_PASS, {
      expiresIn: "7d",
    });
    res.cookie("authToken", token, {
      secure: true,
      httpOnly: true,
      maxAge: 604800000,
    });
    res.json(response);
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("authToken");
  res.end();
};

exports.validateToken = async (req, res) => {
  const token = req.cookies.authToken;
  if (!token) {
    res.json({ isValid: false, message: "Missing Token" });
  } else {
    try {
      jwt.verify(token, process.env.JWT_PASS);
      res.json({
        isValid: true,
      });
    } catch (err) {
      res.json({ isValid: false, message: "Invalid Token." });
    }
  }
};

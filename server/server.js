const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const userdataRoutes = require("./routes/userdataRoutes");
require("dotenv").config();
const app = express();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.json());
app.use(cookieParser());

app.use("/api/authenticate", authRoutes);
app.use("/api/userdata", userdataRoutes);

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const appRoute = require("./routes/index");

const app = express();

//Implement cors
app.use(cors());

app.options("*", cors());

// Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.use('/mimi',appRoute);

app.all("*", (req, res, next) => {
  console.log(req.params)
  return res.status(500).json({
    status: false,
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

module.exports = app;

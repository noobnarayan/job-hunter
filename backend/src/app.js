import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PRODUCTION_URL } from "./constants.js";
export const app = express();
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? `${PRODUCTION_URL}`
        : "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import userRouter from "./routes/user.routes.js";
import jobRouter from "./routes/jobs.routes.js";
import companyRouter from "./routes/company.routes.js";
// routes declearation

app.use("/api/v1/users", userRouter);
app.use("/api/v1/", jobRouter);
app.use("/api/v1/company/", companyRouter);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json(err);
});

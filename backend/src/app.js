import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

export const app = express()
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'your-production-url' : 'http://localhost:5173',
    credentials: true
}));


app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

// routes import
import userRouter from "./routes/user.routes.js"
import jobRouter from "./routes/jobs.routes.js"
// routes declearation

app.use("/api/v1/users", userRouter)
app.use("/api/v1/", jobRouter)
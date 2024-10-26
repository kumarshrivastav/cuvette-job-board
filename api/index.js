import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path"
import ConnectDB from "./utils/db.js";
import helmet from "helmet";
import session from "express-session";
import userRouter from "./routes/user.routes.js";
import jobRouter from "./routes/job.routes.js"
const app = express();
dotenv.config({});
const __dirname=path.resolve()
const corsOptons = {
  credentials: true,
  origin: ["http://localhost:5173"],
};
ConnectDB();
app.use(helmet());
app.disable("x-powered-by");
app.use(cors(corsOptons));
app.use(cookieParser());
app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: "thisismysessionsecret",
    name: "sessoin-cookie",
    cookie: { maxAge:1000* 60 * 60 * 24 * 7, httpOnly: true, secure: false },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth/v1", userRouter);
app.use("/api/auth/v1",jobRouter)
app.use(express.static(path.join(__dirname,'/client/dist')))
app.get("*",(req,res)=>(
  res.sendFile(path.join(__dirname,'client','dist','index.html'))
))

const server = app.listen(8000, () => {
  console.log(`Server Started at http://localhost:${server.address().port}`);
});

app.use((err, req, res, next) => {
  const errorStatusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal Server Error";
  res.status(errorStatusCode).send(errorMessage);
});

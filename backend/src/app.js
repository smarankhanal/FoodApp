import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";

import adminRouter from "./routes/admin.routes.js";
import { corsOptions } from "./config/corsConfig.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use(errorHandler);

export default app;

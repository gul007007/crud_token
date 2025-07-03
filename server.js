// import express from "express";
// import connectDB from "./database/config/dbConnection.js";
// import cors from "cors";
// import dotenv from "dotenv";

// // allow cookies in req.cookie at controller
// import cookieParser from "cookie-parser";

// //middleware
// import cookieCheck from "./middleware/cookieCheck.js";

// //routes
// import registerRouter from "./router/registerRouter.js";
// import loginRouter from "./router/loginRouter.js";
// import saveTaskRouter from "./router/saveTaskRouter.js";
// import fetchTaskRouter from "./router/fetchTaskRouter.js";
// import checkboxUpdateHandler from "./router/checkboxUpdateHandler.js";
// import editRouter from "./router/editRouter.js";
// import deleteRouter from "./router/deleteRouter.js"
// import logoutRoutes from "./router/logoutRouter.js"
// dotenv.config();
// const app = express();

// app.use(express.json());
// // app.use(cors({ origin: "http://localhost:5173" }));
// app.use(cookieParser());

// connectDB()
//   .then(() => console.log("MongoDB Atlas connected"))
//   .catch((error) => {
//     console.error("DB connection error:", error);
//     process.exit(1);
//   });

// app.use("/api/register", registerRouter);
// app.use("/api/login", loginRouter);
// app.use("/api/newAccessTokenGeneration", loginRouter);

// app.use("/api/saveTask", cookieCheck, saveTaskRouter);
// app.use("/api/fetchTask", cookieCheck, fetchTaskRouter);
// app.use("/api/updateCheckbox", cookieCheck, checkboxUpdateHandler);
// app.use("/api/editReq", cookieCheck, editRouter);
// app.use('/api/deleteTask', cookieCheck, deleteRouter);
// app.use("/api/logout",cookieCheck, logoutRoutes);

// app.listen(5000, () => console.log("Backend running on port 5000"));

// deployment code
import express from "express";
import connectDB from "./database/config/dbConnection.js";
import cors from "cors";
import dotenv from "dotenv";

// allow cookies in req.cookie at controller
import cookieParser from "cookie-parser";

//middleware
import cookieCheck from "./middleware/cookieCheck.js";

//routes
import registerRouter from "./router/registerRouter.js";
import loginRouter from "./router/loginRouter.js";
import saveTaskRouter from "./router/saveTaskRouter.js";
import fetchTaskRouter from "./router/fetchTaskRouter.js";
import checkboxUpdateHandler from "./router/checkboxUpdateHandler.js";
import editRouter from "./router/editRouter.js";
import deleteRouter from "./router/deleteRouter.js";
import logoutRoutes from "./router/logoutRouter.js";
dotenv.config();
const app = express();

app.use(express.json());
// add frontend URL
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

connectDB()
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((error) => {
    console.error("DB connection error:", error);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;

app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/newAccessTokenGeneration", loginRouter);

app.use("/api/saveTask", cookieCheck, saveTaskRouter);
app.use("/api/fetchTask", cookieCheck, fetchTaskRouter);
app.use("/api/updateCheckbox", cookieCheck, checkboxUpdateHandler);
app.use("/api/editReq", cookieCheck, editRouter);
app.use("/api/deleteTask", cookieCheck, deleteRouter);
app.use("/api/logout", cookieCheck, logoutRoutes);

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

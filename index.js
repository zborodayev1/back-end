import multer from "multer";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./server/validations.js";
import { checkAuth, handleValidationsErrors } from "./server/utils/index.js";
import { UserController, PostController } from "./server/controllers/index.js";

mongoose
  .connect(
    "mongodb+srv://root:pass@cluster0.r8mza.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0",
  ) 
  .then(() => {
    console.log("DB connect!");
  })
  .catch((err) => {
    console.log("DB error", err);
  });

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.get("/profile/:id",checkAuth, UserController.getProfile);
app.get("/auth/me", checkAuth, UserController.getMe);
app.get("/tags", PostController.getLastTags);
app.get("/posts", PostController.getAll);
// app.get("/posts/tags", PostController.getLastTags);
app.get("/posts/:id", PostController.getOne);

app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationsErrors,
  PostController.create,
);
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({ url: `/uploads/${req.file.originalname}` });
});

app.post(
  "/auth/login",
  loginValidation,
  handleValidationsErrors,
  UserController.login,
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationsErrors,
  UserController.register,
);


app.delete("/posts/:id", checkAuth, PostController.remove);

app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationsErrors,
  PostController.update,
);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});

import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { uploadMovie, getMovies } from "../Controller/movie.controller.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.use(
  "../client/public/moviedata",
  express.static(path.join(__dirname, "../client/public/moviedata/"))
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/moviedata/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/check", (req, res) => {
  res.send("hello");
});

router.post(
  "/upload",
  upload.fields([
    { name: "titleImg" },
    { name: "bgImg" },
    { name: "movieFile" },
  ]),
  uploadMovie
);

router.get("/movies", getMovies);
export default router;

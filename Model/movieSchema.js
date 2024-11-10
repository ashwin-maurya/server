import mongoose from "mongoose";
const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  length: String,
  age: String,
  date: String,
  des: String,
  category: String,
  titleImg: String,
  bgImg: String,
  movieFile: String,
});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;

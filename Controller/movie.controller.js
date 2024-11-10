
import Movie from "../Model/movieSchema.js";


export const uploadMovie = async (req, res) => {
  const { title, year, length, age, date, des, category } = req.body;

  try { 
    const newMovie = new Movie({
      title,
      year,
      length,
      age,
      date,
      des,
      category,
      titleImg: req.files.titleImg[0].filename,
      bgImg: req.files.bgImg[0].filename,
      movieFile: req.files.movieFile[0].filename,
    });
    await newMovie.save();
    res
      .status(201)
      .json({ message: "Movie uploaded successfully", movie: newMovie });
  } catch (error) {
    res.status(500).json({ message: "Error uploading movie", error });
  }
};


export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies", error });
  }
};

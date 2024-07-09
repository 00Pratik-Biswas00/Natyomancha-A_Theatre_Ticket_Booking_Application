// import asyncHandler from "express-async-handler";
// import Movie from "../models/movieModel.js";
// import slugify from "slugify";
// import mongoose from "mongoose";

// // ************************* PUBLIC CONTROLLERS *********************

// // Get all movies

// export const getAllMovies = asyncHandler(async (req, res) => {
//     try {
//         const movies = await Movie.find({})
//             .populate("casts.person")
//             .populate("crews.person");

//         res.status(200).json(movies);
//     } catch (error) {
//         // Catch and handle any errors that occur during the process
//         res.status(400);
//         throw new Error(error.message);
//     }
// });

// // Get movie by slug

// export const getMovieBySlugId = asyncHandler(async (req, res) => {
//     const slug = req.params.slug;
//     // find movie by slug in database
//     const movie = await Movie.findOne({ slug: slug })
//         .populate("reviews.userId")
//         .populate("casts.person")
//         .populate("crews.person");
//     // if the movie is found, send it to the client
//     if (movie) {
//         res.json(movie);
//     } else {
//         res.status(404);
//         throw new Error("Movie not found");
//     }
// });

// // ************************* PRIVATE CONTROLLERS *********************

// // Create movie review

// export const createMovieReview = asyncHandler(async (req, res) => {
//     const { rating, comment } = req.body;
//     // find movie by id in database
//     const movie = await Movie.findById(req.params.id);

//     if (movie) {
//         // check if the user already reviewed the movie
//         const alreadyReviewed = movie.reviews.find(
//             (r) => r.userId.toString() === req.user._id.toString()
//         );

//         // if the user already reviewed the movie, send 400 error
//         if (alreadyReviewed) {
//             res.status(400);
//             throw new Error("You already reviewed the movie");
//         }
//         // otherwise create a new review
//         const review = {
//             userId: req.user._id,
//             rating: Number(rating),
//             comment,
//         };
//         // push the new review to the reviews array
//         movie.reviews.push(review);
//         // increment the number of reviews
//         movie.numberOfReviews = movie.reviews.length;

//         // calculate the new averageRating
//         movie.averageRating =
//             movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
//             movie.reviews.length;

//         // save the movie in database
//         await movie.save();
//         // send the new movie to the client
//         res.status(200).json({
//             message: "Review added",
//         });
//     } else {
//         res.status(404);
//         throw new Error("Movie not found");
//     }
// });

// // ************************* ADMIN CONTROLLERS *********************

// // Add a movie

// export const createMovie = asyncHandler(async (req, res) => {
//     try {
//         // get data from the request body
//         const {
//             title,
//             description,
//             coverImage,
//             poster,
//             genres,
//             language,
//             releaseDate,
//             duration,
//             video,
//             casts,
//             crews,
//         } = req.body;

//         const formatDate = (date) => {
//             return new Date(date)
//                 .toLocaleDateString("en-GB")
//                 .replace(/\//g, "");
//         };
//         const slug = slugify(`${title}-${formatDate(releaseDate)}`, {
//             remove: /[*+/~.()'"!:@]/g,
//         }).toLowerCase();

//         // create a mew movie
//         const movie = new Movie({
//             userId: req.user._id,
//             title,
//             slug,
//             description,
//             coverImage,
//             poster,
//             genres,
//             language,
//             releaseDate,
//             duration,
//             video,
//             casts,
//             crews,
//         });

//         // save the movie in database
//         if (movie) {
//             const createdMovie = await movie.save();
//             res.status(201).json(createdMovie);
//         } else {
//             res.status(400);
//             throw new Error("Invalid movie data");
//         }
//     } catch (error) {
//         res.status(400);
//         throw new Error(error.message);
//     }
// });

// // Update a movie

// export const updateMovie = asyncHandler(async (req, res) => {
//     // get data from the request body
//     const {
//         title,
//         description,
//         coverImage,
//         poster,
//         genres,
//         language,
//         releaseDate,
//         duration,
//         video,
//         casts,
//         crews,
//     } = req.body;

//     // find movie by id in database
//     const movie = await Movie.findById(req.params.id);

//     const formatDate = (date) => {
//         return new Date(date).toLocaleDateString("en-GB").replace(/\//g, "");
//     };

//     let slug;
//     if (title) {
//         slug = slugify(
//             `${title}-${
//                 releaseDate
//                     ? formatDate(releaseDate)
//                     : formatDate(movie.releaseDate)
//             }`,
//             {
//                 remove: /[*+/~.()'"!:@]/g,
//             }
//         ).toLowerCase();
//     }
//     if (movie) {
//         // update movie data
//         movie.title = title || movie.title;
//         movie.slug = slug || movie.slug;
//         movie.description = description || movie.description;
//         movie.coverImage = coverImage || movie.coverImage;
//         movie.poster = poster || movie.poster;
//         movie.genres = genres || movie.genres;
//         movie.language = language || movie.language;
//         movie.releaseDate = releaseDate || movie.releaseDate;
//         movie.duration = duration || movie.duration;
//         movie.video = video || movie.video;
//         movie.casts = casts || movie.casts;
//         movie.crews = crews || movie.crews;

//         // save the movie in database
//         const updatedMovie = await movie.save();
//         // send the updated movie to the client
//         res.status(201).json(updatedMovie);
//     } else {
//         res.status(404);
//         throw new Error("Movie not found");
//     }
// });

// // Delete a movie

// export const deleteMovie = asyncHandler(async (req, res) => {
//     // find movie by id in database
//     const movie = await Movie.findById(req.params.id);
//     // if the movie is found, delete it
//     if (movie) {
//         await Movie.deleteOne({ _id: req.params.id }); // Use deleteOne() method instead of movie.remove() method
//         res.json({ message: "Movie removed successfully" });
//     }
//     // if the movie is not found, send 404 error
//     else {
//         res.status(404);
//         throw new Error("Movie not found");
//     }
// });

// // Delete all movie

// export const deleteAllMovies = asyncHandler(async (req, res) => {
//     try {
//         // delete all movies
//         await Movie.deleteMany({});
//         res.json({ message: "All movies removed" });
//     } catch (error) {
//         res.status(400);
//         throw new Error(error.message);
//     }
// });

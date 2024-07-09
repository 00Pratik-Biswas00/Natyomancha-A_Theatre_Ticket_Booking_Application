// import mongoose from "mongoose";

// const movieCineastSchema = new mongoose.Schema({
//   person: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Cineast",
//     required: true,
//   },
//   role: {
//     type: String,
//   },
// });

// const reviewSchema = new mongoose.Schema(
//   {
//     rating: { type: Number, required: true },
//     comment: { type: String, required: true },
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const moviesSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     title: {
//       type: String,
//       required: true,
//     },
//     slug: {
//       type: String,
//       lowercase: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     coverImage: {
//       type: String,
//       required: true,
//     },
//     poster: {
//       type: String,
//       required: true,
//     },
//     genres: {
//       type: Array,
//       required: true,
//     },
//     language: {
//       type: String,
//       required: true,
//     },
//     releaseDate: {
//       type: Date,
//       required: true,
//     },
//     duration: {
//       type: Number,
//       required: true,
//     },
//     video: {
//       type: String,
//       //required: true,
//     },
//     averageRating: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     numberOfReviews: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     reviews: [reviewSchema],
//     casts: [movieCineastSchema],
//     crews: [movieCineastSchema],
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model("Movie", moviesSchema);

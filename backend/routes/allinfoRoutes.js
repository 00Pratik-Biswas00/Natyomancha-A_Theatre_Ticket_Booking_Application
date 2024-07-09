// import express from "express";
// import { admin, authenticate } from "../middlewares/auth.js";
// import asyncHandler from "express-async-handler";
// import User from "../models/userModel.js";
// import Movie from "../models/movieModel.js";
// import Show from "../models/showModel.js";
// import Booking from "../models/bookingModel.js";

// const router = express.Router();

// // ***************** ADMIN ROUTES ***********************
// router.get("/", authenticate, admin,
//     asyncHandler(async (req, res) => {
//         try {
//             const totalUsers = await User.countDocuments({});
//             const totalSubscribers = await User.countDocuments({
//                 isSubscriber: true,
//             });
//             const totalMovies = await Movie.countDocuments({});
//             const totalShows = await Show.countDocuments({});
//             const totalBookings = await Booking.countDocuments({});
//             res.json({
//                 totalUsers: totalUsers,
//                 totalSubscribers: totalSubscribers,
//                 totalMovies: totalMovies,
//                 totalShows: totalShows,
//                 totalBookings: totalBookings,
//             });
//         } catch (error) {
//             res.status(400).json({ message: error.message });
//         }
//     })
// );

// router.get("/revenue", authenticate, admin,
//     asyncHandler(async (req, res) => {
//         const { year } = req.query;
//         const currentMonth = new Date().getMonth() + 1;

//         const revenues = [];

//         for (let i = 0; i < 6; i++) {
//             const month = currentMonth - i;
//             const startDate = new Date(year, month - 1, 1);
//             const endDate = new Date(year, month, 0);

//             const bookings = await Booking.find({
//                 createdAt: { $gte: startDate, $lt: endDate },
//             });

//             const bookingRevenue = bookings.reduce(
//                 (total, booking) => total + booking.totalAmount,
//                 0
//             );

//             const subscribers = await User.find({
//                 isSubscriber: true,
//                 subscriptionStart: { $lte: endDate },
//                 $or: [
//                     { subscriptionEnd: { $gte: startDate } },
//                     { subscriptionEnd: { $exists: false } },
//                 ],
//             });

//             const subscriptionRevenue = subscribers.length * 50; // Assuming subscription price is $10

//             revenues.push({
//                 month,
//                 year,
//                 bookingRevenue,
//                 subscriptionRevenue,
//             });
//         }

//         res.status(200).json(revenues);
//     })
// );

// export default router;

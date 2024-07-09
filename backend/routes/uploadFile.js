import express from "express";
// import AWS from "aws-sdk";
import multer from "multer";
// import multerS3 from "multer-s3";
import storage from "../config/firebaseStorage.js";

const uploadRouter = express.Router();

const uploadImage = multer({
  storage: multer.memoryStorage(),
});

uploadRouter.post("/image", uploadImage.single("file"), async (req, res) => {
  try {
    // Check if file is present in request
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a file" });
    }

    // get file from request
    const file = req.file;

    // create new filename
    const fileName = Date.now() + "-" + file.originalname;

    const blob = storage.file(fileName);
    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: file.mimetype,
      },
    });

    // Handle blob stream events
    blobStream.on("error", (error) => {
      console.error("Error uploading file:", error);
      res.status(400).json({ message: error.message });
    });

    blobStream.on("finish", () => {
      // get the public URL
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.name}/o/${fileName}?alt=media`;
      // return the its public URL
      res.status(200).json({
        message: "File uploaded successfully",
        url: publicUrl,
      });
    });

    // End blob stream with file buffer
    blobStream.end(file.buffer);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(400).json({ error: error.message });
  }
});

// AWS.config.update({
//     region: process.env.AWS_S3_BUCKET_REGION,
//     accessKeyId: process.env.AWS_S3_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
// });

// const s3 = new AWS.S3();

// const uploadVideo = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: process.env.AWS_S3_BUCKET_NAME,
//         metadata: function (req, file, cb) {
//             cb(null, { fieldName: file.fieldname });
//         },
//         key: function (req, file, cb) {
//             cb(null, Date.now().toString() + "-" + file.originalname);
//         },
//         contentType: multerS3.AUTO_CONTENT_TYPE,
//     }),
// });

// uploadRouter.post("/video", uploadVideo.single("video"), (req, res) => {
//     if (!req.file) {
//         return res.status(400).send("Please upload a video.");
//     }

//     // Construct the CloudFront URL
//     const videoUrl = `${process.env.CLOUDFRONT_DOMAIN}/${req.file.key}`;

//     res.status(200).send({
//         message: "File uploaded successfully",
//         url: videoUrl,
//     });
// });

uploadRouter.delete("/image/:filename", async (req, res) => {
  const { filename } = req.params;

  try {
    const file = storage.file(filename);
    await file.delete();
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(400).json({ error: error.message });
  }
});

// uploadRouter.delete("/video/:filename", async (req, res) => {
//     const { filename } = req.params;

//     const params = {
//         Bucket: process.env.AWS_S3_BUCKET_NAME,
//         Key: filename,
//     };

//     try {
//         await s3.deleteObject(params).promise();
//         res.status(200).json({ message: "File deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting file:", error);
//         res.status(400).json({ error: error.message });
//     }
// });

export default uploadRouter;

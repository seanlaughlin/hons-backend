const sharp = require("sharp");
const path = require("path");

const outputFolder = "public/assets/review-images";

module.exports = async (req, res, next) => {
  let image = null;

  if (!req.file) {
    // If no files are uploaded, skip processing
    return next();
  }

  const resizePromise = async () => {
    const file = req.file;
    console.log(file);
    const fullImagePath = path.resolve(
      outputFolder,
      file.filename + "_full.jpg"
    );
    const thumbImagePath = path.resolve(
      outputFolder,
      file.filename + "_thumb.jpg"
    );

    console.log(fullImagePath);

    try {
      // Create the full-sized image
      const fullImageSharp = sharp(file.path)
        .resize(2000)
        .jpeg({ quality: 75 });
      fullImageSharp.on("info", (info) => {
        console.log(`Full Image Processing: ${info.percent}% complete`);
      });

      await fullImageSharp.toFile(fullImagePath);

      // Create the thumbnail
      const thumbImageSharp = sharp(file.path)
        .resize(100)
        .jpeg({ quality: 30 });
      thumbImageSharp.on("info", (info) => {
        console.log(`Thumbnail Processing: ${info.percent}% complete`);
      });

      await thumbImageSharp.toFile(thumbImagePath);

      image = {
        full: "assets/review-images/" + file.filename + "_full.jpg",
        thumb: "assets/review-images/" + file.filename + "_thumb.jpg",
      };
    } catch (error) {
      console.error("Error resizing image:", error);
    }
  };

  await resizePromise();

  req.image = image;

  next();
};

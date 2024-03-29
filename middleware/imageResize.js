const sharp = require("sharp");
const path = require("path");

module.exports = async (req, res, next, outputFolder) => {
  let images = [];
  console.log(req.files);
  // Function to process a single image
  const processImage = async (file) => {
    const fullImagePath = path.resolve(
      "public/" + outputFolder,
      file.filename + "_full.jpg"
    );
    const thumbImagePath = path.resolve(
      "public/" + outputFolder,
      file.filename + "_thumb.jpg"
    );

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

      // Store image paths
      images.push({
        full: `${outputFolder}/` + file.filename + "_full.jpg",
        thumb: `${outputFolder}/` + file.filename + "_thumb.jpg",
      });
    } catch (error) {
      console.error("Error resizing image:", error);
    }
  };

  // Process single image
  if (req.file) {
    await processImage(req.file);
  }

  // Process multiple images
  if (req.files) {
    const filesArray = Array.isArray(req.files) ? req.files : [req.files];
    await Promise.all(filesArray.map(processImage));
  }

  // Assign req.image or req.images based on the number of uploaded images
  if (images.length === 1) {
    req.image = images[0];
  } else if (images.length > 1) {
    req.images = images;
  }

  next();
};

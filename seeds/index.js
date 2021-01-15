const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptor, place } = require("./seedNames.js");

mongoose.connect("mongodb://localhost:27017/yelpCamp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 7; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 250) + 250;
    const camp = new Campground({
      author: "6000bf810625a000447c4941",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptor)} ${sample(place)}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      price: `${price}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url:
            "https://res.cloudinary.com/daue4lubs/image/upload/v1609181343/YelpCamp/swxlwjrbvwicthsiy9wj.jpg",
          filename: "YelpCamp/swxlwjrbvwicthsiy9wj",
        },
        {
          url:
            "https://res.cloudinary.com/daue4lubs/image/upload/v1609181343/YelpCamp/kpzpsh6auj2scx7kgcst.png",
          filename: "YelpCamp/kpzpsh6auj2scx7kgcst",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});

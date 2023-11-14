require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const UserRoutes = require("./routes/api/User");
const postRoutes = require("./routes/api/Post");
const commentRoutes = require("./routes/api/Comment");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: "http://localhost:8080", credentials: true }));
} else {
  app.use(
    cors({
      origin: [
        "https://js23.justinhumane.com",
        "js23.justinhumane.com",
        "https://justinhumane.com",
        "justinhumane.com",
      ],
    })
  );
}
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB database Connected..."))
  .catch((err) => console.log(err));

app.use("/api/users", UserRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

app.listen(process.env.PORT, () =>
  console.log(`App listening at http://localhost:${process.env.PORT}`)
);

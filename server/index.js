require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const TodoListRoutes = require("./routes/api/Todolist");
const UserRoutes = require("./routes/api/User");

const { Router } = require("express");
const router = Router();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: "http://localhost:8080", credentials: true }));
} else {
  app.use(cors());
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

const path = require("path");
/* const apiRoutes = require("./routes");
app.use("/api", apiRoutes); */
/* app.use("/api/TodoList", TodoListRoutes); */
app.use("/api/users", UserRoutes);

app.listen(process.env.PORT, () =>
  console.log(`App listening at http://localhost:${process.env.PORT}`)
);

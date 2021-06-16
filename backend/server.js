import { config } from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import uploadRoute from "./routes/uploadRoute.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import path from "path";

config();
connectDB();

const app = express();
app.use(express.json());



app.use("/api/users", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/upload", uploadRoute);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

// Error Handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});

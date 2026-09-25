import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import courseRoutes from "./routes/courseRoutes";
import enrollmentRoutes from "./routes/enrollmentRoutes";
import progressRoutes from "./routes/progressRoutes";
import assessmentRoutes from "./routes/assessmentRoutes";
import blockchainRoutes from "./routes/blockchainRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "BlockLearnX Backend is running"
  });
});

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/blockchain", blockchainRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`BlockLearnX backend running on port ${PORT}`);
});

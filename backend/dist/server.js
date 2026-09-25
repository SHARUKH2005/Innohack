"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const courseRoutes_1 = __importDefault(require("./routes/courseRoutes"));
const enrollmentRoutes_1 = __importDefault(require("./routes/enrollmentRoutes"));
const progressRoutes_1 = __importDefault(require("./routes/progressRoutes"));
const assessmentRoutes_1 = __importDefault(require("./routes/assessmentRoutes"));
const blockchainRoutes_1 = __importDefault(require("./routes/blockchainRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({
        message: "BlockLearnX Backend is running"
    });
});
app.use("/api/users", userRoutes_1.default);
app.use("/api/courses", courseRoutes_1.default);
app.use("/api/enrollments", enrollmentRoutes_1.default);
app.use("/api/progress", progressRoutes_1.default);
app.use("/api/assessments", assessmentRoutes_1.default);
app.use("/api/blockchain", blockchainRoutes_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`BlockLearnX backend running on port ${PORT}`);
});

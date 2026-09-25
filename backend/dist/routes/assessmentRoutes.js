"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const assessmentController_1 = require("../controllers/assessmentController");
const router = (0, express_1.Router)();
router.post("/submit", assessmentController_1.submitAssessment);
router.post("/ai-evaluate", assessmentController_1.aiEvaluateAssessment);
exports.default = router;

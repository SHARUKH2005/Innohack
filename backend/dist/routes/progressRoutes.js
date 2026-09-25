"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const progressController_1 = require("../controllers/progressController");
const router = (0, express_1.Router)();
router.post("/complete", progressController_1.completeLesson);
exports.default = router;

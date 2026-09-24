"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enrollmentController_1 = require("../controllers/enrollmentController");
const router = (0, express_1.Router)();
router.post("/", enrollmentController_1.enrollUser);
exports.default = router;

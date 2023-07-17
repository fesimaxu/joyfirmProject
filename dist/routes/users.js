"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controller/user");
const router = (0, express_1.Router)();
/* GET users listing. */
router.get('/', user_1.getAllLibraryData);
exports.default = router;

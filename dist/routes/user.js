"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controller/user");
const router = (0, express_1.Router)();
/* POST Users listing. */
router.post('/register', user_1.createUserData);
router.post('/login', user_1.loginUser);
exports.default = router;

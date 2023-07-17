"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUserData = void 0;
const uuid_1 = require("uuid");
const index_1 = require("../utils/index");
const validation_1 = require("../validation");
// Register or Signup a new User
const createUserData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, index_1.createDatabase)(index_1.userFolder, index_1.userFile);
        let allUser = [];
        try {
            const data = (0, index_1.readData)(index_1.userFile);
            if (!data) {
                return res.status(400).send({
                    status: "error",
                    method: req.method,
                    message: "database is empty"
                });
            }
            else {
                allUser = JSON.parse(data);
            }
        }
        catch (parseError) {
            allUser = [];
            console.log(parseError);
        }
        const newUser = req.body;
        const errorMessage = validation_1.UserSchema.safeParse(newUser);
        if (!errorMessage) {
            res.status(400).send({
                status: "error",
                method: req.method,
                message: "invalid input details"
            });
            return;
        }
        const findUserByEmail = allUser.find((user) => user.email === newUser.email);
        if (findUserByEmail) {
            res.status(400).send({
                status: "error",
                method: req.method,
                message: `user with email - ${newUser.email} already exist`
            });
            return;
        }
        const hashedPassword = yield (0, index_1.hash)(newUser.password);
        const userData = Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, newUser), { password: hashedPassword, createdAt: new Date(), updatedAt: new Date() });
        allUser.push(userData);
        (0, index_1.writeData)(index_1.userFile, allUser);
        res.status(200).json({
            status: "success",
            method: req.method,
            message: `new user ${newUser.email} registration successful`,
            data: userData
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createUserData = createUserData;
// Login  or Signin an existing User
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let allUser = [];
    try {
        const data = (0, index_1.readData)(index_1.userFile);
        if (!data) {
            res.status(400).send({
                status: "error",
                method: req.method,
                message: "database is empty"
            });
            return;
        }
        else {
            allUser = JSON.parse(data);
        }
    }
    catch (parseError) {
        allUser = [];
    }
    const existingUser = req.body;
    const errorMessage = validation_1.LoginSchema.safeParse(existingUser);
    if (!errorMessage) {
        res.status(400).send({
            status: "error",
            method: req.method,
            message: "invalid input details"
        });
        return;
    }
    const findUserByEmail = allUser.find((user) => user.email === existingUser.email);
    if (!findUserByEmail) {
        res.status(400).send({
            status: "error",
            method: req.method,
            message: `User with email - ${existingUser.email} does not exist`
        });
        return;
    }
    const token = yield (0, index_1.generateToken)(findUserByEmail);
    const isValidUser = yield (0, index_1.decryptPassword)(existingUser.password, findUserByEmail.password);
    if (!isValidUser) {
        res.status(400).send({
            status: "error",
            method: req.method,
            message: "Email or Password is invalid"
        });
        return;
    }
    res.status(200).json({
        status: "success",
        method: req.method,
        message: `User logged in successfully`,
        data: findUserByEmail,
        token
    });
});
exports.loginUser = loginUser;

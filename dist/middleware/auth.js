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
exports.auth = void 0;
const utils_1 = require("../utils");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorization = req.headers.authorization;
        if (authorization === undefined) {
            res.status(404).send({
                status: "error",
                method: req.method,
                message: "no authorization"
            });
            return;
        }
        const token = authorization.split(" ")[1];
        if (!token || token === "") {
            res.status(404).send({
                status: "error",
                method: req.method,
                message: "access denied"
            });
            return;
        }
        const decodeToken = (0, utils_1.verifyToken)(token);
        if ('user' in req) {
            req.user = decodeToken;
        }
        return next();
    }
    catch (error) {
        return res.status(404).send({
            status: "error",
            method: req.method,
            message: "authorization failed",
            error
        });
    }
});
exports.auth = auth;

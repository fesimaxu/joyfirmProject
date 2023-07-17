"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibrarySchema = exports.LoginSchema = exports.UserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.UserSchema = zod_1.default.object({
    firstName: zod_1.default.string({
        required_error: "Firstname is required"
    }),
    lastName: zod_1.default.string({
        required_error: "Lastname is required"
    }),
    email: zod_1.default.string({
        required_error: "Email is required"
    }).email({
        message: "The email supplied is not valid"
    }),
    gender: zod_1.default.string({
        required_error: "Gender is required"
    }),
    password: zod_1.default.string({
        required_error: "Password is required"
    })
});
exports.LoginSchema = zod_1.default.object({
    email: zod_1.default.string({
        required_error: "Email is required"
    }).email({
        message: "The email supplied is not valid"
    }),
    password: zod_1.default.string({
        required_error: "Password is required"
    })
});
exports.LibrarySchema = zod_1.default.object({
    Title: zod_1.default.string({
        required_error: "Title is required"
    }),
    Author: zod_1.default.string({
        required_error: "Author is required"
    }),
    datePublished: zod_1.default.string({
        required_error: "datePublished is required"
    }),
    Description: zod_1.default.string({
        required_error: "Description is required"
    }),
    pageCount: zod_1.default.number({
        required_error: "pageCount is required"
    }),
    Genre: zod_1.default.string({
        required_error: "Genre is required"
    }),
    Publisher: zod_1.default.string({
        required_error: "Publisher is required"
    })
});

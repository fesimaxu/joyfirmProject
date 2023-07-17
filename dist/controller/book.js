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
exports.deleteBookData = exports.updateBookData = exports.createBookData = exports.getbookByID = exports.getAllBooks = void 0;
const uuid_1 = require("uuid");
const index_1 = require("../utils/index");
const validation_1 = require("../validation");
// get all books in the database
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, index_1.createDatabase)(index_1.libraryFolder, index_1.libraryFile);
    let allData = [];
    try {
        const data = (0, index_1.readData)(index_1.libraryFile);
        if (!data) {
            res.status(400).send({
                status: "error",
                method: req.method,
                message: "database is empty"
            });
            return;
        }
        else {
            allData = JSON.parse(data);
        }
    }
    catch (parseError) {
        console.log(parseError);
    }
    res.status(200).json({
        status: "success",
        method: req.method,
        message: "all books returned successfully",
        data: allData
    });
});
exports.getAllBooks = getAllBooks;
// get a book by ID
const getbookByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let allData = [];
    try {
        const data = (0, index_1.readData)(index_1.libraryFile);
        if (!data) {
            res.status(400).send({
                status: "error",
                method: req.method,
                message: "databse is empty"
            });
            return;
        }
        else {
            allData = JSON.parse(data);
        }
    }
    catch (parseError) {
        console.log(parseError);
    }
    const dataByID = allData.filter((book) => {
        return book.bookId === req.params.id;
    });
    if (dataByID.length === 0) {
        res.status(404).send({
            status: "error",
            method: req.method,
            message: `book with - ${req.params.id} returned not found`
        });
    }
    res.status(200).json({
        status: "success",
        method: req.method,
        message: `book with - ${req.params.id} returned successfully`,
        data: dataByID
    });
});
exports.getbookByID = getbookByID;
// store a book on the database
const createBookData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let allData = [];
        try {
            const data = (0, index_1.readData)(index_1.libraryFile);
            if (!data) {
                res.status(400).send({
                    status: "error",
                    method: req.method,
                    message: "databse is empty"
                });
                return;
            }
            else {
                allData = JSON.parse(data);
            }
        }
        catch (parseError) {
            console.log(parseError);
        }
        const newBookData = req.body;
        const errorMessage = validation_1.LibrarySchema.safeParse(newBookData);
        if (!errorMessage) {
            res.status(404).send({
                status: "error",
                method: req.method,
                message: "invalid input details"
            });
            return;
        }
        const findBookByTitle = allData.find((book) => book.Title === newBookData.Title);
        if (findBookByTitle) {
            res.status(404).send({
                status: "error",
                method: req.method,
                message: `book with title - ${newBookData.Title} already exist`
            });
        }
        const bookData = Object.assign(Object.assign({ bookId: (0, uuid_1.v4)() }, newBookData), { createdAt: new Date(), updatedAt: new Date() });
        allData.push(bookData);
        (0, index_1.writeData)(index_1.libraryFile, allData);
        res.status(200).json({
            status: "success",
            method: req.method,
            message: `new book ${bookData.Title} successfully added to the library`,
            data: bookData
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createBookData = createBookData;
// update a book on the database
const updateBookData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let allData = [];
        try {
            const data = (0, index_1.readData)(index_1.libraryFile);
            if (!data) {
                res.status(400).send({
                    status: "error",
                    method: req.method,
                    message: "database is empty"
                });
                return;
            }
            else {
                allData = JSON.parse(data);
            }
        }
        catch (parseError) {
            console.log(parseError);
        }
        const newBookData = req.body;
        const errorMessage = validation_1.LibrarySchema.safeParse(newBookData);
        if (!errorMessage) {
            res.status(404).send({
                status: "error",
                method: req.method,
                message: "invalid input details"
            });
            return;
        }
        const BookIndex = allData.findIndex((book) => book.Title === newBookData.Title);
        if (!BookIndex) {
            res.status(404).send({
                status: "error",
                method: req.method,
                message: `book with title - ${newBookData.Title} not found`
            });
        }
        allData[BookIndex] = newBookData;
        (0, index_1.writeData)(index_1.libraryFile, allData);
        res.status(200).json({
            status: "success",
            method: req.method,
            message: `book ${newBookData.Title} successfully updated in the library`,
            data: newBookData
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateBookData = updateBookData;
// update a book on the database
const deleteBookData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let allData = [];
        try {
            const data = (0, index_1.readData)(index_1.libraryFile);
            if (!data) {
                res.status(400).send({
                    status: "error",
                    method: req.method,
                    message: "database is empty"
                });
                return;
            }
            else {
                allData = JSON.parse(data);
            }
        }
        catch (parseError) {
            console.log(parseError);
        }
        const newBookData = req.body;
        const errorMessage = validation_1.LibrarySchema.safeParse(newBookData);
        if (!errorMessage) {
            res.status(404).send({
                status: "error",
                method: req.method,
                message: "invalid input details"
            });
            return;
        }
        const BookIndex = allData.findIndex((book) => book.Title === newBookData.Title);
        if (!BookIndex) {
            res.status(404).send({
                status: "error",
                method: req.method,
                message: `book with title - ${newBookData.Title} not found`
            });
        }
        allData.splice(BookIndex, 1);
        (0, index_1.writeData)(index_1.libraryFile, allData);
        res.status(200).json({
            status: "success",
            method: req.method,
            message: `book ${newBookData.Title} successfully deleted from the library`,
            data: newBookData
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteBookData = deleteBookData;

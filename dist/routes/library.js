"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_1 = require("../controller/book");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
/* GET AND POST BOOKS listing. */
router.get('/get-books', book_1.getAllBooks);
router.get('/get-book/:id', auth_1.auth, book_1.getbookByID);
router.post('/create-book', auth_1.auth, book_1.createBookData);
router.put('/update-book', auth_1.auth, book_1.updateBookData);
router.delete('/delete', auth_1.auth, book_1.deleteBookData);
exports.default = router;

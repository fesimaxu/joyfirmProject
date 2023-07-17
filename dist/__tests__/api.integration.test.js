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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const testData_1 = require("../utils/testData");
describe("Integration test for the library API", () => {
    it("Get api/get-books - success - get all books", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body, statusCode } = yield (0, supertest_1.default)(app_1.default).get("/library/get-books");
        const { data } = body;
        expect(data).toEqual(expect.arrayContaining([
            expect.objectContaining({
                bookId: expect.any(String),
                Title: expect.any(String),
                Author: expect.any(String),
                datePublished: expect.any(String),
                Description: expect.any(String),
                pageCount: expect.any(Number),
                Genre: expect.any(String),
                Publisher: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            })
        ]));
        expect(statusCode).toBe(200);
    }));
    it('Post api/register - success - register a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, supertest_1.default)(app_1.default).post('/user/register')
            .send(testData_1.userDetails);
        //test for success
        if (user.statusCode === 200) {
            expect(user.body.message).toBe(`new user ${testData_1.userDetails.email} registration successful`);
        }
        else if (!testData_1.userDetails.email) {
            expect(user.body.message).toBe(`user with email - ${testData_1.userDetails.email} already exist`);
        }
    }));
    it("Get api/get-books-id - success - get a book by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, supertest_1.default)(app_1.default).post('/user/login').send(testData_1.activeUser);
        const token = user.body.token;
        const { body, statusCode } = yield (0, supertest_1.default)(app_1.default).get("/library/get-book/a760dfc6-cad0-47aa-9d2d-bb5a6a88db86")
            .set('authorization', `Bearer ${token}`);
        const { data } = body;
        expect(data).toEqual(expect.arrayContaining([
            expect.objectContaining({
                bookId: expect.any(String),
                Title: expect.any(String),
                Author: expect.any(String),
                datePublished: expect.any(String),
                Description: expect.any(String),
                pageCount: expect.any(Number),
                Genre: expect.any(String),
                Publisher: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            })
        ]));
        expect(statusCode).toBe(200);
    }));
    it("Post api/create-book - success - create a book", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, supertest_1.default)(app_1.default).post('/user/login').send(testData_1.activeUser);
        const token = user.body.token;
        const response = yield (0, supertest_1.default)(app_1.default).post("/library/create-book")
            .send(testData_1.bookDetails).set('authorization', `Bearer ${token}`);
        if (response.statusCode === 200) {
            expect(response.body.message).toBe(`new book ${testData_1.bookDetails.Title} successfully added to the library`);
        }
        else {
            expect(response.body.message).toBe(`book with title - ${testData_1.bookDetails.Title} already exist`);
        }
        expect(response.body.data).toMatchObject(testData_1.bookDetails);
    }));
    it("Post api/update-book - success - update a book", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, supertest_1.default)(app_1.default).post('/user/login').send(testData_1.activeUser);
        const token = user.body.token;
        const response = yield (0, supertest_1.default)(app_1.default).put("/library/update-book")
            .send(testData_1.ChinuaBook).set('authorization', `Bearer ${token}`);
        if (response.statusCode === 200) {
            expect(response.body.message).toBe(`book ${testData_1.ChinuaBook.Title} successfully updated in the library`);
        }
        expect(response.body.data).toMatchObject(testData_1.ChinuaBook);
    }));
    it("Post api/update-book - success - confirming the book updated", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, supertest_1.default)(app_1.default).post('/user/login').send(testData_1.activeUser);
        const token = user.body.token;
        const response = yield (0, supertest_1.default)(app_1.default).put("/library/update-book")
            .send(testData_1.ChinuaBook).set('authorization', `Bearer ${token}`);
        expect(response.body.data).toMatchObject(testData_1.ChinuaBook);
    }));
    it("Post api/delete - success - delete a book", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, supertest_1.default)(app_1.default).post('/user/login').send(testData_1.activeUser);
        const token = user.body.token;
        const response = yield (0, supertest_1.default)(app_1.default).delete("/library/delete")
            .send(testData_1.bookDetails).set('authorization', `Bearer ${token}`);
        if (response.statusCode === 200) {
            expect(response.body.message).toBe(`book ${testData_1.bookDetails.Title} successfully deleted from the library`);
        }
        expect(response.body.data).toMatchObject(testData_1.bookDetails);
    }));
    it("Post api/delete - success - confirming the book deleted", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, supertest_1.default)(app_1.default).post('/user/login').send(testData_1.activeUser);
        const token = user.body.token;
        const response = yield (0, supertest_1.default)(app_1.default).delete("/library/delete")
            .send(testData_1.bookDetails).set('authorization', `Bearer ${token}`);
        expect(response.body.data).toMatchObject(testData_1.bookDetails);
    }));
});

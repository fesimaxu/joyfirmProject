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
exports.verifyToken = exports.generateToken = exports.decryptPassword = exports.hash = exports.createDatabase = exports.writeData = exports.readData = exports.userFile = exports.userFolder = exports.libraryFile = exports.libraryFolder = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//library file path
exports.libraryFolder = path_1.default.join(__dirname, '../../src/libraryDatabase');
exports.libraryFile = path_1.default.join(exports.libraryFolder, 'library.json');
// user file path
exports.userFolder = path_1.default.join(__dirname, '../../src/userDatabase');
exports.userFile = path_1.default.join(exports.userFolder, 'userDatabase.json');
// read from database
const readData = (filePath) => {
    return fs_1.default.readFileSync(filePath, "utf8");
};
exports.readData = readData;
// write to database
const writeData = (filePath, datas) => {
    const stringData = JSON.stringify(datas, null, 2);
    fs_1.default.writeFileSync(filePath, stringData);
};
exports.writeData = writeData;
//creating a database if doesn't exist 
const createDatabase = (databaseFolder, databaseFile) => {
    if (!fs_1.default.existsSync(databaseFolder)) {
        fs_1.default.mkdirSync(databaseFolder);
    }
    if (!fs_1.default.existsSync(databaseFile)) {
        fs_1.default.writeFileSync(databaseFile, " ");
    }
};
exports.createDatabase = createDatabase;
// hash password
const hash = (myPlaintextPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    const salt = bcrypt_1.default.genSaltSync(saltRounds);
    const hash = bcrypt_1.default.hashSync(myPlaintextPassword, salt);
    return hash;
});
exports.hash = hash;
// decrypt password
const decryptPassword = (myPlaintextPassword, hash) => __awaiter(void 0, void 0, void 0, function* () {
    return bcrypt_1.default.compareSync(myPlaintextPassword, hash);
});
exports.decryptPassword = decryptPassword;
// generate authorization token
const generateToken = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const token = jsonwebtoken_1.default.sign({ data }, `${process.env.APP_SECRET}`);
    return token;
});
exports.generateToken = generateToken;
// verify authorization token
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, `${process.env.APP_SECRET}`);
};
exports.verifyToken = verifyToken;

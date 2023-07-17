import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// book type
export  type BOOK = {
    bookId: string;
    Title: string;
    Author: string;
    datePublished: string;
    Description: string;
    pageCount: number;
    Genre: string;
  Publisher: string;
  createdAt: string;
  updatedAt: string;
};

// user type
export interface USER {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
}

//library file path
export const libraryFolder = path.join(__dirname, '../../src/libraryDatabase');
export const libraryFile = path.join(libraryFolder, 'library.json');

// user file path
export const userFolder = path.join(__dirname, '../../src/userDatabase');
export const userFile = path.join(userFolder, 'userDatabase.json');

// read from database
export const readData =  (filePath: string) => {
  return fs.readFileSync( filePath, "utf8")
}

// write to database
export const writeData =  (filePath: string, datas: any[]) => {
const stringData = JSON.stringify(datas, null, 2)

   fs.writeFileSync(filePath, stringData);
}

//creating a database if doesn't exist 
export const createDatabase = (databaseFolder: string, databaseFile: string) => {
  if (!fs.existsSync(databaseFolder)) {
        fs.mkdirSync(databaseFolder)
    }
    if (!fs.existsSync(databaseFile)) {
        fs.writeFileSync(databaseFile, " ")
    }
}

// hash password
export const hash = async (myPlaintextPassword: string) => {
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(myPlaintextPassword, salt);
  
  return hash;
}

// decrypt password
export const decryptPassword = async (myPlaintextPassword: string, hash: string) => {

  return bcrypt.compareSync(myPlaintextPassword, hash);
}

// generate authorization token
export const generateToken = async (data: USER) => {
  const token = jwt.sign({ data }, `${process.env.APP_SECRET}`);
  
  return token;
}

// verify authorization token
export const verifyToken =  (token: string) => {

  return jwt.verify(token, `${process.env.APP_SECRET}`);
}
import { Request, NextFunction, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { USER, readData, writeData, hash, decryptPassword, generateToken, createDatabase, userFolder, userFile } from '../utils/index';
import { UserSchema, LoginSchema } from '../validation';


// Register or Signup a new User
export const createUserData = async (req: Request, res: Response, next: NextFunction) => {
 
     
    try {
        createDatabase(userFolder, userFile)

        let allUser: USER[] = []
        try {
           const data = readData(userFile);
            if (!data) {
            return   res.status(400).send({
            status: "error",
            method: req.method,
            message: "database is empty"
            })
        
            }
            else {
                allUser = JSON.parse(data);
            }
        } catch (parseError) {
            allUser = []
            console.log(parseError)
        }
        
        const newUser = req.body;
        const errorMessage = UserSchema.safeParse(newUser);

    if (!errorMessage) {
           res.status(400).send({
            status: "error",
            method: req.method,
            message: "invalid input details"
           })
        return;
    }

    const findUserByEmail = allUser.find((user: USER) => user.email === newUser.email)

    if (findUserByEmail) {
         res.status(400).send({
            status: "error",
            method: req.method,
            message: `user with email - ${newUser.email} already exist`
         })
        return;
    }

    const hashedPassword = await hash(newUser.password);
    
    const userData = {
        id: uuidv4(),
        ...newUser,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date() 
    }

    allUser.push(userData)
    writeData(userFile, allUser)

    res.status(200).json({
        status: "success",
        method: req.method,
        message: `new user ${newUser.email} registration successful`,
        data: userData
    })
    } catch (error) {
        console.log(error)
    }

    
}

// Login  or Signin an existing User
export const loginUser = async ( req: Request, res: Response, next: NextFunction  ) => {
    let allUser: USER[] = []
        try {
           const data = readData(userFile);
            if (!data) {
            res.status(400).send({
                status: "error",
                method: req.method,
                message: "database is empty"
            })
            return;
            }
            else {
                allUser = JSON.parse(data);
            }
        } catch (parseError) {
            allUser = [];
        }
     const existingUser = req.body;

    const errorMessage = LoginSchema.safeParse(existingUser);
    
    if (!errorMessage) {
           res.status(400).send({
            status: "error",
            method: req.method,
            message: "invalid input details"
           })
        return;
    }

    const findUserByEmail = allUser.find((user: USER) => user.email === existingUser.email)

    if (!findUserByEmail) {
         res.status(400).send({
            status: "error",
            method: req.method,
            message: `User with email - ${existingUser.email} does not exist`
         })
        return;
    }

    const token = await generateToken(findUserByEmail);

    const isValidUser = await decryptPassword(existingUser.password, findUserByEmail.password);
    if (!isValidUser) {
         res.status(400).send({
            status: "error",
            method: req.method,
            message: "Email or Password is invalid"
         })
        return;
    }
    

      res.status(200).json({
        status: "success",
        method: req.method,
        message: `User logged in successfully`,
        data: findUserByEmail,
        token
    })
}

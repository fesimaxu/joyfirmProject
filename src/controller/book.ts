import { Request, NextFunction, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { BOOK, writeData, readData, libraryFolder, libraryFile, createDatabase } from '../utils/index';
import { LibrarySchema } from '../validation';


// get all books in the database
export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    createDatabase(libraryFolder, libraryFile);
    
    let allData: BOOK[] = []
     try {
           const data = readData(libraryFile);
            if (!data) {
                res.status(400).send({
            status: "error",
            method: req.method,
            message: "database is empty"
            })
            return;
            }
            else {
                allData = JSON.parse(data);
            }
        } catch (parseError) {
            console.log(parseError)
        }
    res.status(200).json({
        status: "success",
        method: req.method,
        message: "all books returned successfully",
        data: allData
    })
}

// get a book by ID
export const getbookByID = async ( req: Request, res: Response, next: NextFunction ) => {
    let allData: BOOK[] = []
     try {
           const data = readData(libraryFile);
            if (!data) {
                res.status(400).send({
            status: "error",
            method: req.method,
            message: "databse is empty"
            })
            return;
            }
            else {
                allData = JSON.parse(data);
            }
        } catch (parseError) {
            console.log(parseError)
        }

    const dataByID = allData.filter((book: BOOK) => {

        return book.bookId === req.params.id;
    })

    if (dataByID.length === 0) {
        res.status(404).send({
            status: "error",
            method: req.method,
            message: `book with - ${req.params.id} returned not found`
        })
    }

    res.status(200).json({
        status: "success",
        method: req.method,
        message: `book with - ${req.params.id} returned successfully`,
        data: dataByID
    })
}

// store a book on the database
export const createBookData = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        
        let allData: BOOK[] = []
     try {
           const data = readData(libraryFile);
            if (!data) {
                res.status(400).send({
            status: "error",
            method: req.method,
            message: "databse is empty"
            })
            return;
            }
            else {
                allData = JSON.parse(data);
            }
        } catch (parseError) {
            console.log(parseError)
        }
    const newBookData = req.body;

     const errorMessage = LibrarySchema.safeParse(newBookData);

    if (!errorMessage) {
           res.status(404).send({
            status: "error",
            method: req.method,
            message: "invalid input details"
           })
        return;
    }

    const findBookByTitle = allData.find((book: BOOK) => book.Title === newBookData.Title)

    if (findBookByTitle) {
         res.status(404).send({
            status: "error",
            method: req.method,
            message: `book with title - ${newBookData.Title} already exist`
        })
    }
    const bookData = {
        bookId: uuidv4(),
        ...newBookData,
        createdAt: new Date(),
        updatedAt: new Date() 
    }

    allData.push(bookData)
    writeData(libraryFile, allData)

     res.status(200).json({
        status: "success",
        method: req.method,
        message: `new book ${bookData.Title} successfully added to the library`,
        data: bookData
     })
        
    } catch (error) {
        console.log(error)
    }
}



// update a book on the database
export const updateBookData = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        
        let allData: BOOK[] = []
     try {
           const data = readData(libraryFile);
            if (!data) {
                res.status(400).send({
            status: "error",
            method: req.method,
            message: "database is empty"
            })
            return;
            }
            else {
                allData = JSON.parse(data);
            }
        } catch (parseError) {
            console.log(parseError)
        }
    const newBookData = req.body;

     const errorMessage = LibrarySchema.safeParse(newBookData);

    if (!errorMessage) {
           res.status(404).send({
            status: "error",
            method: req.method,
            message: "invalid input details"
           })
        return;
    }

    const BookIndex= allData.findIndex((book: BOOK) => book.Title === newBookData.Title)

    if (!BookIndex) {
         res.status(404).send({
            status: "error",
            method: req.method,
            message: `book with title - ${newBookData.Title} not found`
        })
    }

    allData[BookIndex] = newBookData;

    writeData(libraryFile, allData)

    res.status(200).json({
        status: "success",
        method: req.method,
        message: `book ${newBookData.Title} successfully updated in the library`,
        data: newBookData
    })
    } catch (error) {
        console.log(error)
    }
}


// update a book on the database
export const deleteBookData = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        
        let allData: BOOK[] = []
     try {
           const data = readData(libraryFile)
            if (!data) {
            res.status(400).send({
            status: "error",
            method: req.method,
            message: "database is empty"
            })
            return;
            }
            else {
                allData = JSON.parse(data);
            }
        } catch (parseError) {
            console.log(parseError)
        }
    const newBookData = req.body;

     const errorMessage = LibrarySchema.safeParse(newBookData);

    if (!errorMessage) {
           res.status(404).send({
            status: "error",
            method: req.method,
            message: "invalid input details"
           })
        return;
    }

    const BookIndex = allData.findIndex((book: BOOK) => book.Title === newBookData.Title)

    if (!BookIndex) {
         res.status(404).send({
            status: "error",
            method: req.method,
            message: `book with title - ${newBookData.Title} not found`
        })
    }
    
   
    allData.splice(BookIndex, 1)
    writeData(libraryFile, allData)
    
    res.status(200).json({
        status: "success",
        method: req.method,
        message: `book ${newBookData.Title} successfully deleted from the library`,
        data: newBookData
    })
    } catch (error) {
        console.log(error)
    }
}
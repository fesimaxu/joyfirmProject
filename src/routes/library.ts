import express, { Router } from 'express';
import { getAllBooks, getbookByID, createBookData, updateBookData, deleteBookData } from '../controller/book';
import { auth } from '../middleware/auth';
const router = Router();

/* GET AND POST BOOKS listing. */
router.get('/get-books', getAllBooks) 
router.get('/get-book/:id', auth, getbookByID) 
router.post('/create-book', auth, createBookData) 
router.put('/update-book', auth, updateBookData) 
router.delete('/delete', auth, deleteBookData) 


export default router;

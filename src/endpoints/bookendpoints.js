// bookRouter.js
import express from 'express';
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from '../controllers/bookController.js';

const bookRouter = express.Router();

// Create a book
bookRouter.post('/createBook', createBook);

// Get all books
bookRouter.get('/getAllBooks', getAllBooks);

// Get a specific book by ID
bookRouter.get('/getBook/:id', getBookById);

// Update a specific book by ID
bookRouter.put('/updateBook/:id', updateBook);

// Delete a specific book by ID
bookRouter.delete('/deleteBook/:id', deleteBook);

export default bookRouter;

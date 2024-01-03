import express from 'express';
import {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} from '../controllers/authorsControllers.js'; // Adjust the path accordingly

const authorRouter = express.Router();

// Create an author
authorRouter.post('/createAuthor', createAuthor);

// Get all authors
authorRouter.get('/getAllAuthors', getAllAuthors);

// Get a specific author by ID
authorRouter.get('/getAuthor/:id', getAuthorById);

// Update a specific author by ID
authorRouter.put('/updateAuthor/:id', updateAuthor);

// Delete a specific author by ID
authorRouter.delete('/deleteAuthor/:id', deleteAuthor);

export default authorRouter;
import express from 'express';
import {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} from '../controllers/authorsControllers.js'; // Adjust the path accordingly

const authorRouter = express.Router();

authorRouter.post('/createAuthor', createAuthor);
authorRouter.get('/getAllAuthors', getAllAuthors);
authorRouter.get('/getAuthor/:id', getAuthorById);
authorRouter.put('/updateAuthor/:id', updateAuthor);
authorRouter.delete('/deleteAuthor/:id', deleteAuthor);

export default authorRouter;
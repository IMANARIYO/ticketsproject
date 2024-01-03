// bookController.js
import { Book } from '../models/index.js';

// Create a book
export const createBook = async (req, res) => {
  try {
    const { title, genre, author } = req.body;
    const book = await Book.create({ title, genre, author });
    res.status(201).json({ message: 'Book created successfully', data: book });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create book', error: error.message });
  }
};

// Read all books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('author', 'name');
    res.status(200).json({ data: books });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch books', error: error.message });
  }
};

// Read one book by ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('author', 'name');
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ data: book });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch book', error: error.message });
  }
};

// Update a book by ID
export const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book updated successfully', data: updatedBook });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update book', error: error.message });
  }
};

// Delete a book by ID
export const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully', data: deletedBook });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete book', error: error.message });
  }
};

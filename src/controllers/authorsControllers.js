// authorController.js
import { Author } from '../models/index.js';

// Create an author
export const createAuthor = async (req, res) => {
  try {
    const { name, age } = req.body;
    const author = await Author.create({ name, age });
    res.status(201).json({ message: 'Author created successfully', data: author });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create author', error: error.message });
  }
};

// Read all authors
export const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json({ data: authors });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch authors', error: error.message });
  }
};

// Read one author by ID
export const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.status(200).json({ data: author });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch author', error: error.message });
  }
};

// Update an author by ID
export const updateAuthor = async (req, res) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAuthor) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.status(200).json({ message: 'Author updated successfully', data: updatedAuthor });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update author', error: error.message });
  }
};

// Delete an author by ID
export const deleteAuthor = async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (!deletedAuthor) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.status(200).json({ message: 'Author deleted successfully', data: deletedAuthor });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete author', error: error.message });
  }
};

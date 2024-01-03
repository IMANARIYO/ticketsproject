// author.js
import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
});

export const Author = mongoose.model('authors', authorSchema);

// book.js


const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'authors',
   required:true
  },
});

export const Book = mongoose.model('Book', bookSchema);

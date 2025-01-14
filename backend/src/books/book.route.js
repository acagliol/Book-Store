
const express = require('express');
const Book = require('./book.model');
const { postABook, getAllBooks, getSingleBook, UpdateBook, deleteABook } = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router = express.Router();

//frontend => backend server => controller => book schema => db => send data to server => frontend


// post a book
// post = when submit something frontend to db
// get = when get something back from db
// put/patch = when you edit or update something
// delete = when delete from db


router.post("/create-book", verifyAdminToken, postABook);

// get all books
router.get("/",getAllBooks);

// get single book

router.get("/:id", getSingleBook);

// update book

router.put("/edit/:id", verifyAdminToken, UpdateBook);

// delete book

router.delete("/:id", verifyAdminToken, deleteABook); 



module.exports = router;
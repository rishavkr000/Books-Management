const express = require('express');
let router = express.Router();
const user = require('../controller/userController')
const book = require('../controller/bookController')
const review = require('../controller/reviewController')
const { authenticate, bookAuthorization, userAuthrization } = require('../middleware/auth')

router.post("/", (req, res) => {
    res.send('ok')
})

// User
router.post("/register", user.registerUser)
router.post("/login", user.loginUser)

// Books
router.post("/books", authenticate, userAuthrization, book.createBook)
router.get('/books', book.getBook)
router.get('/books/:bookId', authenticate, book.getBookById)
router.put("/books/:bookId", authenticate, bookAuthorization, book.bookUpdate)
router.delete("/books/:bookId", authenticate, bookAuthorization, book.delBookById)

// Review
router.post("/books/:bookId/review", review.create)
router.put("/books/:bookId/review/:reviewId", review.update)
router.delete("/books/:bookId/review/:reviewId", review.deleted)


module.exports = router;
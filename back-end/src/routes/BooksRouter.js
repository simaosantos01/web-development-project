const router = require('express').Router()

const {BooksHandler} = require('../handlers')

router
    .route('/api/books')
    /**
     * @openapi
     * /api/books:
     *   post:
     *     description: Create a book
     *     responses:
     *       200:
     *         description: Returns a book.
     *     tags:
     *       - Books
     */
    .post(BooksHandler.createBook)
    /**
     * @openapi
     * /api/books:
     *   get:
     *     description: Get all books
     *     responses:
     *       200:
     *         description: Returns collection of books.
     *     tags:
     *       - Books
     */
    .get(BooksHandler.getAllBooks)
    /**
     * @openapi
     * /api/books:
     *   patch:
     *     description: Patch a book
     *     responses:
     *       200:
     *         description: Returns a patched book.
     *     tags:
     *       - Books
     */
    .patch(BooksHandler.patchBook)

router
    .route('/api/book/:isbn')
    /**
     * @openapi
     * /api/book/:isbn:
     *   get:
     *     description: Get a book from a given ISBN
     *     parameters:
     *         - in: query
     *           name: isbn
     *           type: string
     *           description: The ISBN.
     *     responses:
     *       200:
     *         description: Returns a book.
     *     tags:
     *       - Books
     */
    .get(BooksHandler.getBook)
    /**
     * @openapi
     * /api/book/:isbn:
     *   delete:
     *     description: Delete a book from a given ISBN
     *     parameters:
     *         - in: query
     *           name: isbn
     *           type: string
     *           description: The ISBN.
     *     responses:
     *       200:
     *         description: Returns the deleted book.
     *     tags:
     *       - Books
     */
    .delete(BooksHandler.deleteBook)

router
    .route('/api/book/review')
    /**
     * @openapi
     * /api/book/review:
     *   post:
     *     description: Review a book
     *     responses:
     *       200:
     *         description: Returns a collection of categories.
     *     tags:
     *       - Books
     */
    .post(BooksHandler.reviewBook)

/**
 * @openapi
 * /api/books/categories:
 *   get:
 *     description: Get all books categories
 *     responses:
 *       200:
 *         description: Returns a collection of categories.
 *     tags:
 *       - Books
 */
router.route('/api/books/categories').get(BooksHandler.getCategories)

module.exports = router

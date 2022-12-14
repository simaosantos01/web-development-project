const { Request, Response, NextFunction } = require('express')
const { Book, Customer } = require('../schemas')
const Isbn = require('node-isbn')
/**
 * Create a Book
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const createBook = async (req, res, next) => {
    Isbn.provider([Isbn.PROVIDER_NAMES.GOOGLE])
        .resolve(req.body.isbn)
        .then(async (book) => {
            console.log(book)
            let schema = await createSchema(req.body, book)
            await addBook(schema)
            res.status(200).json({ added_book: schema })
        })
        .catch((e) => {
            const error = new Error(e.message)
            error.status = 400
            next(error)
        })
}

/**
 * Create book schema with google books api
 *
 * @param {Object} body
 * @param {Object} book
 * @returns {Promise<Object>}
 */
const createSchema = async (body, book) => {
    return {
        isbn: body.isbn,
        title: book.title,
        authors: book.authors,
        publisher: book.publisher ?? '',
        published_date: book.publishedDate,
        language: book.language,
        pages: book.pageCount,
        description: book.description ?? '',
        category: body.category ?? '',
        maturaty_rating: book.maturityRating ?? '',
        stock_new: body.stock_new,
        stock_used: body.stock_used,
        price_new: body.price_new,
        price_used: body.price_used,
        image: handleImage(book.imageLinks) ?? '',
    }
}

const handleImage = (image) => {
    if (image == undefined) return ''
    return image.thumbnail
}

/**
 * Checks if book already exists
 *
 * @param {String} isbn
 * @returns {Promisse<void>}
 * @throws {Error} if the book already exists
 */
const bookExists = async (isbn) => {
    var book = null

    try {
        book = await Book.findOne({
            isbn: isbn,
        })
    } catch (e) {
        throw e
    }

    if (book != null) {
        throw Error('Book already exists.')
    }
}

/**
 * Get book
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 * @returns {Promise<void>}
 */
const getBook = async (req, res, next) => {
    try {
        const book = await Book.findOne({ isbn: req.params['isbn'] })
        res.status(200).json({ book })
    } catch (e) {
        return next(e)
    }
}

/**
 * Adds a Book to the data base
 *
 * @param {Object} schema
 * @returns {Promise<void>}
 */
const addBook = async (schema) => {
    try {
        var book = new Book(schema)
        await bookExists(schema.isbn)
        await book.validate()
        await book.save()
    } catch (e) {
        throw e
    }
}

/**
 * Returns a book given his isbn
 *
 * @param {String} isbn
 * @returns {Object}
 * @throws {Error} if the book does not exist
 */
const findBook = async (isbn) => {
    var book = null

    try {
        book = await Book.findOne({
            isbn: isbn,
            active: true,
        })
    } catch (e) {
        throw e
    }

    if (book == null) {
        throw Error('The book does not exist.')
    }
    return book
}

/**
 * Update book stock
 *
 * @param {String} isbn
 * @param {Number} stock
 * @param {String} type
 * @returns {Promisse<void>}
 */
const updateStock = async (isbn, stock, type) => {
    try {
        var book = await findBook(isbn)
        switch (type) {
            case 'used':
                book.stock_used = stock
                break
            case 'new':
                book.stock_new = stock
                break
        }
        await book.validate()
        await book.save()
    } catch (e) {
        throw e
    }
}

/**
 * Update book price
 *
 * @param {String} isbn
 * @param {Number} price
 * @param {String} type
 * @returns {Promisse<void>}
 */
const updatePrice = async (isbn, price, type) => {
    try {
        var book = await findBook(isbn)
        switch (type) {
            case 'used':
                book.price_used = price
                break
            case 'new':
                book.price_new = price
                break
        }
        await book.validate()
        await book.save()
    } catch (e) {
        throw e
    }
}

const updatePublisher = async (isbn, publisher) => {
    try {
        var book = await findBook(isbn)
        book.publisher = publisher
        await book.validate()
        await book.save()
    } catch (e) {
        throw e
    }
}

const updateDescription = async (isbn, description) => {
    try {
        var book = await findBook(isbn)
        book.description = description
        await book.validate()
        await book.save()
    } catch (e) {
        throw e
    }
}

const updateCategory = async (isbn, category) => {
    try {
        var book = await findBook(isbn)
        book.category = category
        await book.validate()
        await book.save()
    } catch (e) {
        throw e
    }
}

const updateMaturityRating = async (isbn, maturatyRating) => {
    try {
        var book = await findBook(isbn)
        book.maturaty_rating = maturatyRating
        await book.validate()
        await book.save()
    } catch (e) {
        throw e
    }
}

const updateImage = async (isbn, image) => {
    try {
        var book = await findBook(isbn)
        book.image = image
        await book.validate()
        await book.save()
    } catch (e) {
        throw e
    }
}

/**
 * Patch a book
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 *
 */
const patchBook = async (req, res, next) => {
    try {
        if (req.body.stock_used != undefined) {
            await updateStock(req.body.isbn, req.body.stock_used, 'used')
        }
        if (req.body.stock_new != undefined) {
            await updateStock(req.body.isbn, req.body.stock_new, 'new')
        }
        if (req.body.price_used != undefined) {
            await updatePrice(req.body.isbn, req.body.price_used, 'used')
        }
        if (req.body.price_new != undefined) {
            await updatePrice(req.body.isbn, req.body.price_new, 'new')
        }
        if (req.body.publisher != undefined) {
            await updatePublisher(req.body.isbn, req.body.publisher)
        }
        if (req.body.description != undefined) {
            await updateDescription(req.body.isbn, req.body.description)
        }
        if (req.body.category != undefined) {
            await updateCategory(req.body.isbn, req.body.category)
        }
        if (req.body.maturaty_rating != undefined) {
            await updateMaturityRating(req.body.isbn, req.body.maturaty_rating)
        }
        if (req.body.image != undefined) {
            await updateImage(req.body.isbn, req.body.image)
        }
        res.status(200).json({ updated_book: req.body.isbn })
    } catch (e) {
        next(e)
    }
}

/**
 * Get all books
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find({ active: true })
        const output = books.map((book) => {
            return {
                isbn: book.isbn,
                title: book.title,
                authors: book.authors.join(', '),
                publisher: book.publisher,
            }
        })
        return res.status(200).json({ books: output })
    } catch (e) {
        return next(e)
    }
}

const deleteBook = async (req, res, next) => {
    try {
        const book = await findBook(req.params['isbn'])
        book.active = false
        await book.validate()
        await book.save()
        res.status(200).json({ deleted_book: book.isbn })
    } catch (e) {
        return next(e)
    }
}

/**
 * Get all categories
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getCategories = async (req, res, next) => {
    try {
        var categories = await Book.distinct('category')
        res.status(200).json({ categories: categories })
    } catch (e) {
        next(e)
    }
}

/**
 * Check if a customer exists given his reader_card_num
 *
 * @param {Object} schema
 * @returns {Promisse<void>}
 * @throws {Error} if the customer does not exist
 */
const validateCustomer = async (schema) => {
    var customer = null
    try {
        customer = await Customer.findOne({
            reader_card_num: schema.reader_card_num,
        })
    } catch (e) {
        throw e
    }

    if (customer == null) {
        throw Error('param: reader_card_num does not exists.')
    }
    schema.reader_card_num = customer._id
}

const validateRate = async (rate) => {
    if (rate < 1 || rate > 5) {
        throw Error('The rate is invalid.')
    }
}

const alreadyReviewed = async (reviews, customerId) => {
    for (let i = 0; i < reviews.length; i++) {
        if (
            JSON.stringify(reviews[i].reader_card_num) ==
            JSON.stringify(customerId)
        ) {
            throw Error('This custumer already reviewed this book.')
        }
    }
}

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const reviewBook = async (req, res, next) => {
    var body = req.body

    try {
        var book = await findBook(body.isbn)
        await validateRate(body.rate)
        await validateCustomer(body)

        var review = {
            reader_card_num: body.reader_card_num,
            rate: body.rate,
        }

        if (book.reviews == undefined) {
            var reviews = []
            reviews.push(review)
            book.reviews = reviews
        } else {
            await alreadyReviewed(book.reviews, body.reader_card_num)
            book.reviews.push(review)
        }
        await book.validate()
        await book.save()
        res.status(200).json({ message: 'New review added' })
    } catch (e) {
        next(e)
    }
}

module.exports = {
    createBook,
    patchBook,
    getAllBooks,
    getCategories,
    getBook,
    deleteBook,
    reviewBook,
}

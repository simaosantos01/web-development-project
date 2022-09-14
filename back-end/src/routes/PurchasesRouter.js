const router = require('express').Router()

const { PurchasesHandler } = require('../handlers')

router
    .route('/api/purchases')
    /**
     * @openapi
     * /api/purchases/:
     *   post:
     *     description: Create a purchase.
     *     responses:
     *       200:
     *         description: Return the created purchase.
     *     tags:
     *       - Purchases
     */
    .post(PurchasesHandler.createPurchase)
    /**
     * @openapi
     * /api/purchases/:
     *   get:
     *     description: Get all purchases.
     *     responses:
     *       200:
     *         description: Return a collection of purchases.
     *     tags:
     *       - Purchases
     */
    .get(PurchasesHandler.getAllPurchases)

router
    .route('/api/purchases/:reader_card_num')
    /**
     * @openapi
     * /api/purchases/:reader_card_num':
     *   get:
     *     description: Get purchases from a reader card num.
     *     parameters:
     *         - in: query
     *           name: reader_card_num
     *           type: string
     *           description: The Reader Card Num.
     *     responses:
     *       200:
     *         description: Return a collection of purchases.
     *     tags:
     *       - Purchases
     */
    .get(PurchasesHandler.getPurchaseByCostumer)

router
    .route('/api/purchases/status/:reader_card_num')
    /**
     * @openapi
     * /api/purchases/status/:reader_card_num:
     *   get:
     *     description: Get sales analytics from reader card num.
     *     parameters:
     *         - in: query
     *           name: reader_card_num
     *           type: string
     *           description: The Reader Card Num.
     *     responses:
     *       200:
     *         description: Return a collection of analytics.
     *     tags:
     *       - Purchases
     */
    .get(PurchasesHandler.getStatus)


module.exports = router

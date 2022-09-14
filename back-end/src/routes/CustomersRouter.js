const router = require('express').Router()

const { CustomersHandler } = require('../handlers')

router.route('/api/customers')
    /**
     * @openapi
     * /api/customers:
     *   get:
     *     description: Get all customers
     *     responses:
     *       200:
     *         description: Returns all customers.
     *     tags:
     *       - Customers
     */
    .get(CustomersHandler.getAllCustomers)
    /**
     * @openapi
     * /api/customers:
     *   post:
     *     description: Create a customer
     *     responses:
     *       200:
     *         description: Returns the created customer.
     *     tags:
     *       - Customers
     */
    .post(CustomersHandler.createCustomer)

router.route('/api/customer/:reader_card_num')
    /**
     * @openapi
     * /api/customer/:reader_card_num:
     *   get:
     *     description: Get a customer
     *     parameters:
     *         - in: query
     *           name: reader_card_num
     *           type: string
     *           description: The Reader Card Num.
     *     responses:
     *       200:
     *         description: Returns the created customer.
     *     tags:
     *       - Customers
     */
    .get(CustomersHandler.getCustomer)
    /**
     * @openapi
     * /api/customer/:reader_card_num:
     *   patch:
     *     description: Patch a customer
     *     parameters:
     *         - in: query
     *           name: reader_card_num
     *           type: string
     *           description: The Reader Card Num.
     *     responses:
     *       200:
     *         description: Returns the patched customer.
     *     tags:
     *       - Customers
     */
    .patch(CustomersHandler.patchCustomer)
    /**
     * @openapi
     * /api/customer/:reader_card_num:
     *   delete:
     *     description: Delete a customer
     *     parameters:
     *         - in: query
     *           name: reader_card_num
     *           type: string
     *           description: The Reader Card Num.
     *     responses:
     *       200:
     *         description: Return the deleted customer.
     *     tags:
     *       - Customers
     */
    .delete(CustomersHandler.deleteCustomer)

module.exports = router

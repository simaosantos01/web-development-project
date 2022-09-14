const express = require('express')

const {AuthHandler} = require('../handlers')

const router = express.Router()

/**
 * @openapi
 * /api/auth:
 *   post:
 *     description: OAuth
 *     responses:
 *       200:
 *         description: Returns jwt token.
 *     tags:
 *      - OAuth
 */
router.route('/api/auth').post(AuthHandler.auth)

/**
 * @openapi
 * /api/account/:email:
 *   post:
 *     description: Get Account Info
 *     parameters:
 *         - in: query
 *           name: email
 *           type: integer
 *           description: The email to perform lookup.
 *     responses:
 *       200:
 *         description: Returns account info.
 *     tags:
 *       - OAuth
 */
router.route('/api/account/:email').get(AuthHandler.getAccountInfo)

module.exports = router

const router = require('express').Router()

const {SalesHandler} = require('../handlers')

router.route('/api/sales')
    .post(SalesHandler.createSale)

router.route('/api/sales/:reader_card_num')
    .get(SalesHandler.getSales)

router.route('/api/sales/:state/:reader_card_num')
    .get(SalesHandler.getMetric)

router.route('/api/salesMetrics/:reader_card_num')
    .get(SalesHandler.getMetrics)

router.route('/api/sales/:isbn')
    .patch(SalesHandler.sellBook)

module.exports = router
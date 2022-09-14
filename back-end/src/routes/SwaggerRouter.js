const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'BookStore API',
            version: '1.0.0',
        },
    },
    apis: [`${__dirname}/*.js`], // files containing annotations as above
};

console.log(options)

const swaggerSpec = swaggerJsdoc(options);

router.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router

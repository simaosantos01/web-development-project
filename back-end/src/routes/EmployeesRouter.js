const router = require('express').Router()

const {EmployeesHandler} = require('../handlers')

router.route('/api/employees')
    /**
     * @openapi
     * /api/employees/:
     *   get:
     *     description: Get all employees.
     *     responses:
     *       200:
     *         description: Return a collection of employees.
     *     tags:
     *       - Employees
     */
    .get(EmployeesHandler.getAllEmployees)
    /**
     * @openapi
     * /api/employees/:
     *   post:
     *     description: Create an employee.
     *     responses:
     *       200:
     *         description: Return the created employee.
     *     tags:
     *       - Employees
     */
    .post(EmployeesHandler.createEmployee)

router.route('/api/employee/:id')
    /**
     * @openapi
     * /api/employee/:id:
     *   get:
     *     description: Get an employee by its employee no.
     *     parameters:
     *         - in: query
     *           name: id
     *           type: string
     *           description: The Employee No.
     *     responses:
     *       200:
     *         description: Return the employee.
     *     tags:
     *       - Employees
     */
    .get(EmployeesHandler.getEmployee)
    /**
     * @openapi
     * /api/employee/:id:
     *   delete:
     *     description: Remove an employee by its employee no.
     *     parameters:
     *         - in: query
     *           name: id
     *           type: string
     *           description: The Employee No.
     *     responses:
     *       200:
     *         description: Return the removed employee.
     *     tags:
     *       - Employees
     */
    .delete(EmployeesHandler.removeEmployee)
    /**
     * @openapi
     * /api/employee/:id:
     *   patch:
     *     description: Patch an employee bt it's id.
     *     parameters:
     *         - in: query
     *           name: id
     *           type: string
     *           description: The Employee No.
     *     responses:
     *       200:
     *         description: Return the patched employee.
     *     tags:
     *       - Employees
     */
    .patch(EmployeesHandler.changeEmployee)

module.exports = router

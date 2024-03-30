const express = require("express")
const tableController = require("../controllers/tableController")
const router = express.Router()

router.get('/init', tableController.initTables)

router.get('/', tableController.getTables)

router.post('/add', tableController.addTable)

router.get('/:tableId', tableController.getTableInfo)
    .put('/:tableId/status', tableController.updateTableStatus)
    .put('/:tableId/open', tableController.openTable)

router.put('/swap', tableController.swapTables)

module.exports = router
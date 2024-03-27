const express = require("express");
const tableController = require("../controllers/tableController");

const router = express.Router();

router.get('/init', tableController.initTables)
router.get('/', tableController.getTables)
router.get('/:tabledId', tableController.getTableInfo)
router.put('/updateStatus/:tableId', tableController.updateTableStatus)
router.put('/open/:tableId', tableController.openTable)
router.put('/swap', tableController.swapTables)

module.exports = router;
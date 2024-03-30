const Table = require('../models/table')
const Order = require('../models/order')

module.exports.initTables = async (req, res) => {
    const tableData = [
        { tableId: 1, location: 'Main Dining Area', status: 'ACTIVE'},
        { tableId: 2, location: 'Main Dining Area', status: 'ACTIVE'},
        { tableId: 3, location: 'Main Dining Area', status: 'ACTIVE'},
        { tableId: 4, location: 'Main Dining Area', status: 'ACTIVE'},
        { tableId: 5, location: 'Main Dining Area', status: 'INACTIVE'}
    ]

    try {
        const savedTables = await Promise.all(tableData.map(table => new Table(table).save()));
        res.status(200).json({ message: "Tables initialized successfully", data: savedTables })
    } catch (error) {
        res.status(500).json({ message: "Failed to initialize tables", error: error.message })
    }
}

module.exports.addTable = async (req, res) => {
    try {
        const newTable = new Table(req.body)
        const savedTable = await newTable.save();
        res.status(201).json({ message: "Table added successfully", data: savedTable })
    } catch (error) {
        res.status(500).json({ message: "Failed to add table", error: error.message })
    }
}

module.exports.getTables = async (req, res) => {
    try {
        const tables = await Table.find()
        res.status(200).json({ message: "Tables fetched successfully", data: tables })
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch tables", error: error.message })
    }
}

module.exports.getTableInfo = async (req, res) => {
    const { tableId } = req.params
    try {
        const table = await Table.findById(tableId)
        if (!table) {
            return res.status(404).json({ message: "Table not found" })
        }
        res.status(200).json({ message: "Table information fetched successfully", data: table })
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch table information", error: error.message })
    }
}

module.exports.updateTableStatus = async (req, res) => {
    const { tableId } = req.params
    const { status } = req.body

    try {
        const table = await Table.findById(tableId)
        if (!table) {
            return res.status(404).json({ message: "Table not found" })
        }

        table.status = status
        await table.save()
        res.status(200).json({ message: "Table status updated successfully", data: table })
    } catch (error) {
        res.status(500).json({ message: "Failed to update table status", error: error.message })
    }
}

module.exports.openTable = async (req, res) => {
    const { tableId } = req.params

    try {
        const table = await Table.findOne({ tableId: parseInt(tableId, 10) })
        if (!table) {
            return res.status(404).json({ message: "Table not found" })
        }

        if (table.status === 'ACTIVE') {
            table.status = 'OCCUPIED'
            await table.save()

            const newOrder = new Order({
                tableId: table._id,
            })
            await newOrder.save()

            return res.status(200).json({
                message: "Table opened and new order created",
                data: { table, order: newOrder }
            })
        } else {
            let errorMessage = 'Table cannot be opened'
            if (table.status === 'OCCUPIED') {
                errorMessage = 'Table is already occupied'
            } else if (table.status === 'INACTIVE') {
                errorMessage = 'Table is not in an ACTIVE status'
            }
            return res.status(400).json({ message: errorMessage })
        }
    } catch (error) {
        console.error('Error opening table:', error);
        return res.status(500).json({
            message: "Failed to open table or create order",
            error: error.message
        })
    }
}

module.exports.swapTables = async (req, res) => {
    const { tableId1, tableId2 } = req.body
    try {
        const [table1, table2] = await Promise.all([
            Table.findOne({ tableId: tableId1 }),
            Table.findOne({ tableId: tableId2 })
        ]);

        if (!table1 || !table2) {
            return res.status(404).json({ message: "One or both tables not found" })
        }

        let tempStatus = table1.status
        table1.status = table2.status
        table2.status = tempStatus

        await Promise.all([table1.save(), table2.save()])

        if (table1.status === 'OCCUPIED' || table2.status === 'OCCUPIED') {
            let [order1, order2] = await Promise.all([
                Order.findOne({ table: table1._id }),
                Order.findOne({ table: table2._id })
            ])

            if (order1) {
                order1.table = table2._id
                await order1.save()
            }

            if (order2) {
                order2.table = table1._id
                await order2.save()
            }
        }

        res.status(200).json({ message: "Tables swapped successfully", data: { table1, table2 } })
    } catch (error) {
        res.status(500).json({ message: "Failed to swap tables", error: error.message })
    }
}
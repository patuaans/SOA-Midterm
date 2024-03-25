const Table = require('../models/table')
const Order = require('../models/order')

module.exports.initTables = async (req, res) => {
    const tableData = [
        { seat_count: 4, location: 'Main Dining Area', status: 'ACTIVE', isOccupied: true },
        { seat_count: 2, location: 'Main Dining Area', status: 'ACTIVE' , isOccupied: true},
        { seat_count: 4, location: 'Main Dining Area', status: 'ACTIVE' , isOccupied: false},
        { seat_count: 8, location: 'Main Dining Area', status: 'ACTIVE' , isOccupied: false},
        { seat_count: 4, location: 'Main Dining Area', status: 'INACTIVE', isOccupied: false}
    ]

    tableData.forEach(data => {
        const newTable = new Table(data);
        newTable.save()
            .then(() => res.status(200).json({ success: true, data: newTable}))
            .catch(err => res.status(500).send('Server error'));
    })

}

module.exports.getTableInfo = async (req, res) => {
    let tableId = req.params.tabledId

    try {
        const table = await Table.findById(tableId)
        if (!table) {
            return res.status(404).send('Table not found')
        }
        res.json(table)
    } catch (error) {
        console.error('Error fetching table information:', error)
        res.status(500).send('Server error')
    }
}

module.exports.updateTableStatus = async (req, res) => {
    const tableId = req.params.tableId
    const { status } = req.body

    if (!['ACTIVE', 'INACTIVE'].includes(status)) {
        return res.status(400).send('Invalid status provided. Must be either "ACTIVE" or "INACTIVE"')
    }

    try {
        const table = await Table.findById(tableId)
        if (!table) {
            return res.status(404).send('Table not found')
        }

        if (table.status != status) {
            table.status = status
            await table.save()
            res.json({ message: 'Table status updated successfully', table })
        } else {
            res.status(200).send('Table status is already ' + status)
        }
    } catch (error) {
        console.error('Error fetching table information:', error)
        res.status(500).send('Server error')
    }
}

module.exports.openTable = async (req, res) => {
    const tableId = req.params.tableId;

    try {
        const table = await Table.findById(tableId)
        if (!table) {
            return res.status(404).send('Table not found')
        }

        if (!table.isOccupied && table.status === 'ACTIVE') {
            table.isOccupied = true;
            await table.save();

            const newOrder = new Order({
                tableId: table._id,
            });
            await newOrder.save()

            res.json({ message: 'Table has been opened and a new order has been created.', table, order: newOrder })
        } else if (table.isOccupied) {
            res.status(400).send('Table is already occupied.')
        } else if (table.status !== 'ACTIVE') {
            res.status(400).send('Table cannot be opened as it is not in an ACTIVE status.')
        }
    } catch (error) {
        console.error('Error updating table status or creating order:', error)
        res.status(500).send('Server error')
    }
}

module.exports.swapTables = async (req, res) => {
    const { tableId1, tableId2 } = req.body;

    try {
        const [table1, table2] = await Promise.all([
            Table.findById(tableId1),
            Table.findById(tableId2)
        ]);

        if (!table1 || !table2) {
            return res.status(404).send('One or both tables not found')
        }

        let tempIsOccupied = table1.isOccupied;
        table1.isOccupied = table2.isOccupied;
        table2.isOccupied = tempIsOccupied;

        await Promise.all([table1.save(), table2.save()])

        let ordersToUpdate = []

        if (table1.isOccupied) {
            let order1 = await Order.findOne({ tableId: table1._id })
            if (order1) {
                order1.tableId = tableId2
                await order1.save()
                ordersToUpdate.push(order1)
            }
        }

        if (table2.isOccupied) {
            let order2 = await Order.findOne({ tableId: table2._id })
            if (order2) {
                order2.tableId = tableId1
                await order2.save()
                ordersToUpdate.push(order2)
            }
        }

        res.json({
            message: 'Tables have been successfully swapped',
            tables: [table1, table2],
            orders: ordersToUpdate
        })
    } catch (error) {
        console.error('Error swapping tables and orders:', error)
        res.status(500).send('Server error')
    }
}
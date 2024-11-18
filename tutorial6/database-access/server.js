

let express = require('express');
let cors = require('cors')
let bodyParser = require('body-parser');
const pool = require('./pool.js');  // db pool

const app = express();
app.use(express.static('public'));

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // allow all origins -> Access-Control-Allow-Origin: * (only for better testing)
app.use(bodyParser.json()); // support json encoded bodies


app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send("This is a simple db application");
});

// GET -> fetching data from the server
app.get('/items', (req, res) => {
    const query = { text: `SELECT * FROM items` };

    pool.query(query)
        .then(results => {
            const rows = results.rows;
            if (rows.length < 1) return res.status(404).json({ error: "Query not found!" });
            res.json(rows);
        }).catch(error => {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        })
})


// PUT -> update/replace existing resources on the server
// We can use await or .then chaining. Keep in mind adding async when using await
app.put('/items/item/:id', async (req, res) => {
    const id = req.params.id;
    const name = req.query?.name;

    console.log("Name: " + name);

    if (!id) return res.status(400).json({ error: "Product ID is required" });
    if (!name) return res.status(400).json({ error: "Description is required" });

    const query = {
        text: `UPDATE items SET name=$1 WHERE id=$2`,
        values: [name, id]
    }

    try {
        // Begin transaction
        await pool.query('BEGIN');

        // Execute the update query
        const result = await pool.query(query);
        const affectedRows = result.rowCount;

        if (affectedRows === 0) {
            await pool.query('ROLLBACK'); // Rollback if no rows were updated
            return res.status(404).json({ error: "No entry changed!" });
        }

        // Commit the transaction if successful
        await pool.query('COMMIT');
        console.log("Successfully updated query!");

        return res.status(200).json({
            success: "Success!",
            rowsChanged: affectedRows,
            nowDescription: name
        });
    } catch (error) {
        // Rollback on error
        await pool.query('ROLLBACK');
        console.error("Error executing query:", error);
        return res.status(500).json({ error: "Error executing query: " + error.message });
    }
})

// POST -> sending data to an api. Typically used to create new resources
app.post('/items/item/:id', async (req, res) => {
    const id = req.params.id;
    const name = req.query.name;

    if (!id) return res.status(400).json({ error: "ID is required in the URL" });
    if (!name) return res.status(400).json({ error: "Item name is required" });

    console.log(`Creating new item with id ${id} and name ${name}`);
    

    const query = {
        text: `INSERT INTO items (id, name) VALUES ($1, $2)`,
        values: [id, name]
    };

    try {
        // Begin transaction
        await pool.query('BEGIN');

        // Insert the new product
        const result = await pool.query(query);
        const affectedRows = result.rowCount;

        if (affectedRows === 0) {
            await pool.query('ROLLBACK'); // Rollback if insertion failed
            return res.status(500).json({ error: "Failed to create item" });
        }

        // Commit the transaction
        await pool.query('COMMIT');
        console.log(`Item created with ID: ${id}`);

        return res.status(201).json({
            success: "Item created successfully!",
            ItemId: id
        });
    } catch (error) {
        // Rollback on error
        await pool.query('ROLLBACK');
        console.error("Error executing query:", error);
        return res.status(500).json({ error: "Error executing query: " + error.message });
    }
})


// DELETE -> Remove or delete resource from server
app.delete('/items/item/:id', async (req, res) => {
    const id = req.params.id;

    // Validate id
    if (!id) return res.status(400).json({ error: "ID is required in the URL" });

    console.log(`Deleting item with ID: ${id}`);

    const query = {
        text: `DELETE FROM items WHERE id = $1`,
        values: [id]
    };

    try {
        // Begin transaction
        await pool.query('BEGIN');

        // Execute delete query
        const result = await pool.query(query);
        const affectedRows = result.rowCount;

        if (affectedRows === 0) {
            await pool.query('ROLLBACK'); // Rollback if no rows were deleted
            return res.status(404).json({ error: "Item not found" });
        }

        // Commit the transaction
        await pool.query('COMMIT');
        console.log(`Successfully deleted item with ID: ${id}`);

        return res.status(200).json({
            success: "Item deleted successfully!",
            productId: id
        });
    } catch (error) {
        // Rollback on error
        await pool.query('ROLLBACK');
        console.error("Error executing query:", error);
        return res.status(500).json({ error: "Error executing query: " + error.message });
    }
});



let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:" + port);

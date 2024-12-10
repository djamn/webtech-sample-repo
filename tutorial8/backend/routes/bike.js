const express = require('express');
const router = express.Router();
const pool = require('../pool');

router.get('/', async (req, res) => {
    try {
        const query = {
            text: 'SELECT * FROM Bike',
            values: []
        };

        const results = await pool.query(query);

        if (results.rows.length <= 0) {
            return res.status(404).json({ error: "Nothing found" });
        }

        res.status(200).json(results.rows);
    } catch (error) {
        console.error("Error while fetching bikes:", error.message);
        res.status(500).json({ error: "Error while fetching bikes: " + error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const bikeId = req.params.id;

    try {
        const query = {
            text: `DELETE FROM Bike WHERE bike_id = $1`,
            values: [bikeId]
        };

        console.log("Executing: " + query.text + " with values: " + query.values);

        const results = await pool.query(query);

        if (results.rowCount === 0) {
            return res.status(404).json({ error: "Bike not found" });
        }

        res.status(200).json({ message: "Bike deleted successfully", amount: results.rowCount });
    } catch (error) {
        console.error("Error while deleting bike:", error.message);
        res.status(500).json({ error: "Error while deleting bike: " + error.message });
    }
});

module.exports = router;
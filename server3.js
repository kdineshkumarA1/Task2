const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();

app.use(cors());
app.use(express.json());

const dbconfig = {
    user: "system",
    password: "Konduru0911",
    connectString: "localhost:1521/XE"
};

app.get("/api/login", async (req, res) => {
    const { email, password } = req.query;

    console.log("Received:", email, password);

    try {
        const connection = await oracledb.getConnection(dbconfig);

        const result = await connection.execute(
            `SELECT USER_PASSWORD FROM store_base WHERE CUS_EMAIL = :email`,
            { email },
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        console.log("DB Result:", result.rows);

        await connection.close();

        if (result.rows.length === 0) {
            return res.status(401).json({ success: false, message: "❌ Invalid Email" });
        }

        const hashedPassword = result.rows[0].USER_PASSWORD;
        const isMatch = await bcrypt.compare(password, hashedPassword);

        console.log("Password Match:", isMatch);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "❌ Invalid Password" });
        }

        return res.json({ success: true, message: "✅ Login Successful" });

    } catch (err) {
        console.error("DB ERROR:", err);
        res.status(500).json({ message: "Database Error", error: err.message });
    }
});

app.listen(3000, () => {
    console.log("✅ Server running at http://localhost:3000");
});

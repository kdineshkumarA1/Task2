const express=require('express');
const oracledb=require('oracledb');
const cors=require('cors');
const path=require('path');
app=express();
app.use(cors())
app.use(express.json())
const dbconfig={
    user: "system",
    password: "Konduru0911",
    connectString: "localhost:1521/XE"
};
app.get('/api/getData',async (req,res) =>{
    const table_name=req.query.table_name;
    let connection;
    try {
        connection = await oracledb.getConnection(dbconfig);
        const result = await connection.execute(`SELECT * FROM ${table_name}`);
        res.status(200).json({success: true,users: result.rows});

  } catch (error) {
    console.error("Error while fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load users"
    });
  }finally {
    if (connection) {
      await connection.close();
    }
  }
});
app.listen(8070, () => {
  console.log("✅ Server running at http://localhost:8070");
});

const { database } = require("../db");
//post
const addDepartment = async (req, res) => {
  try {
    const sql = await database.query(
      "CREATE TABLE deptDetails(id SERIAL PRIMARY KEY,dept_Name VARCHAR NOT NULL,address VARCHAR NOT NULL)"
    );
    console.log("TABLE CREATED", sql);
    res.status(200).json({
      message: "table created successfully",
      res: sql,
    });
  } catch (error) {
    console.log("unable to create the table");
    console.log(error.message);
    res.status(400).json({
      message: "table not created successfully",
    });
  }
};
//insert
const insertDepartmentValues = async (req, res) => {
  try {
    const sql = await database.query(
      `INSERT INTO deptDetails(dept_name,address) VALUES ('${req.body.dept_name}','${req.body.address}')`
    );
    console.log("inserted records into db", sql);
    res.status(200).json({
      message: "inserted records into db",
      res: sql.rowCount,
    });
  } catch (error) {
    console.log("unable to insert record into db");
    console.log(error.message);
    res.status(400).json({
      message: "unable to insert record into db",
    });
  }
};

//findall
const findallRecords = async (req, res) => {
  try {
    const sql = await database.query(`select * from deptDetails`);
    console.log("rows in db", sql.rows);
    if (sql.rows < '1') {
      res.status(400).json({ message: "no rows exists in db" });
    } else {
      console.log("fetched all records from db", sql);
      res.status(200).json({
        message: "fetched all records from db",
        res: sql.rows,
      });
    }
  } catch (error) {
    console.log("unable fetch records from db");
    console.log(error.message);
    res.status(400).json({
      message: "unable fetch records from db",
    });
  }
};

//findbyName
const findOneDepartment = async (req, res) => {
  try {
    dept_name = req.body.dept_name;
    const sql = await database.query(
      `select * from deptDetails where dept_name='${dept_name}'`
    );
    console.log("rows in db", sql.rows);
    if (sql.rows < '1') {
      console.log("no rows in db");
    } else {
      console.log("fetch records from db", sql);
      res.status(200).json({
        message: "fetch records from db",
        res: sql.rows,
      });
    }
  } catch (error) {
    console.log("unable fetch records from db");
    console.log(error.message);
    res.status(400).json({
      message: "unable fetch records from db",
    });
  }
};

//updateStudent
const updateDepartment = async (req, res) => {
  try {
    dept_name = req.body.dept_name;
    address = req.body.address;

    const sql = await database.query(
      `update deptDetails set dept_name ='${dept_name}' where address='${address}'`
    );
    
    console.log("update record successfully", sql.rowCount);
    res.status(200).json({
      message: "update record successfully",
      res: sql.rowCount,
    });
  } catch (error) {
    console.log("unable update record in db");
    console.log(error.message);
    res.status(400).json({
      message: "unable update record in db",
    });
  }
};

//delete
const deleteDepartment = async (req, res) => {
  try {
    dept_name = req.body.dept_name;
    const sql = await database.query(
      `delete from deptDetails where dept_name='${dept_name}'`
    );
    console.log("deleted record from db", sql.rowCount);
    res.status(200).json({
      message: "deleted record from db",
      res: sql.rowCount,
    });
  } catch (error) {
    console.log("unable to delete record from db");
    console.log(error.message);
    res.status(400).json({
      message: "unable to delete record from db",
    });
  }
};

module.exports = {
    addDepartment,
  insertDepartmentValues,
  findallRecords,
  findOneDepartment,
  updateDepartment,
  deleteDepartment
};

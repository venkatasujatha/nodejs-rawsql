const { query } = require("express");
const { database } = require("../db");
//post
const add = async (req, res) => {
  try {
    const sql = await database.query(
      "CREATE TABLE studentDetails(id SERIAL PRIMARY KEY,student_Name VARCHAR NOT NULL,age VARCHAR NOT NULL)"
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
//insertion
const insert = async (req, res) => {
    try {
        student_name =req.body.student_name;
        age=req.body.age
        const sql = await database.query(
            `INSERT INTO studentDetails(student_name,age) VALUES ('${student_name}','${age}')`);
           
            console.log("result",sql);
            res.status(200).json({
                message: "inserted records into db",
                res: sql.rowCount
              });

    } catch (error) {
      console.log(error); 
      res.status(400).json({
        message: "unable to insert record into db",
      });   
    }
  }

//findall
const findall = async (req, res) => {
  try {
    const sql = await database.query(`select * from studentDetails`);
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
const findOneStudent = async (req, res) => {
  try {
    student_name = req.body.student_name;
    const sql = await database.query(
      `select * from studentDetails where student_name='${student_name}'`
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
const updateStudent = async (req, res) => {
  try {
    student_name = req.body.student_name;
    age = req.body.age;

    const sql = await database.query(
      `update studentDetails set student_name ='${student_name}' where age='${age}'`
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
const deleteStudent = async (req, res) => {
  try {
    student_name = req.body.student_name;
    const sql = await database.query(
      `delete from studentDetails where student_name='${student_name}'`
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
  add,
  findall,
  findOneStudent,
  updateStudent,
  deleteStudent,
  insert
};

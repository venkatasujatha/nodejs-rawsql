const { query } = require("express");
const format = require("pg-format");
const { database } = require("../db");

//post
const add = async (req, res) => {
  try {
    const sql = await database.query(
      "CREATE TABLE if not exists studentDetails(id SERIAL PRIMARY KEY,student_Name VARCHAR NOT NULL,age VARCHAR NOT NULL)"
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
const insert = async (req, res) => {
  try {
    student_name = req.body.student_name;
    age = req.body.age;
    const sql = await database.query(
      `INSERT INTO studentDetails(student_name,age) VALUES ('${student_name}','${age}');
        INSERT INTO deptDetails(dept_name,address,id) VALUES ('${req.body.dept_name}','${req.body.address}',${req.body.id});`
    );

    console.log("result", sql);
    res.status(200).json({
      message: "inserted records into db",
      res: sql.rowCount,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "unable to insert record into db",
    });
  }
};
//insert
const insertValues = async (req, res) => {
  try {
    const values = req.body;

    let arr = [];
    values.map((item) => {
      let data = [(student_name = item.student_name), (age = item.age)];
      console.log("data", data);
      arr.push(data);
    });

    const sql = `INSERT INTO studentDetails(student_name,age) VALUES %L`;

    const formatedQuery = format(sql, arr);

    console.log("array values", arr);
    await database.query(formatedQuery, function (error, result) {
      if (error) {
        console.log(error.message);
      }
      console.log("result", result);
      res.status(200).json({
        message: "inserted records into db",
        res: result,
      });
    });
  } catch (error) {
    console.log("unable to insert record into db");
    console.log(error.message);
    res.status(400).json({
      message: "unable to insert record into db",
    });
  }
};

//sudo kill -9 $(sudo lsof -t -i:3000)

//findall
const findall = async (req, res) => {
  try {
    // const sql = await database.query(`select * from studentDetails,deptDetails WHERE studentDetails.id =deptDetails.dept_id`);
    const sql = await database.query(`SELECT *
        FROM studentDetails E NATURAL JOIN deptDetails D`);
    console.log("rows in db", sql.rows);
    if (sql.rows < "1") {
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
    age =req.body.age
    if(student_name)
    {
        const sql = await database.query(
            `select *
                  FROM studentdetails
                  INNER JOIN deptDetails ON studentdetails.id = deptDetails.dept_id  WHERE studentDetails.student_name ='${student_name}' `
            //   `select * from studentDetails where student_name='${student_name}'
            //   `
          );
          console.log("rows in db", sql.rows);
          if (sql.rows < "1") {
            console.log("no rows in db");
          } else {
            console.log("fetch records from db", sql);
            res.status(200).json({
              message: "fetch records from db",
              res: sql.rows,
            });
          }

    }
    else if(age)
    {
        const sql = await database.query(
            `select *
                  FROM studentdetails
                  INNER JOIN deptDetails ON studentdetails.id = deptDetails.dept_id  WHERE studentDetails.age ='${age}' `
            //   `select * from studentDetails where student_name='${student_name}'
            //   `
          );
          console.log("rows in db", sql.rows);
          if (sql.rows < "1") {
            console.log("no rows in db");
          } else {
            console.log("fetch records from db", sql);
            res.status(200).json({
              message: "fetch records from db",
              res: sql.rows,
            });
          }
    }
    else
    {
        console.log("please provide valid details")
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
    dept_name =req.body.dept_name
    address =req.body.address
    if(dept_name)
    {
        const sql = await database.query(
            //`update studentDetails set student_name ='${student_name}' where age='${age}'`
            `update deptDetails  set dept_name ='${dept_name}' where  id= ${req.body.id}`
          );
      
          console.log("update name field successfully", sql.rowCount);
          res.status(200).json({
            message: "update record successfully",
            res: sql.rowCount,
          });
    }
    else if(address)
    {
        const sql = await database.query(
            //`update studentDetails set student_name ='${student_name}' where age='${age}'`
            `update deptDetails  set address ='${address}' where  id= ${req.body.id}`
          );
      
          console.log("update address field successfully", sql.rowCount);
          res.status(200).json({
            message: "update record successfully",
            res: sql.rowCount,
          });
    }
    else{
        console.log("please provide valid details");
        res.status(400).json({
            message: "please provide valid details"
          });
    }
   
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
    id=req.body.id
    if(id)
    {
      const sql = await database.query(`DELETE FROM deptdetails  d USING studentDetails s
    WHERE d.id = s.id and s.id = ${id};
DELETE FROM studentdetails  s WHERE s.id =${id};`
     // `delete from studentDetails where student_name='${student_name}'`
    );
    console.log("deleted record from db", sql.rowCount);
    res.status(200).json({
      message: "deleted record from db",
      res: sql.rowCount,
    });
    }
    else if (student_name)
    {
      const sql = await database.query(`DELETE FROM deptdetails  d USING studentDetails s
      WHERE d.id = s.id and s.student_name = '${student_name}';
  DELETE FROM studentdetails  s WHERE s.student_name ='${student_name}';`
       // `delete from studentDetails where student_name='${student_name}'`
      );
      console.log("deleted record from db", sql.rowCount);
    res.status(200).json({
      message: "deleted record from db",
      res: sql.rowCount,
    });
    }
    else{
      console.log("please provide valid details");
      res.status(400).json({
        message: "please provide valid details",
      });
    }
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
  insertValues,
  findall,
  findOneStudent,
  updateStudent,
  deleteStudent,
  insert,
};

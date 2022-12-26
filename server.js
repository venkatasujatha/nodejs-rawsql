const {database}=require('./db');
const express =require('express');
const app =express();
const cors =require('cors');
const bodyParser =require('body-parser');
require('dotenv').config()
const router =require('./router/router')
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/',router)

async function run()
{
    database.connect();
     await database.query(
        `CREATE TABLE if not exists studentDetails(id SERIAL PRIMARY KEY,student_Name VARCHAR NOT NULL,age VARCHAR NOT NULL);
      
        CREATE TABLE if not exists deptDetails(dept_id SERIAL PRIMARY KEY,dept_Name VARCHAR NOT NULL,address VARCHAR NOT NULL,
            id INT unique ,CONSTRAINT FK_employee_department  FOREIGN KEY(id) REFERENCES studentDetails(id));`
      );
      console.log("DEPARTMENT TABLE CREATED");
      console.log("student TABLE CREATED");
    console.log('database is initialized')
    app.listen(process.env.port,()=>{
        console.log(`server listening on port ${process.env.port}`)
    })
}
run()
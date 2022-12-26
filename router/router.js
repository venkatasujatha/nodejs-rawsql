const router=require('express').Router()
const studentController =require('../controller/studentController');
const deptController =require('../controller/departmentController')

router.post('/save',studentController.add);
router.post('/insert',studentController.insertValues);
router.get('/get',studentController.findall);
router.post('/getbyName',studentController.findOneStudent);
router.put('/updateStudent',studentController.updateStudent)
router.delete('/deleteStudent',studentController.deleteStudent)
router.post('/insert1',studentController.insert)

//department
router.post('/saveDept',deptController.addDepartment);
router.post('/insertDept',deptController.insertDepartmentValues);
router.get('/getDept',deptController.findallRecords);
router.post('/getbyDeptName',deptController.findOneDepartment);
router.put('/updateDept',deptController.updateDepartment)
router.delete('/deleteDept',deptController.deleteDepartment)
module.exports=router
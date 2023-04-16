import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "./DataContext.js";

// Function to provide data to the context-API

const DataProvider = (props) => {

    // URL of the mock-API
    const url = "https://639ac1bf31877e43d6751029.mockapi.io/studentTeacherPage/";

    const navigate = useNavigate();

    // Defining an initial state for all students and all teachers
    const [allStudentsData, setAllStudentsData] = useState([]);
    const [allTeachersData, setAllTeachersData] = useState([]);
    

    // Function to get the data of all students and teachers
    const getAllStudentsTeachersData = async () => {
        await fetch(url)
        .then(dat=>dat.json())
        .then(res=>{
            setAllStudentsData(res.filter(dat=>dat.category==="student"));
            setAllTeachersData(res.filter(dat=>dat.category==="teacher"));
           
        });     
    }


    // Calling "getAllStudentsTeachersData" function whenever the state changes
    useEffect(()=>{
        getAllStudentsTeachersData();             
    },[]);



// --------------------CRUD for students--------------------------------//

    // Defining an empty data for student form
    const emptyStudentFormData = {
        "category": "student",
        "name": "",
        "email": "",
        "batch": "",
        "course": "",
        "teacher": "",
      };

    //   Defining an initial state for "studentFormData"
    const [studentFormData, setStudentFormData] = useState(emptyStudentFormData);

    // Function to handle the changes in the input fields of student form (utilised when creating or updating)
    const handleChangeStudentFormData = (e) => {
        setStudentFormData({...studentFormData, [e.target.name]:e.target.value});
    }

    // Function (will be called by the selection list in create or edit-students page) to set the teacher-id to the "studentFormData"
    const selectTeacherForStudent = (e) => {
        // eslint-disable-next-line
        setStudentFormData({...studentFormData, ["teacher"]:e.target.value});
    }

    // Function to handle the submission of data in create or edit-student page
    const handleSubmitStudentForm = async (studId) => {
        // If "studId" is there then edit (update or PUT)
        if(studId){
            await fetch(url + studId, {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(studentFormData),
            }).then(dat=>{getAllStudentsTeachersData(); navigate('/students')});
            
        }else{
            // If "studId" is not there then create (POST)
            await fetch(url, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(studentFormData),
            }).then(dat=>{getAllStudentsTeachersData(); navigate('/students')});
        }

    }


    // Function to delete a student
    const handleDeleteStudent = async (id) => {
        if(id){
            await fetch(url + id, {
                method:"DELETE",
            }).then(dat=>{getAllStudentsTeachersData(); navigate('/students')});
            
        }
    }

    // Function to populate the fields of student-form
    const fillDataForStudentForm = async (studId) => {
        if(studId!==null){
            // When it is "edit-student" then populating with the data of that student
            await fetch(url+studId)
            .then(dat=>dat.json())
            .then(res=>{
                setStudentFormData(res);
            }); 
        }else{
            // When it is "create-student" then populating with empty data
            setStudentFormData(emptyStudentFormData);
        }
    }


// ---------------------------------CRUD for teachers---------------------------//


    // Defining an empty data for teacher-form
    const emptyTeacherFormData = {
        "category": "teacher",
        "name": "",
        "email": "",
        "fields": "",
      };

    //   Definining an intial state for "teacherFormData" (will be utilised when creat or edit-teacher)
    const [teacherFormData, setTeacherFormData] = useState(emptyTeacherFormData);

    // Function to handle the changes in the input fields of teacher-form
    const handleChangeTeacherFormData = (e) => {
        setTeacherFormData({...teacherFormData, [e.target.name]:e.target.value});
    }

    // Function to submit data when create or edit-teacher
    const handleSubmitTeacherFormData = async (teacherId) => {
        if(teacherId){
            // If "teacherId" is there then edit (update or PUT) teacher
            await fetch(url + teacherId, {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(teacherFormData),
            }).then(dat=>{getAllStudentsTeachersData(); navigate('/teachers')});
            
        }else{
            // When "teacherId" is not there then create (POST) teacher
            await fetch(url, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(teacherFormData),
            }).then(dat=>{getAllStudentsTeachersData(); navigate('/teachers')});
        }
    }

    // Function to populate the fields of teacher-form
    const fillDataForTeacherForm = async (teacherId) => {
        if(teacherId!==null){
            // if "teacherId" is NOT null then populate with the data of that teacher
            await fetch(url+teacherId)
            .then(dat=>dat.json())
            .then(res=>setTeacherFormData(res));
        }else{
            // if "teacherId" is null then populate with "emptyTeacherFormData"
            setTeacherFormData(emptyTeacherFormData);
        }
    }


    // Function to delete a teacher
    // Here, while deleting a teacher, we must unlink the students those were assigned to this particular teacher first
    // Then delete the teacher
    const handleDeleteTeacher = async (teacherId) => {

        // Taking the ids of the students who are assigned to this particular teacher
        let mentoringStudentsIds = allStudentsData.filter(val=>val.teacher===teacherId).map(stu=>stu.id);
        
        // From these taken ids, making the "teacher" field of these students to "" and updating these students
        mentoringStudentsIds.map(async (studId)=>{
            await fetch(url+studId)
            .then(dat=>dat.json())
            .then(async(res)=>{
                // Making the "teacher" field of these students to "" and updating these students
                res.teacher = "";
                await fetch(url+studId,{
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(res)
                }).then(dt=>getAllStudentsTeachersData());
            });
        });

        // Now deleting that particular teacher
        await fetch(url+teacherId,{
            method:"DELETE"
        }).then(dt=>{getAllStudentsTeachersData(); navigate('/teachers')});

    }

    // Providing variables, states, and functions to "DataContext"
    return <DataContext.Provider value={{allStudentsData, allTeachersData, studentFormData, handleChangeStudentFormData, selectTeacherForStudent, handleSubmitStudentForm, fillDataForStudentForm, handleDeleteStudent, teacherFormData, handleChangeTeacherFormData, handleSubmitTeacherFormData, fillDataForTeacherForm, handleDeleteTeacher}}>
        {props.children}
    </DataContext.Provider>   
}

export default DataProvider;

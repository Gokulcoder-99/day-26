import {Container, Button, Form, FormGroup, Label, Input} from "reactstrap";
import {useNavigate, useParams} from "react-router-dom";
import { useContext, useEffect } from "react";
import DataContext from "./DataContext";


// Component to handle view-student (read), create-student, edit-student (update)
function ActionStudent(){
    const navigate = useNavigate();

    // Taking the params
    const {id, toView} = useParams();
   
    // Utilising the created context (DataContext)
    const context = useContext(DataContext);

    // Taking required variables, states, functions from "DataContext" (global storage)
    const studentFormData = context.studentFormData;
    const handleChangeStudentFormData = context.handleChangeStudentFormData;
    const allTeachersData = context.allTeachersData;
    const selectTeacherForStudent = context.selectTeacherForStudent;
    const handleSubmitStudentForm = context.handleSubmitStudentForm;
    const fillDataForStudentForm = context.fillDataForStudentForm;
    
    // Calling "fillDataForStudentForm" to populate the form-fields whenever the state changes
    useEffect(()=>{
        if(id){
            fillDataForStudentForm(id);
        }else{
            fillDataForStudentForm(null);
        }
        // eslint-disable-next-line
    },[]);

    
    let allFieldsDisabled = false;

    // Flag to disable all the input fields of student-form when it is to view (read) the student details
    if(toView){
        allFieldsDisabled = true;
    }

    return <Container className="main-container">
        
        <p className="netlify-suggestion-p">Kindly <b>DO NOT REFRESH</b> this netlify site when you are in the page other than home (dashboard) page. If you refresh on page other than home page, then it will give "page not found" (problem with netlify deployment). </p>
            
        <br />
        <h5>{id && toView ? "View-student page" : id? "Edit-student page" : "Create-student page"}</h5>
        <br />
        {id && toView? (<Button color="info" onClick={()=>navigate("/students")} >To students page</Button>): ""}
        <br />
        <br />
        <Form>
            <FormGroup className="actionStudent-formgroup">

                {/* Input field for "category" (it will be "student" by default) */}
                <Label for="category"><i>Category</i> </Label>
                <Input name="category" value={studentFormData.category} placeholder="Category" disabled={true} />

                {/* Input field for "student-name" */}
                <Label for="name"> <i>Name</i> </Label>
                <Input name="name" value={studentFormData.name} placeholder="Student name" onChange={handleChangeStudentFormData} disabled={allFieldsDisabled} />

                {/* Input field for "email" */}
                <Label for="email" > <i>Email</i> </Label>
                <Input name="email" value={studentFormData.email} placeholder="Email" onChange={handleChangeStudentFormData} disabled={allFieldsDisabled} />

                {/* Input field for "batch" */}
                <Label for="batch"> <i>Batch</i> </Label>
                <Input name="batch" value={studentFormData.batch} placeholder="Batch" onChange={handleChangeStudentFormData} disabled={allFieldsDisabled} />

                {/* Input field for "course" */}
                <Label for="course"> <i>Course</i> </Label>
                <Input name="course" value={studentFormData.course} placeholder="Course" onChange={handleChangeStudentFormData} disabled={allFieldsDisabled} />

                {/* Input field for selected "teacher-id" */}
                {/* This field will be disabled and the value will be set based on the option selected in the below selection-list */}
                <Label for="teacher"> <i>Teacher Id</i> </Label>
                <Input name="teacher" value={studentFormData.teacher} placeholder="Teacher Id" disabled={true} />


                {toView?("")
                :
                    (<>
                        <Label for="select-block">Choose a teacher here:</Label>

                        {/* Selection list which provides the names of teachers */}
                        <select className="select-block" name="select-block" onChange={selectTeacherForStudent}> 

                        {/* A default option with empty value in it */}
                        <option value={""}>Select Teacher</option>

                        {allTeachersData.map((tDat)=>{
                            // Adds an option with a particular teacher name
                            return <option key={tDat.id} value={tDat.id}>
                            {tDat.name}
                            </option>

                        })}
                        </select>
                        <br />
                        <span className="suggestion-span">(Choose a teacher from the above selection list, it will fetch the id of that particular teacher. <b>For NOT assigning any teacher, please select the first option "Select Teacher" in the selection list.</b>)</span>
                    </>)
                }
                
            </FormGroup>
            
        </Form>
        <br />
        {toView? ""
        :
            (<>
                {/* If it is to create or edit-student showing "cancel" and "submit" buttons */}
                <Button className="main-buttons" color="warning" onClick={()=>navigate('/students')}> Cancel </Button>
                <Button className="main-buttons" color="success" onClick={()=>handleSubmitStudentForm(id)}> 
                {id? "Update" : "Submit"}</Button>
            </>)
        }
       
    </Container>
}
export default ActionStudent;



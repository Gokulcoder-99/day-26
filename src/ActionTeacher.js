import {useContext, useEffect} from "react";
import {Container, Button, Form, FormGroup, Label, Input} from "reactstrap";
import {useNavigate, useParams} from "react-router-dom";
import DataContext from "./DataContext.js";


// Component to handle view-teacher (read), create-teacher, edit-teacher (update)
function ActionTeacher(){
    const navigate = useNavigate();

    // Getting params
    const {id, toView} = useParams();

    // Utilising the created context (DataContext)
    const context = useContext(DataContext);

    // Taking the required variables, states, and functions from the context (DataContext)
    const handleChangeTeacherFormData = context.handleChangeTeacherFormData;
    const handleSubmitTeacherFormData = context.handleSubmitTeacherFormData;
    const teacherFormData = context.teacherFormData;
    const fillDataForTeacherForm = context.fillDataForTeacherForm;

    let allFieldsDisabled = false;

    // Flag to disable all the fields of teacher-form if it is to view (read) the teacher data
    if(toView){
        allFieldsDisabled = true;        
    }

    // Populating the fields of teacher-form
    useEffect(()=>{
        if(id){
            // When it is to edit-teacher
            fillDataForTeacherForm(id);
        }else{
            // When it is to create-teacher
            fillDataForTeacherForm(null);
        }
        // eslint-disable-next-line
    },[])


    return <Container className="main-container">
        
        <p className="netlify-suggestion-p">Kindly <b>DO NOT REFRESH</b> this netlify site when you are in the page other than home (dashboard) page. If you refresh on page other than home page, then it will give "page not found" (problem with netlify deployment). </p>
            
        <br />
        <h5>{id && toView? "View-teacher page" : id? "Edit-teacher page" : "Create-teacher page"}</h5>
        
        {/* Showing button when it is view-teacher */}
        {id && toView? <Button color="warning" onClick={()=>navigate("/teachers")}>To teachers page</Button> : ""}
        <br />
        <br />

        <Form>
            <FormGroup className="actionStudent-formgroup">
      
                {/* Input field for "category" (it will be "teacher" by default) */}
                <Label for="category">Category</Label>
                <Input name="category" placeholder="Category" value={teacherFormData.category} disabled={true} />

                {/* Input field for "teacher-name" */}
                <Label for="name">Name</Label>
                <Input name="name" placeholder="Name" value={teacherFormData.name} onChange={handleChangeTeacherFormData} disabled={allFieldsDisabled} />

                {/* Input field for "email" */}
                <Label for="email">Email</Label>
                <Input name="email" placeholder="Email" value={teacherFormData.email} onChange={handleChangeTeacherFormData} disabled={allFieldsDisabled} />

                {/* Input field for the "expertise-fields" of the teacher */}
                <Label for="fields">Fields</Label>
                <Input name="fields" placeholder="Fields" value={teacherFormData.fields} onChange={handleChangeTeacherFormData} disabled={allFieldsDisabled} />

                {toView? "" 
                :

                    // If it is create or edit-teacher then showing the "cancel" and "submit" buttons
                    <>
                        <Button className="main-buttons" color="warning" onClick={()=>navigate('/teachers')}>Cancel</Button>
                        <Button className="main-buttons" color="success" onClick={()=>handleSubmitTeacherFormData(id)} >{id? "Update" : "Submit"}</Button>
                    </>
                }

            </FormGroup>
        </Form>

    </Container>
}
export default ActionTeacher;

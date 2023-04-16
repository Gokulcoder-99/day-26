import {useContext} from "react";
import { useNavigate } from "react-router-dom";
import {Container, Table, Button} from "reactstrap";
import DataContext from "./DataContext.js";


// Component to handle the students-list page
function Students(){

    const navigate = useNavigate();

    // Utilising the created context (DataContext)
    const context = useContext(DataContext);

    // Taking the "handleDeleteStudent" function that is defined in "DataProvider.js" file and provided to the DataContext
    const handleDeleteStudent = context.handleDeleteStudent;

    return (
       
        <Container className="main-container">
            
            <p className="netlify-suggestion-p">Kindly <b>DO NOT REFRESH</b> this netlify site when you are in the page other than home (dashboard) page. If you refresh on page other than home page, then it will give "page not found" (problem with netlify deployment). </p>
            
            <br />
            <h5>Students-list page</h5>
            <br />
            {/* Buttons for navigation */}
            <Button className="main-buttons" color="warning" onClick={()=>navigate('/')}>To dashboard</Button>
            <Button className="main-buttons" color="info" onClick={()=>navigate('/teachers')}>To teachers page</Button>

            {/* Button to create-student */}
            <Button className="main-buttons" color="primary" onClick={()=>navigate('/create-student')}>Create student</Button>
            <br />     
            <br />       
                {/* Table showing the students-list */}
                <Table striped>
                    <thead>
                        <tr >
                            <th>Sl.No.</th>
                            <th>Name</th>
                            <th>Course</th>
                            <th>Batch</th>
                            <th>Teacher</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {context.allStudentsData.map((studDat,index)=>{
                        let teacherIs=context.allTeachersData.filter(teachDat=>teachDat.id===studDat.teacher)[0];
                        return <tr key={studDat.id.toString()}>
                            <td>{index+1}</td>
                            <td>{studDat.name}</td>
                            <td>{studDat.course}</td>
                            <td>{studDat.batch}</td>
                            <td>
                                {/* If teacher is not assigned for a particular student, then leaving the "teacher" field empty for that student */}
                                {teacherIs? teacherIs.name : ""}
                            </td>
                            <td>
                                {/* Buttons to read (view), edit (update), delete a student */}
                                <Button className="action-buttons" color="info" style={{fontSize:"small"}}
                                onClick={()=>navigate("/view-student/"+studDat.id+"/"+true)} >View</Button>

                                <Button className="action-buttons" color="warning" style={{fontSize:"small"}}
                                onClick={()=>navigate("/edit-student/" + studDat.id)}>Edit</Button>

                                <Button className="action-buttons" color="danger" style={{fontSize:"small"}}
                                onClick={()=>handleDeleteStudent(studDat.id)}>Delete</Button>
                            </td>
                        </tr>
                    })}
                    </tbody>
                </Table>             
        </Container>
        
           
    )
}
export default Students;

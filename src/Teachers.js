import { useContext } from "react";
import {useNavigate} from "react-router-dom";
import DataContext from "./DataContext.js";
import {Table, Container, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";


// Component to handle the teachers-list page
function Teachers(){
    const context = useContext(DataContext);
    const navigate = useNavigate();

    // Function that handles deleteing a teacher (it is defined in "DataProvider.js" file)
    const handleDeleteTeacher = context.handleDeleteTeacher;

    return <Container className="main-container">
        
    <p className="netlify-suggestion-p">Kindly <b>DO NOT REFRESH</b> this netlify site when you are in the page other than home (dashboard) page. If you refresh on page other than home page, then it will give "page not found" (problem with netlify deployment). </p>
    
    <br />
    <h5>Teachers-list page</h5>
    <br />

    {/* Buttons to navigate */}
    <Button className="main-buttons" color="warning" onClick={()=>navigate('/')}>To dashboard</Button>
    <Button className="main-buttons" color="info" onClick={()=>navigate('/students')}>To students page</Button>

    {/* Button to create a teacher */}
    <Button className="main-buttons" color="primary" onClick={()=>navigate('/create-teacher')}>Create teacher</Button>
    <br />

    {/* Table showing the teachers-list */}
    <Table striped>
        <thead>
            <tr>
            <th>Sl.No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Expertise Fields</th>
            <th>Students</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {context.allTeachersData.map((value, index)=>{
                return <tr key={value.id}>
                    <td>{index+1}</td>
                    <td>{value.name}</td>
                    <td>{value.email}</td>
                    <td>{value.fields}</td>

                    {/* Showing the students assigned for this particular teacher as a dropdown list */}
                    <td><UncontrolledDropdown >
                            <DropdownToggle caret color="primary">
                                Students
                            </DropdownToggle>
                            <DropdownMenu>    
                                {
                                context.allStudentsData.filter((stud)=>stud.teacher===value.id).map((sDat, sIndex)=>{
                                    return <DropdownItem key={sIndex.toString()}>
                                             {sDat.name}
                                           </DropdownItem>
                                        })
                                 }
                                
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </td>

                    <td>

                        {/* Buttons to read (view), edit (update), delete a teacher */}
                        <Button className="action-buttons" color="info" style={{fontSize:"small"}}
                        onClick={()=>navigate('/view-teacher/'+value.id+"/"+true)}>View</Button>

                        <Button className="action-buttons" color="warning" style={{fontSize:"small"}}
                        onClick={()=>navigate("/edit-teacher/"+value.id)} >Edit</Button>

                        <Button className="action-buttons" color="danger" style={{fontSize:"small"}}
                        onClick={()=>handleDeleteTeacher(value.id)}>Delete</Button>
                    </td>
                </tr>

            })}
        </tbody>

    </Table>

    <br />
    <br />
    <p className="teachers-note-p"><b className="note-b"><i>NOTE:</i></b>When it is required to assign some students for a particular teacher, go to "Students List" and edit the data of those students (select that particular teacher for those students) </p>
    </Container>
}
export default Teachers;

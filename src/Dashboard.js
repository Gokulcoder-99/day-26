import { useNavigate } from "react-router-dom";
import {Button, Container} from "reactstrap";


// Component to handle admin-dashboard
function Dashboard(){
    const navigate = useNavigate();
    return <Container className="main-container">
        <br />
        
        <p className="netlify-suggestion-p">Kindly <b>DO NOT REFRESH</b> this netlify site when you are in the page other than home (dashboard) page. If you refresh on page other than home page, then it will give "page not found" (problem with netlify deployment). </p>
        
        <br />
        <h5 className="dashboard-heading-div">Admin-dashboard page</h5>
        <br />
        <br />

        {/* Button to navigate to students-list page */}
        <Button className="main-buttons" color="primary" onClick={()=>navigate('/students') }> Students List </Button>

        {/* Button to navigate to teachers-list page */}
        <Button className="main-buttons" color="success" onClick={()=>navigate('/teachers') }> Teachers List </Button>
        <br />
        <br />
        <br />
       
        <p><b className="note-b"><i>NOTE:</i></b>As one-to-many assignment is not possible for students-to-teachers, assigning a teacher should be done for each student individually. The students who selected a particular teacher will be reflected in the students list of that teacher.</p>
        <p><b>So, when it is required to assign some students for a particular teacher, go to "Students List" and edit the data of those students (select that particular teacher for those students)</b> </p>

    </Container>
}
export default Dashboard;




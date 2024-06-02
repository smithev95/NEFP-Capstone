import {Link} from 'react-router-dom'

function AdminButton() {
    return(
        <Link to="http://localhost:8000/adminpanel">
            <button>Admin Page</button>
        </Link>
    );
}

function TableButton() {
    return(
        <Link to="/table">
            <button>Open Client Table</button>
        </Link>
    );
}

function QuestionnaireButton() {
    return (
        <Link to="/form">
            <button>Open Questionnaire</button>
        </Link>
    );
}

const LandingPage = () => {
    return (
        <div>
            <h1>APPLICATION NAME: TBD</h1>
            <AdminButton />
            <TableButton />
            <QuestionnaireButton />
        </div>
    );
}

export default LandingPage;
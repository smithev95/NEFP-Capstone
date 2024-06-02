import {Link} from 'react-router-dom'

function AdminButton() {
    return(
        // TODO: switch /table to admin page when created
        <Link to="/table">
            <button>Admin Page</button>
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
            <QuestionnaireButton />
        </div>
    );
}

export default LandingPage;
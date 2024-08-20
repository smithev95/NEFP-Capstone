import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const TranslateButton = ({loading, func}) => {
    if (loading) {
        return (
            <Button variant="primary" disabled>
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                &nbsp;&nbsp;Loading...
            </Button>
        );
    }
    else {
        return <Button type="button" onClick={func}>Get Translation</Button> 
    }
  };
  
  export default TranslateButton;
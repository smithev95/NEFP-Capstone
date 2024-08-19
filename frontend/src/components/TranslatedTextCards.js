import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

const TranslatedTextCards = ({langs, questions, answers, others}) => {
    if (langs.length !== 0) {
        return (
            langs.map((obj) => (
                <Card border="primary" key={`${obj.abbreviation}`}>
                        <Card.Title className="text-center">{`${obj.name}`}</Card.Title>
                        <Card.Body>
                            <Form.Label htmlFor={`${obj.abbreviation}-question`}>{`${obj.name} Question:`}</Form.Label>
                            <Form.Control 
                                type="text" 
                                id={`${obj.abbreviation}-question`}
                                name={`${obj.abbreviation}-question`}
                                defaultValue={questions[obj.abbreviation] ? `${questions[obj.abbreviation]}` : ""}
                            />
                            <Form.Label htmlFor={`${obj.abbreviation}-other`}>{`${obj.name} "Other":`}</Form.Label>
                            <Form.Control 
                                type="text" 
                                id={`${obj.abbreviation}-other`}
                                name={`${obj.abbreviation}-other`}
                                defaultValue={others[obj.abbreviation] ? `${others[obj.abbreviation]}` : ""}
                            />
                            <Form.Label htmlFor={`${obj.abbreviation}-answers`}>{`${obj.name} Answers:`}</Form.Label>
                            <Form.Control 
                                type="text" 
                                id={`${obj.abbreviation}-answers`}
                                name={`${obj.abbreviation}-answers`}
                                defaultValue={answers[obj.abbreviation] ? `${answers[obj.abbreviation]}` : ""}
                            />
                        </Card.Body>
                    </Card>
            ))
        );
    }
  };
  
  export default TranslatedTextCards;
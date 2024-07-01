import TextInput from './components/TextInput';
import Container from 'react-bootstrap/Container';
import NavbarMenu from './components/Navbar';


const AddQuestionPage = () => {
    return (
        <>
        <NavbarMenu />
        <Container>
            <TextInput label_text="Question" placeholder_text="question text goes here" />
            <TextInput label_text="Answer 1" placeholder_text="Answer 1 text goes here" />
            <TextInput label_text="Answer 2" placeholder_text="Answer 2 text goes here" />
            <TextInput label_text="Answer 3" placeholder_text="Answer 3 text goes here" />
            <TextInput label_text="Answer 4" placeholder_text="Answer 4 text goes here" />
        </Container>
        </>            
    );
}

export default AddQuestionPage;
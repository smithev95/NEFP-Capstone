import axios from 'axios';

const addQuestion = (newQuestion) => {
  axios.post('http://127.0.0.1:8000/addquestion/', newQuestion, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    console.log('Question added successfully:', response.data);
  })
  .catch(error => {
    console.error('Error adding question:', error);
  });
};



export default addQuestion;
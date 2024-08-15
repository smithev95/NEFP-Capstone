import { Fragment, useEffect, useState, useContext } from "react";
import { LanguageContext } from "./Contexts/Contexts";
import axios from "axios";
import LogoNavbar from "./components/LogoNavbar";
import "bootstrap-icons/font/bootstrap-icons.css";
import Loading from "./components/Loading";

const ClientDataForm = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    // Fetch the JSON data

    axios
      .get("http://127.0.0.1:8000/translated_questions/")
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const log_information = (e) => {
    e.preventDefault();

    const form_data = new FormData(e.target);
    const form_data_object = {};

    form_data.forEach((value, key) => {
      form_data_object[key] = value;
    });

    // Loop through to check for has_other option
    questions.forEach((question) => {
      if (question.has_other) {
        // If radio value is "Other", use the value from the text field
        if (form_data_object[question.question] === "Other") {
          form_data_object[question.question] =
            form_data_object[`${question.question}-other`];
        }

        // Remove other field from dict
        delete form_data_object[`${question.question}-other`];
      }
    });

    const combined = {
      ...form_data_object,
      language,
    };

    const json_data = JSON.stringify(form_data_object);

    console.log(json_data);

    axios
      .post("http://127.0.0.1:8000/newsubmission/", json_data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "/selectlanguage";
          console.log("status", response.status);
        } else {
          console.log("unsuccessful");
        }
      })
      .catch((error) => {
        console.error("Error sending data", error);
      });
  };

  const renderQuestion = (question, index) => (
    <div className="row mb-2 border-bottom" key={index}>
      <div className="col mb-2">
        <p className="fs-5 fw-normal">{question.question}:</p>
        <div className="form-check">
          {question.answer_choices.map((answer, idx) => (
            <Fragment key={idx}>
              <input
                className="form-check-input"
                type="radio"
                id={`${question.question}-${answer}`}
                name={question.question}
                value={answer}
                required
              />
              <label
                className="form-check-label"
                htmlFor={`${question.question}-${answer}`}
              >
                {answer}
              </label>
              <br />
            </Fragment>
          ))}
          {question.has_other && (
            <div className="form-outline w-25 mb-2">
              <input
                className="form-check-input"
                type="radio"
                id={`${question.question}-other`}
                name={question.question}
                value="Other"
              />
              <input
                className="form-control"
                type="text"
                id={`${question.question}-other-text`}
                name={`${question.question}-other`}
                placeholder="Other"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <LogoNavbar />
      <div className="container">
        <div className="row mb-2 border-bottom">
          <h1>Client Form</h1>
        </div>
        <form method="post" onSubmit={log_information}>
          {questions
            .filter((question) => question.language_fk_id === Number(language))
            .map((question, index) => renderQuestion(question, index))}
          <div className="row my-2">
            <div className="col mb-2" align="center">
              <button
                type="submit"
                className={"btn btn-primary"}
                style={{ minWidth: "150px" }}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ClientDataForm;

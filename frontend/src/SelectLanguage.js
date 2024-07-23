import { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "./Contexts/Contexts";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

const SelectLanguage = () => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setLanguage } = useContext(LanguageContext);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/languages/")
      .then((response) => {
        setLanguages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleRadioChange = (event) => {
    setLanguage(event.target.value);
  };

  if (loading) {
    return (
      <>
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only"></span>
          </div>
          <div className="spinner-grow text-secondary" role="status">
            <span className="sr-only"></span>
          </div>
          <div className="spinner-grow text-success" role="status">
            <span className="sr-only"></span>
          </div>
          <div className="spinner-grow text-danger" role="status">
            <span className="sr-only"></span>
          </div>
          <div className="spinner-grow text-warning" role="status">
            <span className="sr-only"></span>
          </div>
          <div className="spinner-grow text-info" role="status">
            <span className="sr-only"></span>
          </div>
          <div className="spinner-grow text-dark" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container border-top border-bottom mt-5 d-flex justify-content-center">
        <form method="post">
          {languages.map((language, index) => (
            <Fragment key={index}>
              <input
                type="radio"
                id={`language-${index}`}
                name="language"
                className="mt-3 mr-3"
                value={language.id}
                onChange={handleRadioChange}
              />
              <label htmlFor={`language-${index}`}>{language.prompt}</label>
              <br />
            </Fragment>
          ))}
          <div className="d-flex justify-content-center mt-4 mb-4">
            <Link to="/questionaire">
              <button
                type="button"
                className="btn btn-primary"
                style={{
                  minWidth: "150px",
                }}
              >
                <i className="bi bi-arrow-right"></i>
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default SelectLanguage;

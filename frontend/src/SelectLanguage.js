import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SelectLanguage = () => {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/languages/")
      .then((response) => {
        setLanguages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  return (
    <>
      <div className="container">
        <form>
          {languages.map((language, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`language-${index}`}
                name="language"
                value={language.prompt}
              />
              <label htmlFor={`language-${index}`}>{language.prompt}</label>
            </div>
          ))}
        </form>
        <Link to="/form/questionaire">
          <button type="button" className="btn btn-primary">
            Open Questionnaire
          </button>
        </Link>
      </div>
    </>
  );
};

export default SelectLanguage;

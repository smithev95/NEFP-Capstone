import { useState, useEffect } from "react";
import axios from "axios";

const UpdateLanguages = () => {
  const [languages, setLanguages] = useState([]);
  const [updating, setUpdating] = useState(false);

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

  const updateLangage = () => {
    setUpdating(!updating);
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <button className="btn btn-primary" onClick={updateLangage}>
          Add language
        </button>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <span className="border-top border-bottom border-primary">OR</span>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <select className="form-select" style={{ width: "50vw" }}>
          <option defaultValue>Select a language</option>
          {languages.map((language) => (
            <option key={language.id} value={language.name}>
              {language.name}
            </option>
          ))}
        </select>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <button className="btn btn-primary mr-3">Update language</button>
        <button className="btn btn-danger">Delete language</button>
      </div>
      {updating ? (
        <div
          className="d-flex justify-content-center input-group mt-5 border shadow container"
          style={{ maxWidth: "40vw", borderRadius: "15px" }}
        >
          <form>
            <label htmlFor="name" className="mt-3">
              Name of the language:{" "}
            </label>
            <input
              id="name"
              type="text"
              className="input-group-text start mb-3"
              placeholder="English"
              style={{ textAlign: "left" }}
            ></input>
            <label htmlFor="name" className="mt-3">
              Language abbreviation:{" "}
            </label>
            <input
              id="name"
              type="text"
              className="input-group-text start mb-3"
              placeholder="En"
              style={{ textAlign: "left" }}
            ></input>
            <label htmlFor="name" className="mt-3">
              Language prompt:{" "}
            </label>
            <input
              id="name"
              type="text"
              className="input-group-text start mb-3"
              placeholder="This is my language"
              style={{ textAlign: "left" }}
            ></input>
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary mb-3">Submit</button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default UpdateLanguages;

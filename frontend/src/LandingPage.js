import { Link } from "react-router-dom";
import React from "react";
import CompanyLogo from "./companyLogo.png";

const LandingPage = () => {
  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="mt-5"
      >
        <img
          src={CompanyLogo}
          style={{ height: "30vh", marginBottom: "5vh" }}
        ></img>
      </div>
      {/* <hr className="mt-5 mb-5" style={{ width: "40%", margin: "0 auto" }} /> */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p style={{ color: "rgba(1,86,138,216)" }}>Place holder text</p>
      </div>
      <hr className="mt-5 mb-5" style={{ width: "40%", margin: "0 auto" }} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          //height: "50vh",
        }}
      >
        <Link to="http://localhost:8000/adminpanel">
          <button
            type="button"
            className="btn"
            style={{
              marginRight: "10px",
              backgroundColor: "rgba(1,86,138,216)",
              outlineColor: "rgba(1,86,138,216)",
              color: "white",
            }}
          >
            Admin Page
          </button>
        </Link>
        <Link to="/table">
          <button
            type="button"
            className="btn"
            style={{
              marginRight: "10px",
              backgroundColor: "rgba(6,154,190,255)",
              outlineColor: "rgba(6,154,190,255)",
              color: "white",
            }}
          >
            Open Client Table
          </button>
        </Link>
        <Link to="/selectlanguage">
          <button
            type="button"
            className={"btn"}
            style={{
              marginRight: "10px",
              backgroundColor: "rgba(114,170,79,255)",
              outlineColor: "rgba(114,170,79,255)",
              color: "white",
            }}
          >
            Open Questionnaire
          </button>
        </Link>
      </div>
    </>
  );
};

export default LandingPage;

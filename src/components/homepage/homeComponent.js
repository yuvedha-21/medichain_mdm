import React from "react";
import "./homepage.css";
export default function HomeComponent() {
  return (
    <>
      <div className="container-fluid homeBackground">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <h3 className="homecomH1">
                MEDICAL RECORDS MANAGEMENT SOLUTIONS <br></br> FOR BETTER
                PATIENT EXPERIENCE
              </h3>
              <button className="p-4 mt-5">Track Your Medical History </button>
            </div>
            <div className="col-lg-5">&nbsp;</div>
          </div>
        </div>
      </div>
    </>
  );
}

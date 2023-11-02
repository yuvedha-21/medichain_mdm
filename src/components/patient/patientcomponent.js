import React from 'react'
import "./patient.css";
import patient from "../assets/patient/Group-1015.webp";

export default function Patientcomponent() {
  return (
    <>
     <div className="container-fluid patientBackground">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <h3 className="patientcomponentH3">
              Health is not valued until sickness comes. Take charge of your health by tracking your medical history.
              </h3>
              <button className="p-4 mt-5">Track Your Medical History </button>
            </div>
            <div className="col-lg-7">
            <img src={patient} className="patientLandingPage" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

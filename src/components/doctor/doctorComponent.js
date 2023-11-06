import React from "react";
import "./doctor.css";
import corporate from "../assets/doctor/corporate.png";
import Connectivity from "../connectivity/connectivity";

export default function DoctorComponent() {
  return (
    <>
      <div className="container-fluid doctorBg">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <img src={corporate} className="doctorLandingPage" />
            </div>
            <div className="col-lg-5">
              <h1 className="doctorLandingPageh1 ">
                MediChain <br /> Management To <br /> Track Patient History
              </h1>
              <Connectivity />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

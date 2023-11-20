import React, { useEffect, useState } from "react";
import heart from "../assets/patient/patientHeart.png";
import lungs from "../assets/patient/lungs.png";
import temperature from "../assets/patient/temperature.png";
import glucose from "../assets/patient/glucose.png";

export default function PatientDAshboard(props) {
  const patientPersonal = props.patientDetails.personal;
  const patientMedical = props.patientDetails.medical;
  const patientHealth = props.patientDetails.health;

  console.log(patientPersonal);
  console.log(patientMedical);
  console.log(patientHealth);

  return (
    <>
      <div className="container-fluid patientDashBg">
        <div className="container pb-5">
          <div className="row ">
            <div className="col-lg-4 text-center mt-5">
              <div className="card">
                <div className="card-body">
                  <h1>{patientPersonal.name}</h1>
                  <p>{patientPersonal.walletAddress}</p>
                  <p>Age</p>
                </div>
              </div>
              <div className="card mt-3">
                <div className="card-body">
                  <h1>Information</h1>
                  <p>Gender</p>
                  <p>Blood Group</p>
                  <p>Dieseases</p>
                  <p>Allergies</p>
                  <p>Height</p>
                  <p>Weight</p>
                </div>
              </div>
            </div>
            <div className="col-lg-8 mt-5">
              <div className="row">
                <div className="card-group">
                  <div className="col-lg-3">
                    <div className="card text-center">
                      <div className="card-body">
                        <img src={heart} alt="patient heart" className="w-25" />
                        <p className="fw-bold mt-3">Heart Rate</p>
                        <p>
                          84 <small className="fw-bold">bmp</small>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 ps-2">
                    <div className="card text-center">
                      <div className="card-body">
                        <img src={lungs} alt="patient heart" className="w-25" />
                        <p className="fw-bold mt-3 ">Oxygen Saturation</p>
                        <p>
                          99 <small className="fw-bold">%</small>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 ps-2">
                    <div className="card text-center">
                      <div className="card-body">
                        <img
                          src={temperature}
                          alt="patient heart"
                          className="w-25"
                        />
                        <p className="fw-bold mt-3">Body Temperature</p>
                        <p>
                          96.5 <small className="fw-bold">F</small>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 ps-2">
                    <div className="card text-center">
                      <div className="card-body">
                        <img
                          src={glucose}
                          alt="patient heart"
                          className="w-25"
                        />
                        <p className="fw-bold mt-3">Glucose Level</p>
                        <p>
                          100 <small className="fw-bold">mg/dl</small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                {patientHealth.length === 0 ? (
                  <div>Loading...</div>
                ) : (
                  patientHealth.map((data) => (
                    <div className="col-lg-4">
                      <div className="card">
                        <a href={data.cid} target="_blank">
                          Url
                        </a>

                        <h1>
                          {new Date(
                            parseInt(data.timestamp._hex) * 1000
                          ).toLocaleDateString("en-US")}
                        </h1>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

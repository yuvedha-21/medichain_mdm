import React, { useEffect, useState } from "react";
import heart from "../assets/patient/patientHeart.png";
import lungs from "../assets/patient/lungs.png";
import temperature from "../assets/patient/temperature.png";
import glucose from "../assets/patient/glucose.png";

export default function PatientDAshboard(props) {
  const patientPersonal = props.patientDetails.personal;
  const patientMedical = props.patientDetails.medical;
  const patientHealth = props.patientDetails.health;
  const patientReport = props.patientDetails.report;

  // console.log(patientPersonal);
  // console.log(patientMedical);
  console.log(patientReport);
  // console.log(patientHealth);

  let recentCheckUpData = patientHealth.length - 1;
  let recentReport = patientHealth[recentCheckUpData];
  console.log(recentReport.BloodPressure);

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
                  <p>Age : {parseInt(patientPersonal.age)} Years</p>
                </div>
              </div>
              <div className="card mt-3">
                <div className="card-body text-start">
                  <h1 className="text-center fw-bold">Information</h1>
                  <p>Gender : {patientPersonal.gender}</p>
                  <p>Height : {parseInt(patientPersonal.height)} cm</p>
                  <p>Weight : {parseInt(patientPersonal.weight)} kg</p>
                  <p>Blood Group : {patientPersonal.bloodGroup} </p>
                  <p>Activity Level : {patientMedical.physicalActivityLevel}</p>
                  <p>
                    Surgical History: {patientMedical.surgicalHistory_ifAny}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-8 ">
              <div className="row">
                <div className="card-group">
                  <div className="col-lg-3 mt-5 ps-2">
                    <div className="card text-center">
                      <div className="card-body">
                        <img src={heart} alt="patient heart" className="w-25" />
                        <p className="fw-bold mt-3">Heart Rate</p>
                        <p>{recentReport.HeartRate} </p>
                        <small className="fw-bold">bmp</small>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 mt-5 ps-2">
                    <div className="card text-center">
                      <div className="card-body">
                        <img src={lungs} alt="patient heart" className="w-25" />
                        <p className="fw-bold mt-3 ">Blood Pressure</p>
                        <p>{recentReport.BloodPressure} </p>
                        <small className="fw-bold">%</small>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 mt-5 ps-2">
                    <div className="card text-center">
                      <div className="card-body">
                        <img
                          src={temperature}
                          alt="patient heart"
                          className="w-25"
                        />
                        <p className="fw-bold mt-3">Body Temperature</p>
                        <p>{recentReport.bodyTemperature} </p>
                        <small className="fw-bold">F</small>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 mt-5 ps-2">
                    <div className="card text-center">
                      <div className="card-body">
                        <img
                          src={glucose}
                          alt="patient heart"
                          className="w-25"
                        />
                        <p className="fw-bold mt-3">Glucose Level</p>
                        <p>{recentReport.GlucoseLevel} </p>
                        <small className="fw-bold">mg/dl</small>
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
                      <div className="card-group d-flex h-100">
                        <div className="card ps-3 flex-fill">
                          <h5 className="text-center pt-2">Health Details</h5>
                          <p>Blood Pressure: {data.BloodPressure}</p>
                          <p>Health Issue: {data.healthIssue}</p>
                          <p>Department Unit: {data.Department_uint}</p>
                          <p>Glucose Level: {data.GlucoseLevel}</p>
                          <p>Heart Rate: {data.HeartRate}</p>
                          <p>Body Temperature: {data.bodyTemperature}</p>
                          <p>
                            Medicines Prescribed: {data.medicinesPrescribed}
                          </p>
                          {/* <p>checkupDescription: {data.checkupDescription}</p> */}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="row ">
            {patientHealth.length === 0 ? (
              <div>Loading...</div>
            ) : (
              patientReport.map((data) => (
                <div className="col-lg-4">
                  <div className="card mt-4 ps-3 pb-3">
                    <h5 className="text-center pt-2">Report</h5>

                    <p className="fw-bold">File Name : {data.fileName}</p>
                    <h5>
                      {" "}
                      Date :
                      {new Date(
                        parseInt(data.timestamp._hex) * 1000
                      ).toLocaleDateString("en-US")}
                    </h5>

                    <button className="w-50 mt-2">
                      <a href={`http://${data.cid}`} target="_blank" rel="noopener noreferrer">
                        Click To View
                      </a>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

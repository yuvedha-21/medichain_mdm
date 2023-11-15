import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as blockchain from "../../services/Blockchain";

//Adding Patient Details Is On  Validation
const PatientDetailsSchema = yup.object().shape({
  name: yup.string().required("*Please enter your name."),
  gender: yup.string().required("*gender is required."),
  dob: yup.date().required("*Please select a date of birth."),
  walletAddress: yup.string().required("*walletAddress is required."),
  occupation: yup.string().required("*occupation is required."),
  mobileNumber: yup.string().matches(/^\d{10}$/),
  age: yup.number().required().positive().integer(),
  PatientMedicalRecordWalletAddress: yup
    .string()
    .required("*walletAddress is required."),
  alcoholic: yup.string().required("*required."),
  smoker: yup.string().required("*required."),
  tobaco: yup.string().required("*required."),
  surgicalHistory: yup.string().required("*required."),
  physicalActivity: yup.string().required("*required."),
  PastMedicalRecord: yup.string().required("*required."),
});


//Adding Patient Health Condition Is On Validation
const HealthConditionSchema = yup.object().shape({
  date: yup.string().required("*Please enter your name."),
  department: yup.string().required("*Department is required."),
  physicianWalletAddress: yup.string().required("*Please select a date of birth."),
  patientWalletAddress: yup.string().required("*walletAddress is required."),
 
  bloodPressure: yup.string(),
  heartRate: yup.string(),
  respiratoryRate: yup.string(),
  dosage: yup.string(),
});

export default function DoctorPrivilages() {
  const [isValidDoctor, setIsValidDoctor] = useState("false");

  console.log(isValidDoctor);

  //Add Patient Details
  const {
    register,
    handleSubmit: handleSubmitPatientDetails,
    formState: { errors: PatientDetailsErrors },
  } = useForm({
    resolver: yupResolver(PatientDetailsSchema),
  });

    //Add Patient Health Condition
    const {
      register: registerPatientHealthCondition,
      handleSubmit: handleSubmitPatientHealthCondition,
      formState: { errors: healthConditionErrors },
    } = useForm({
      resolver: yupResolver(HealthConditionSchema),
    });

  //Function Call On Add Doctor Details
  const onSubmitOfPatientDetails = async (data) => {
    const { name, gender, age, dob, mobileNumber, occupation, walletAddress } =
      data;

    const {
      PatientMedicalRecordWalletAddress,
      alcoholic,
      smoker,
      tobaco,
      surgicalHistory,
      physicalActivity,
      PastMedicalRecord,
    } = data;

    const patientPersonalDetails = {
      name,
      gender,
      age,
      dob,
      mobileNumber,
      occupation,
      walletAddress,
    };

    const patientMedicalDetails = {
      PatientMedicalRecordWalletAddress,
      alcoholic,
      smoker,
      tobaco,
      surgicalHistory,
      physicalActivity,
      PastMedicalRecord,
    };

    console.log(patientPersonalDetails);
    console.log(patientMedicalDetails);
    const patientDetails = await blockchain.addPatientDetails(
      patientPersonalDetails,
      patientMedicalDetails
    );
  };


  //Function Call On Addinf Patient Health Condition

  const patientHealth = async (data) => {
    try {
      console.log(data);
      const patientHealthData = await blockchain.addPatientHealthData(data.patientHealth);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Add Patient Details</Accordion.Header>
          <Accordion.Body>
            <div className="container">
              <form
                onSubmit={handleSubmitPatientDetails(onSubmitOfPatientDetails)}
              >
                <div className="form-group row">
                  <div className="col-lg-6">
                    <div className="row mt-2 text-center mb-2 fw-bold">
                      <h5>Personel Details</h5>
                    </div>
                    <div className="row mt-2">
                      <div className="col-lg-6">
                        <label>Name:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="text"
                          className="form-control"
                          {...register("name")}
                        />
                        {PatientDetailsErrors.name && (
                          <p className="text-danger fw-bold">
                            {PatientDetailsErrors.name.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>Gender:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="text"
                          className="form-control"
                          {...register("gender")}
                        />
                        {PatientDetailsErrors.gender && (
                          <p className="text-danger fw-bold">
                            {PatientDetailsErrors.gender.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>Age:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="number"
                          className="form-control"
                          {...register("age")}
                        />
                        {PatientDetailsErrors.age && (
                          <p className="text-danger fw-bold">
                            {PatientDetailsErrors.age.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>DOB:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="date"
                          className="form-control"
                          {...register("dob")}
                        />
                        {PatientDetailsErrors.dob && (
                          <p className="text-danger fw-bold">
                            {PatientDetailsErrors.dob.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>Mobile Number:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="number"
                          className="form-control"
                          {...register("mobileNumber")}
                        />
                        {PatientDetailsErrors.mobileNumber && (
                          <p className="text-danger fw-bold">
                            {PatientDetailsErrors.mobileNumber.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>Occupation:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="text"
                          className="form-control"
                          {...register("occupation")}
                        />
                        {PatientDetailsErrors.occupation && (
                          <p className="text-danger fw-bold">
                            {PatientDetailsErrors.occupation.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>Wallet Address:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="text"
                          className="form-control"
                          {...register("walletAddress")}
                        />
                        {PatientDetailsErrors.walletAddress && (
                          <p className="text-danger fw-bold">
                            {PatientDetailsErrors.walletAddress.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="row mt-2 text-center mb-2 fw-bold">
                      <h5>Patient Medical Details</h5>
                    </div>

                    <div className="row mt-2">
                      <div className="col-lg-6">
                        <label>Wallet Address:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="text"
                          className="form-control"
                          {...register("PatientMedicalRecordWalletAddress")}
                        />
                        {PatientDetailsErrors.PatientMedicalRecordWalletAddress && (
                          <p className="text-danger fw-bold">
                            {
                              PatientDetailsErrors
                                .PatientMedicalRecordWalletAddress.message
                            }
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>IsAlcoholic:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="text"
                          className="form-control"
                          {...register("alcoholic")}
                        />
                        {PatientDetailsErrors.alcoholic && (
                          <p className="text-danger fw-bold">
                            {PatientDetailsErrors.alcoholic.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>IsSmoker:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="text"
                          className="form-control"
                          {...register("smoker")}
                        />
                        {PatientDetailsErrors.smoker && (
                          <p className="text-danger fw-bold">
                            {PatientDetailsErrors.smoker.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>IsTobaco User:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="text"
                          className="form-control"
                          {...register("tobaco")}
                        />
                        {PatientDetailsErrors.tobaco && (
                          <p className="text-danger fw-bold">
                            {PatientDetailsErrors.tobaco.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>Surgical History:</label>
                      </div>
                      <div className="col-lg-6 ">
                        <input
                          type="text"
                          className="form-control"
                          {...register("surgicalHistory")}
                        />
                        {PatientDetailsErrors.surgicalHistory && (
                          <p className="text-danger fw-bold">
                            {PatientDetailsErrors.surgicalHistory.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>Physical Activity Level:</label>
                      </div>
                      <div className="col-lg-6 ">
                        <input
                          type="text"
                          className="form-control"
                          {...register("physicalActivity")}
                        />
                        {PatientDetailsErrors.physicalActivity && (
                          <p className="text-danger fw-bold">
                            {PatientDetailsErrors.physicalActivity.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>Past Medical Details:</label>
                      </div>
                      <div className="col-lg-6 ">
                        <input
                          type="text"
                          className="form-control"
                          {...register("PastMedicalRecord")}
                        />
                        {PatientDetailsErrors.PastMedicalRecord && (
                          <p className="text-danger fw-bold">
                            {PatientDetailsErrors.PastMedicalRecord.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 mb-3 text-center">
                    <button type="submit w-100">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Edit Doctor Details</Accordion.Header>
          <Accordion.Body>
            <div className="container">
              <form
              onSubmit={handleSubmitPatientHealthCondition(patientHealth)}
              >
                <div className="form-group row">
                  <div className="col-lg-6">

                    <div className="row mt-2">
                      <div className="col-lg-6">
                        <label>Date:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="date"
                          className="form-control"
                          {...registerPatientHealthCondition("date")}
                        />
                        {healthConditionErrors.date && (
                          <p className="text-danger fw-bold">
                            {healthConditionErrors.date.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>Department:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="text"
                          className="form-control"
                          {...registerPatientHealthCondition("department")}
                        />
                        {healthConditionErrors.department && (
                          <p className="text-danger fw-bold">
                            {healthConditionErrors.department.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>Physician Address:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="text"
                          className="form-control"
                          {...registerPatientHealthCondition("physicianWalletAddress")}
                        />
                        {healthConditionErrors.physicianWalletAddress && (
                          <p className="text-danger fw-bold">
                            {healthConditionErrors.physicianWalletAddress.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>Wallet Address:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="text"
                          className="form-control"
                          {...registerPatientHealthCondition("patientWalletAddress")}
                        />
                        {healthConditionErrors.patientWalletAddress && (
                          <p className="text-danger fw-bold">
                            {healthConditionErrors.patientWalletAddress.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    
                    <div className="row mt-2">
                      <div className="col-lg-6">
                        <label>Blood Pressure:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="text"
                          className="form-control"
                          {...registerPatientHealthCondition("bloodPressure")}
                        />
                        {healthConditionErrors.bloodPressure && (
                          <p className="text-danger fw-bold">
                            {
                              healthConditionErrors.bloodPressure
                                .message
                            }
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>Heart Rate:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="text"
                          className="form-control"
                          {...registerPatientHealthCondition("heartRate")}
                        />
                        {healthConditionErrors.heartRate && (
                          <p className="text-danger fw-bold">
                            {healthConditionErrors.heartRate.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>Respiratory Rate:</label>
                      </div>
                      <div className="col-lg-6 ">
                        <input
                          type="text"
                          className="form-control"
                          {...registerPatientHealthCondition("respiratoryRate")}
                        />
                        {healthConditionErrors.respiratoryRate && (
                          <p className="text-danger fw-bold">
                            {healthConditionErrors.respiratoryRate.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>Dosage:</label>
                      </div>
                      <div className="col-lg-6 ">
                        <input
                          type="text"
                          className="form-control"
                          {...registerPatientHealthCondition("dosage")}
                        />
                        {healthConditionErrors.dosage && (
                          <p className="text-danger fw-bold">
                            {healthConditionErrors.dosage.message}
                          </p>
                        )}
                      </div>
                    </div>


                  </div>
                  <div className="mt-3 mb-3 text-center">
                    <button type="submit w-100">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        {/* <Accordion.Item eventKey="2">
          <Accordion.Header>Remove Doctor Access</Accordion.Header>
          <Accordion.Body>hai</Accordion.Body>
        </Accordion.Item> */}
      </Accordion>
    </>
  );
}

import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as blockchain from "../../services/Blockchain";
import Connectivity from "../connectivity/connectivity";

//Adding New Doctor Address Validation
const PatientSchema = yup.object().shape({
  name: yup.string().required("*Please enter your name."),
  gender: yup.string().required("*gender is required."),
  age: yup.number().required().positive().integer(),
  dob: yup.date().required("*Please select a date of birth."),
  mobileNumber: yup
    .string()
    .matches(/^\d{10}$/)
    .required("*Mobile number is required."),
  occupation: yup.string().required("*occupation is required."),
  walletAddress: yup.string().required("*walletAddress is required."),

  PatientMedicalRecordWalletAddress: yup
    .string()
    .required("*walletAddress is required."),
  surgicalHistory: yup.string().required("*required."),
  physicalActivity: yup.string().required("*required."),
  PastMedicalRecord: yup.string().required("*required."),
  alcoholic: yup.boolean().required("*required."),
  smoker: yup.boolean().required("*required."),
  tobaco: yup.boolean().required("*required."),
});

export default function Check() {
  //Add Doctor Details
  const {
    register,
    handleSubmit: handleSubmitPatientDetails,
    formState: { errors: PatientDetailsErrors },
  } = useForm({
    resolver: yupResolver(PatientSchema),
  });

  //Function Call On Add Doctor Details
  const onSubmitOfPatientDetails = async (data) => {
    const { name, gender, age, dob, mobileNumber, occupation, walletAddress } =
      data;

    const {
      PatientMedicalRecordWalletAddress,
      surgicalHistory,
      physicalActivity,
      PastMedicalRecord,
      alcoholic,
      smoker,
      tobaco,
    } = data;

    const currentTimestamp = new Date().toLocaleString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      });

    const patientPersonalDetails = {
      name,
      gender,
      age,
      dob,
      mobileNumber,
      occupation,
      walletAddress,
      date : currentTimestamp,
    };

    

    const patientProfessionalDetails = {
      PatientMedicalRecordWalletAddress:
      PatientMedicalRecordWalletAddress || "",
      surgicalHistory: surgicalHistory || "",
      physicalActivity: physicalActivity || "",
      PastMedicalRecord: PastMedicalRecord || "",
      alcoholic: Boolean(alcoholic),
      smoker: Boolean(smoker),
      tobaco: Boolean(tobaco),
      date : currentTimestamp,
    };

    console.log(patientPersonalDetails);
    console.log(patientPersonalDetails);
    const patientDetails = await blockchain.addPatientDetails(
      patientPersonalDetails,
      patientProfessionalDetails
    );

    // const parientDetails = await blockchain.addPatientDetails(
    //   patientPersonalDetails,
    //   patientProfessionalDetails
    // );
  };

  return (
    <>
      <Connectivity />
      <Accordion>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Add Doctor Details</Accordion.Header>
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
                        <select className="form-select" {...register("gender")}>
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
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

                    <div className="row mt-4">
                      <div className="col-lg-6">
                        <label>Is Alcoholic:</label>
                      </div>
                      <div className="col-lg-6 d-flex">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            value={true}
                            {...register("alcoholic", {
                              required: "Please select an option",
                            })}
                          />
                          <label className="form-check-label">Yes</label>
                        </div>
                        <div className="form-check ms-5">
                          <input
                            className="form-check-input"
                            type="radio"
                            value={false}
                            {...register("alcoholic", {
                              required: "Please select an option",
                            })}
                          />
                          <label className="form-check-label">No</label>
                        </div>
                        {PatientDetailsErrors.alcoholic && (
                          <p className="text-danger fw-bold">
                            {PatientDetailsErrors.alcoholic.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-lg-6">
                        <label>Is Smoker:</label>
                      </div>
                      <div className="col-lg-6 d-flex">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            value={true}
                            {...register("smoker", {
                              required: "Please select an option",
                            })}
                          />
                          <label className="form-check-label">Yes</label>
                        </div>
                        <div className="form-check ms-5">
                          <input
                            className="form-check-input"
                            type="radio"
                            value={false}
                            {...register("smoker", {
                              required: "Please select an option",
                            })}
                          />
                          <label className="form-check-label">No</label>
                        </div>
                        {PatientDetailsErrors.smoker && (
                          <p className="text-danger fw-bold">
                            {PatientDetailsErrors.smoker.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-lg-6">
                        <label>Is Tobacco User:</label>
                      </div>
                      <div className="col-lg-6 d-flex">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            value={true}
                            {...register("tobaco", {
                              required: "Please select an option",
                            })}
                          />
                          <label className="form-check-label">Yes</label>
                        </div>
                        <div className="form-check ms-5">
                          <input
                            className="form-check-input"
                            type="radio"
                            value={false}
                            {...register("tobaco", {
                              required: "Please select an option",
                            })}
                          />
                          <label className="form-check-label">No</label>
                        </div>
                        {PatientDetailsErrors.tobaco && (
                          <p className="text-danger fw-bold">
                            {PatientDetailsErrors.tobaco.message}
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
      </Accordion>
    </>
  );
}

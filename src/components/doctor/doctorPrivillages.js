import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as blockchain from "../../services/Blockchain";

//Adding New Doctor Address Validation
const SignupSchema = yup.object().shape({
  name: yup.string().required("*Please enter your name."),
  email: yup
    .string()
    .email("*Please enter a valid email address.")
    .required("*Email is required."),
  dob: yup.date().required("*Please select a date of birth."),
  walletAddress: yup.string().required("*walletAddress is required."),
  mobileNumber: yup.string().matches(/^\d{10}$/),
  age: yup.number().required().positive().integer(),
  ProfessionalWalletAddress: yup
    .string()
    .required("*walletAddress is required."),
  medicalCollege: yup.string().required("*medicalCollege is required."),
  specialization: yup.string().required("*specialization is required."),
  experience: yup
    .number()
    .positive()
    .integer()
    .required("*Enter your experience."),
  MedicalLicenceNumber: yup
    .string()
    .matches(/^[A-Z0-9-]+$/, "*Invalid license number format")
    .required(),
});

export default function DoctorPrivilages() {
  const [isValidDoctor, setIsValidDoctor] = useState("false");

  console.log(isValidDoctor);

  //Add Doctor Details
  const {
    register,
    handleSubmit: handleSubmitPatientDetails,
    formState: { errors: PatientDetailsErrors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
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

    const patientDetails = await blockchain.addPatientDetails(
      patientPersonalDetails,
      patientMedicalDetails
    );
  };

  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0">
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
                          type="number"
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
                          type="number"
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

        {/* <Accordion.Item eventKey="1">
          <Accordion.Header>Edit Doctor Details</Accordion.Header>
          <Accordion.Body>
            {isValidDoctor ? (
              <div className="container">
                <form
                  onSubmit={handleSubmitDoctorAddress(doctorAddressToCheck)}
                >
                  <div className="form-group row mt-2">
                    <div className="col-lg-6 text-center">
                      <label>Enter The Doctor Wallet Address:</label>
                    </div>
                    <div className="col-lg-6">
                      <input
                        type="text"
                        className="form-control"
                        {...doctorAddress("doctorAddressToCheck")}
                      />
                      {doctorAddressErrors.doctorAddressToCheck && (
                        <p className="text-danger fw-bold">
                          {doctorAddressErrors.doctorAddressToCheck.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 mb-3 text-center">
                    <button type="submit" className="w-50">
                      check Doctor
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              "mugunth"
            )}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Remove Doctor Access</Accordion.Header>
          <Accordion.Body>hai</Accordion.Body>
        </Accordion.Item> */}
      </Accordion>
    </>
  );
}

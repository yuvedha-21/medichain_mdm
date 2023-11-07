import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as blockchain from "../../services/Blockchain";

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

export default function OwnerPrivilages() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  // const [allDetails, setAllDetails] = useState({
  //   doctorDetails: [],
  // });

  // console.log(allDetails);

  const onSubmitOfDoctorDetails = async (data) => {
    // Extract personal details
    const { name, email, dob, walletAddress, mobileNumber, age } = data;

    // Extract professional details
    const {
      ProfessionalWalletAddress,
      medicalCollege,
      specialization,
      experience,
      MedicalLicenceNumber,
    } = data;



    // Create an object for personal details
    const personalDetails = {
      name,
      email,
      dob,
      walletAddress,
      mobileNumber,
      age,
    };

    // Create an object for professional details
    const professionalDetails = {
      ProfessionalWalletAddress,
      medicalCollege,
      specialization,
      experience,
      MedicalLicenceNumber,
    };

    const doctorDetails = await blockchain.addDoctorDetails(personalDetails,professionalDetails);

  };

  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Add Owner Address</Accordion.Header>
          <Accordion.Body>hello</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Remove Owner Address</Accordion.Header>
          <Accordion.Body>hai</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Add Doctor Details</Accordion.Header>
          <Accordion.Body>
            <div className="container">
              <form onSubmit={handleSubmit(onSubmitOfDoctorDetails)}>
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
                        {errors.name && (
                          <p className="text-danger fw-bold">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>Email:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="email"
                          className="form-control"
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="text-danger fw-bold">
                            {errors.email.message}
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
                        {errors.mobileNumber && (
                          <p className="text-danger fw-bold">
                            {errors.mobileNumber.message}
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
                        {errors.age && (
                          <p className="text-danger fw-bold">
                            {errors.age.message}
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
                        {errors.dob && (
                          <p className="text-danger fw-bold">
                            {errors.dob.message}
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
                        {errors.walletAddress && (
                          <p className="text-danger fw-bold">
                            {errors.walletAddress.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="row mt-2 text-center mb-2 fw-bold">
                      <h5>Professional Details</h5>
                    </div>

                    <div className="row mt-2">
                      <div className="col-lg-6">
                        <label>Wallet Address:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="text"
                          className="form-control"
                          {...register("ProfessionalWalletAddress")}
                        />
                        {errors.ProfessionalWalletAddress && (
                          <p className="text-danger fw-bold">
                            {errors.ProfessionalWalletAddress.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>Medical School Attend:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="text"
                          className="form-control"
                          {...register("medicalCollege")}
                        />
                        {errors.medicalCollege && (
                          <p className="text-danger fw-bold">
                            {errors.medicalCollege.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>Medical Licence Number:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="number"
                          className="form-control"
                          {...register("MedicalLicenceNumber")}
                        />
                        {errors.MedicalLicenceNumber && (
                          <p className="text-danger fw-bold">
                            {errors.MedicalLicenceNumber.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>Specialization:</label>
                      </div>
                      <div className="col-lg-6 ">
                        <input
                          type="text"
                          className="form-control"
                          {...register("specialization")}
                        />
                        {errors.specialization && (
                          <p className="text-danger fw-bold">
                            {errors.specialization.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>Experience In Years:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="number"
                          className="form-control"
                          {...register("experience")}
                        />
                        {errors.experience && (
                          <p className="text-danger fw-bold">
                            {errors.experience.message}
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
        <Accordion.Item eventKey="3">
          <Accordion.Header>Edit Doctor Details</Accordion.Header>
          <Accordion.Body>hai</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>Remove Doctor Details</Accordion.Header>
          <Accordion.Body>hai</Accordion.Body>
        </Accordion.Item>
      
      </Accordion>
    </>
  );
}

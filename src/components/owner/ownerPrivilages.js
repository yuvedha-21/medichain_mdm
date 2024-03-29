import React, { useState,useEffect} from "react";
import Accordion from "react-bootstrap/Accordion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as blockchain from "../../services/Blockchain";

//Adding New owner Address Validation
const OwnerAddressSchema = yup.object().shape({
  newOwnerAddress: yup.string().required("* Wallet Address is required."),
});

//Removing New owner Address Validation
const RemoveOwnerSchema = yup.object().shape({
  ownerAddressToRemove: yup
    .string()
    .required("Owner Address to Remove is required."),
});

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

// Checking Doctor Address validation
const doctorAddressSchema = yup.object().shape({
  doctorAddressToCheck: yup
    .string()
    .required("* Doctor Address to check is required."),
});

//Removing New owner Address Validation
const RemoveDoctorSchema = yup.object().shape({
  doctorAddressToRemove: yup
    .string()
    .required("Doctor Address to Remove is required."),
});

export default function OwnerPrivilages() {
  const [isValidDoctor, setIsValidDoctor] = useState("false");
  const [doctorData, setDoctorData] = useState('');
  // console.log(doctorData[0].email);
  
  // let mugunth = doctorData[0].email;
  // console.log(mugunth);

  // console.log(isValidDoctor);

  //Add owner Address
  const {
    register: registerOwner,
    handleSubmit: handleSubmitOwnerAddress,
    formState: { errors: ownerAddressErrors },
  } = useForm({
    resolver: yupResolver(OwnerAddressSchema),
  });

  //Remove owner Address
  const {
    register: registerRemoveOwner,
    handleSubmit: handleSubmitRemoveOwnerAddress,
    formState: { errors: removeOwnerErrors },
  } = useForm({
    resolver: yupResolver(RemoveOwnerSchema),
  });

  //Add Doctor Details
  const {
    register,
    handleSubmit: handleSubmitDoctorDetails,
    formState: { errors: doctorDetailsErrors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  //validate doctor Address
  const {
    register: doctorAddress,
    handleSubmit: handleSubmitDoctorAddress,
    formState: { errors: doctorAddressErrors },
  } = useForm({
    resolver: yupResolver(doctorAddressSchema),
  });

  //Remove Doctor Address
  const {
    register: registerRemoveDoctor,
    handleSubmit: handleSubmitRemoveDoctorAddress,
    formState: { errors: removeDoctorErrors },
  } = useForm({
    resolver: yupResolver(RemoveDoctorSchema),
  });


  //Function Call On Add owner Address
  const addNewOwnerAddress = async (data) => {
    try {
      console.log(data);
      const ownerDetails = await blockchain.AddOwner(data.newOwnerAddress);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //Function Call On Remove owner Address
  const removeOwnerAddress = async (data) => {
    try {
      const removedOwner = await blockchain.removeOwner(
        data.ownerAddressToRemove
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //Function Call On Add Doctor Details
  const onSubmitOfDoctorDetails = async (data) => {
    const { name, email, dob, walletAddress, mobileNumber, age } = data;

    const {
      ProfessionalWalletAddress,
      medicalCollege,
      specialization,
      experience,
      MedicalLicenceNumber,
    } = data;

    const personalDetails = {
      name,
      email,
      dob,
      walletAddress,
      mobileNumber,
      age,
    };

    const professionalDetails = {
      ProfessionalWalletAddress,
      medicalCollege,
      specialization,
      experience,
      MedicalLicenceNumber,
    };
    console.log(personalDetails, professionalDetails);
    const doctorDetails = await blockchain.addDoctorDetails(
      personalDetails,
      professionalDetails
    );
  };

  //Function Call to validate doctor Address
  const doctorAddressToCheck = async (data) => {
    try {
      console.log("mugu");
      const validatedoctor = await blockchain.isDoctor(
        data.doctorAddressToCheck
      );
      setIsValidDoctor(validatedoctor);

      const evaluateDoctorDetails = await blockchain.getDoctorDetails(
        data.doctorAddressToCheck
      );
      
      setDoctorData(evaluateDoctorDetails);
      // console.log(evaluateDoctorDetails.walletAddress);

      console.log(validatedoctor);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
   
  }, [doctorData]);

  //Function Call On Remove Doctor Address
  const removeDoctorAddress = async (data) => {
    try {
      const removedDoctor = await blockchain.removeDoctorAccess(
        data.doctorAddressToRemove
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Accordion className="pb-5">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Add Owner Address</Accordion.Header>
          <Accordion.Body>
            <div className="container">
              <form onSubmit={handleSubmitOwnerAddress(addNewOwnerAddress)}>
                <div className="form-group row mt-2">
                  <div className="col-lg-6 text-center">
                    <label>Wallet Address Of New Owner:</label>
                  </div>
                  <div className="col-lg-6">
                    <input
                      type="text"
                      className="form-control"
                      {...registerOwner("newOwnerAddress")}
                    />
                    {ownerAddressErrors.newOwnerAddress && (
                      <p className="text-danger fw-bold">
                        {ownerAddressErrors.newOwnerAddress.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-3 mb-3 text-center">
                  <button type="submit" className="w-50">
                    Add Owner
                  </button>
                </div>
              </form>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Remove Owner Address</Accordion.Header>
          <Accordion.Body>
            <div className="container">
              <form
                onSubmit={handleSubmitRemoveOwnerAddress(removeOwnerAddress)}
              >
                <div className="form-group row mt-2">
                  <div className="col-lg-6 text-center">
                    <label>Owner Address to Remove:</label>
                  </div>
                  <div className="col-lg-6">
                    <input
                      type="text"
                      className="form-control"
                      {...registerRemoveOwner("ownerAddressToRemove")}
                    />
                    {removeOwnerErrors.ownerAddressToRemove && (
                      <p className="text-danger fw-bold">
                        {removeOwnerErrors.ownerAddressToRemove.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-3 mb-3 text-center">
                  <button type="submit" className="w-50">
                    Remove Owner
                  </button>
                </div>
              </form>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Add Doctor Details</Accordion.Header>
          <Accordion.Body>
            <div className="container">
              <form
                onSubmit={handleSubmitDoctorDetails(onSubmitOfDoctorDetails)}
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
                        {doctorDetailsErrors.name && (
                          <p className="text-danger fw-bold">
                            {doctorDetailsErrors.name.message}
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
                        {doctorDetailsErrors.email && (
                          <p className="text-danger fw-bold">
                            {doctorDetailsErrors.email.message}
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
                        {doctorDetailsErrors.mobileNumber && (
                          <p className="text-danger fw-bold">
                            {doctorDetailsErrors.mobileNumber.message}
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
                        {doctorDetailsErrors.age && (
                          <p className="text-danger fw-bold">
                            {doctorDetailsErrors.age.message}
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
                        {doctorDetailsErrors.dob && (
                          <p className="text-danger fw-bold">
                            {doctorDetailsErrors.dob.message}
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
                        {doctorDetailsErrors.walletAddress && (
                          <p className="text-danger fw-bold">
                            {doctorDetailsErrors.walletAddress.message}
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
                        {doctorDetailsErrors.ProfessionalWalletAddress && (
                          <p className="text-danger fw-bold">
                            {
                              doctorDetailsErrors.ProfessionalWalletAddress
                                .message
                            }
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
                        {doctorDetailsErrors.medicalCollege && (
                          <p className="text-danger fw-bold">
                            {doctorDetailsErrors.medicalCollege.message}
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
                        {doctorDetailsErrors.MedicalLicenceNumber && (
                          <p className="text-danger fw-bold">
                            {doctorDetailsErrors.MedicalLicenceNumber.message}
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
                        {doctorDetailsErrors.specialization && (
                          <p className="text-danger fw-bold">
                            {doctorDetailsErrors.specialization.message}
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
                        {doctorDetailsErrors.experience && (
                          <p className="text-danger fw-bold">
                            {doctorDetailsErrors.experience.message}
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
          <Accordion.Body>
            {isValidDoctor  ? (
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
              <div className="container">
                <form
                  onSubmit={handleSubmitDoctorDetails(onSubmitOfDoctorDetails)}
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
                            // value={mugunth}
                          />
                          {doctorDetailsErrors.name && (
                            <p className="text-danger fw-bold">
                              {doctorDetailsErrors.name.message}
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
                            value={doctorData?.email || ""}
                          />
                          {doctorDetailsErrors.email && (
                            <p className="text-danger fw-bold">
                              {doctorDetailsErrors.email.message}
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
                            value={doctorData?.mobileNumber || ""}
                          />
                          {doctorDetailsErrors.mobileNumber && (
                            <p className="text-danger fw-bold">
                              {doctorDetailsErrors.mobileNumber.message}
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
                            value={doctorData?.age || ""}
                          />
                          {doctorDetailsErrors.age && (
                            <p className="text-danger fw-bold">
                              {doctorDetailsErrors.age.message}
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
                            value={doctorData?.dob || ""}
                          />
                          {doctorDetailsErrors.dob && (
                            <p className="text-danger fw-bold">
                              {doctorDetailsErrors.dob.message}
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
                            value={doctorData?.walletAddress || ""}
                          />
                          {doctorDetailsErrors.walletAddress && (
                            <p className="text-danger fw-bold">
                              {doctorDetailsErrors.walletAddress.message}
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
                            value={doctorData?.ProfessionalWalletAddress || ""}
                          />
                          {doctorDetailsErrors.ProfessionalWalletAddress && (
                            <p className="text-danger fw-bold">
                              {
                                doctorDetailsErrors.ProfessionalWalletAddress
                                  .message
                              }
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
                            value={doctorData?.medicalCollege || ""}
                          />
                          {doctorDetailsErrors.medicalCollege && (
                            <p className="text-danger fw-bold">
                              {doctorDetailsErrors.medicalCollege.message}
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
                            value={doctorData?.MedicalLicenceNumber || ""}
                          />
                          {doctorDetailsErrors.MedicalLicenceNumber && (
                            <p className="text-danger fw-bold">
                              {doctorDetailsErrors.MedicalLicenceNumber.message}
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
                            value={doctorData?.specialization || ""}
                          />
                          {doctorDetailsErrors.specialization && (
                            <p className="text-danger fw-bold">
                              {doctorDetailsErrors.specialization.message}
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
                            value={doctorData?.experience || ""}
                          />
                          {doctorDetailsErrors.experience && (
                            <p className="text-danger fw-bold">
                              {doctorDetailsErrors.experience.message}
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
            )}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>Remove Doctor Access</Accordion.Header>
          <Accordion.Body>
            <div className="container">
              <form
                onSubmit={handleSubmitRemoveDoctorAddress(removeDoctorAddress)}
              >
                <div className="form-group row mt-2">
                  <div className="col-lg-6 text-center">
                    <label>Doctor Address to Remove:</label>
                  </div>
                  <div className="col-lg-6">
                    <input
                      type="text"
                      className="form-control"
                      {...registerRemoveOwner("DoctorAddressToRemove")}
                    />
                    {removeOwnerErrors.DoctorAddressToRemove && (
                      <p className="text-danger fw-bold">
                        {removeOwnerErrors.DoctorAddressToRemove.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-3 mb-3 text-center">
                  <button type="submit" className="w-50">
                    Remove Doctor
                  </button>
                </div>
              </form>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
     
    </>
  );
}

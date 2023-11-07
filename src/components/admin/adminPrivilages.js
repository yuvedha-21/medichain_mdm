import React from 'react'

export default function AdminPrivilages() {
  return (
    <>
    <Accordion>

        <Accordion.Item eventKey="0">
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

        <Accordion.Item eventKey="1">
          <Accordion.Header>Edit Doctor Details</Accordion.Header>
          <Accordion.Body>
            {isValidDoctor ? (
              <div className="container">
              <form onSubmit={handleSubmitDoctorAddress(doctorAddressToCheck)}>
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
        </Accordion.Item>
      </Accordion>
    
    </>
  )
}

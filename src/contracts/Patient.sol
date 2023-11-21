// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19 ;
pragma experimental ABIEncoderV2;
// import "./Doctor.sol";
contract PatientDetails {
    // uint public id;
    mapping(address=>bool)public owner;
    address public superOwner;
    constructor(){
        //  id=1;
        owner[msg.sender] = true;
    superOwner = msg.sender;
    }
    modifier userOrAdmin(){
      //either patients or doctors or owner or super owner can acces this particular data
      require(PatientsPersonalDetails[msg.sender].walletAddress==msg.sender || PatientsMedicalDetails[msg.sender].walletAddress==msg.sender || DoctorAccess[msg.sender]||owner[msg.sender]||msg.sender==superOwner, "You have no access to fetch the details");
      _;
    }
    modifier _onlyOwner() {
        require(owner[msg.sender] || msg.sender==superOwner, "Accesseble only for Owners and SuperOwners");
        _;
    }
  modifier _onlyDoctor(){
      bool checkAccess;
      if (DoctorAccess[msg.sender]) {
          checkAccess=true;
      }
    require(DoctorAccess[msg.sender],"Only the Doctors can call this function due to security reasons!!!");
    _;
  }
  
 modifier _superAdmin(){
    require(msg.sender==superOwner, "Accesseble only for SuperOwners");
        _;
  }
      struct PatientPersonalDetails{
        string date;
        string name;
        address walletAddress;
        string gender;
        string Occupation;
        string dateOfBirth;
        uint age;
        uint phoneNumber;
        string bloodGroup;
        uint height;
        uint weight;
        }
        struct PatientMedicalDetails{
        string date;
        address walletAddress;
        bool isAlcoholic;
        bool isSmoker;
        bool isSmokelessTobaccoUser;
        string surgicalHistory_ifAny;
        string physicalActivityLevel;
        string pastMedicationDetails_IfAny;
        }
        struct PatientHealthCondition{
        string healthIssue;
        string date;
        address walletAddress;
        address physician;
        string Department_uint;
        string BloodPressure;
        string HeartRate;
        string GlucoseLevel;
        string bodyTemperature;
        string checkupDescription;
        string medicinesPrescribed;
    }
     struct DoctorPersonalInfo{
        string name;
        address walletAddress;
        string dateOfBirth;
        uint age;
        uint phoneNumber;
        string email;
    }
    struct DoctorProfessionalDetails{
        address walletAddress;
        string MedicalSchoolAttended;
        string MedicalLicenseNumber;
        string Specialization;
        uint ExperienceInYear;
        // address[] treatedPatients;
        }
    struct HealthData{
        uint timestamp;
        string cid;
    }
    mapping (address => PatientPersonalDetails) public PatientsPersonalDetails;
    mapping(address=> PatientMedicalDetails)public PatientsMedicalDetails;
    mapping (address=>PatientHealthCondition[])public HealthCondition;
    mapping(address=>HealthData[])public patientsStoredData;
    mapping (address=>bool)public DoctorAccess;
    mapping(address=>DoctorPersonalInfo)public DoctorsPersonalInfo;
    mapping (address=>DoctorProfessionalDetails)public Doctors_ProfessionalDetails;
    uint public totalDoctors;
    uint public totalAdmin;
    uint public totalPatient;
     function getYear(uint timestamp) public pure returns (uint) {
        return timestamp / (365 * 24 * 60 * 60);
    }

    function getAge(uint _yearOfBirth)public view returns(uint){
       
         uint yearDifference=getYear(block.timestamp);
        uint age=(1970+yearDifference)-_yearOfBirth;
        require(age>0, "Enter correct birth year");
        return age;
    }
    function AddPatientsMedicalDetails(
        string memory _date,
        address _walletAddress,
        bool _isAlcoholic,
        bool _isSmoker,
        bool _isSmokelessTobaccoUser,
        string memory _surgicalHistory_ifAny,
        string memory _physicalActivityLevel,
        string memory _pastMedicationDetails_IfAny
        )
        public _onlyDoctor {
            require(PatientsMedicalDetails[_walletAddress].walletAddress!=_walletAddress,"Patient medical details already exist!!. Kindly edit the details if needed");
            require(_walletAddress!=address(0), "Kindly fill all the mandatory feilds!!");
            PatientsMedicalDetails[_walletAddress]=PatientMedicalDetails(
                _date,
            _walletAddress,
            _isAlcoholic,
            _isSmoker,
            _isSmokelessTobaccoUser,
            _surgicalHistory_ifAny,
            _physicalActivityLevel,
            _pastMedicationDetails_IfAny
            );
            if (PatientsPersonalDetails[_walletAddress].walletAddress==_walletAddress) {
                totalPatient++;
            } 
    }
     function AddPatientsPersonalDetails(
string memory date,
        string memory _name,
        address _walletAddress,
        string memory _gender,
        string memory _Occupation,
     string memory _dateOfBirth,
     uint _age,
     uint number,
     string memory _bloodGrp,
     uint _height,
     uint _weight
       )public _onlyDoctor{
            require(PatientsPersonalDetails[_walletAddress].walletAddress!=_walletAddress,"Patient's Medical details already exist!!. Kindly edit the details if needed");
        require(_walletAddress!=address(0) && bytes(_gender).length>0 && bytes(_Occupation).length>0 ,"Kindly fill all the mandatory feilds!!");
    
        // uint age=getAge(_yearOfBirth);
        uint age=_age;
       
        PatientsPersonalDetails[_walletAddress] = PatientPersonalDetails(
            date,
            // _isAlive,
        _name,
        _walletAddress,
        _gender,
        _Occupation,
        _dateOfBirth,
       
        age,
        number,
        _bloodGrp,
        _height,
        _weight
        );
        if (PatientsMedicalDetails[_walletAddress].walletAddress==_walletAddress) {
            totalPatient++;
        } 
    }
    
    function addPatientHealthDetails(
        string memory _healthIssue,
        string memory _date,
        address _walletAddress,
        address _physician,
        string memory _Department_uint,
        string memory _BloodPressure,
        string memory _HeartRate,
        string memory _glucoseLevel,
        string memory _bodyTemperature,
        string memory _checkupDescription,
        string memory _medicinesPrescribed

        ) public _onlyDoctor {

        // require(PatientsPersonalDetails[_walletAddress].isAlive, "We regret to say that,this Patient is dead and cannot add Health details anymore!!");
        require(PatientsPersonalDetails[_walletAddress].walletAddress==_walletAddress && PatientsMedicalDetails[_walletAddress].walletAddress==_walletAddress,"Incorrect Patient wallet address or The Patient detail specific to personal or past medical history of the address provided not available in the chain!! ");

        require(DoctorsPersonalInfo[_physician].walletAddress==_physician, "Incorrect Physician wallet address or The Physician detail for the address provided not available in the chain!! ");

        HealthCondition[_walletAddress].push(PatientHealthCondition(
            _healthIssue,
            _date,
        _walletAddress,
        _physician,
        _Department_uint,
        _BloodPressure,
        _HeartRate,
        _glucoseLevel,
        _bodyTemperature,
        _checkupDescription,
        _medicinesPrescribed
        ));
        // Doctors_ProfessionalDetails[_physician].treatedPatients.push(_walletAddress);
    }

      function getPatientDetails(address _walletAddress) public userOrAdmin view returns(PatientPersonalDetails memory,PatientMedicalDetails memory){
        require(_walletAddress!=address(0),"Wallet Address cannot be empty");
        require(PatientsPersonalDetails[_walletAddress].walletAddress==_walletAddress && PatientsMedicalDetails[_walletAddress].walletAddress==_walletAddress,"Incorrect Patient wallet address or The Patient detail for the address provided is not completly available in the chain!!");
        return (
            PatientsPersonalDetails[_walletAddress],PatientsMedicalDetails[_walletAddress]
        );
    }

    function StorePatientData(string memory _dataURL,address user) public {
         HealthData memory newData = HealthData({
            timestamp: block.timestamp,
            cid: _dataURL
        });

        patientsStoredData[user].push(newData);
    }

    function getPatientStored(address _address)view public returns(HealthData[] memory){
        return patientsStoredData[_address];
    }
    

    function getPatientHealthDetails(address _walletAddress)public userOrAdmin view  returns(PatientHealthCondition[] memory){
        return HealthCondition[_walletAddress];
    }
// function EditPatientMedicalDetails(
//     bool _isAlcoholic,
//         bool _isSmoker,
//         bool _isSmokelessTobaccoUser,
//         string memory _surgicalHistory_ifAny,
//         string memory _physicalActivityLevel,
//         string memory _pastMedicationDetails_IfAny
        
// )public _onlyAdmin(){
    
// }
function EditPatinetMedicalDetails(
    string memory _date,
      address _walletAddress,
        bool _isAlcoholic,
        bool _isSmoker,
        bool _isSmokelessTobaccoUser,
        string memory _surgicalHistory_ifAny,
        string memory _physicalActivityLevel,
        string memory _pastMedicationDetails_IfAny)public _onlyDoctor {
    require(_walletAddress!=address(0) ,"Kindly fill all the mandatory feilds!!");

        require(PatientsPersonalDetails[_walletAddress].walletAddress==_walletAddress,"Incorrect Patient wallet address or The Patient detail for the address provided not available in the chain!!");
        PatientsMedicalDetails[_walletAddress]=PatientMedicalDetails(
        _date,
        _walletAddress,
        _isAlcoholic,
        _isSmoker,
        _isSmokelessTobaccoUser,
        _surgicalHistory_ifAny,
        _physicalActivityLevel,
        _pastMedicationDetails_IfAny
        );
}
    function EditPatientPersonalDetails(string memory _date,
        string memory _name,
        address _walletAddress,
        string memory _gender,
        string memory _Occupation,
        string memory _dateOfBirth,
        uint _age,
        uint number,
        string memory _bloodGrp,
        uint _height,
        uint _weight)public _onlyDoctor(){
           
        require(_walletAddress!=address(0) && bytes(_gender).length>0 && bytes(_Occupation).length>0   ,"Kindly fill all the mandatory feilds!!");

        require(PatientsPersonalDetails[_walletAddress].walletAddress==_walletAddress,"Incorrect Patient wallet address or The Patient detail for the address provided not available in the chain!!");
            
      
        uint age=_age;

       
         PatientsPersonalDetails[_walletAddress] = PatientPersonalDetails(
        _date,
        
        _name,
        _walletAddress,
        _gender,
        _Occupation,
        _dateOfBirth,
        age,
        number,
        _bloodGrp,
        _height,
        _weight
        );
    }
    function addOwner(address _address)public _superAdmin(){
        owner[_address]=true;
    }
    function removeOwner(address _address)public _superAdmin(){
        owner[_address]=false;
    }
    function AddDoctorAccess(address _walletAddress)public _onlyOwner(){
        require(owner[msg.sender],"Only owner has privilege to add owner access!!");
        require(!DoctorAccess[_walletAddress], "Address already has admin access");
        require(_walletAddress!=address(0), "Invalid Address");
        // AdminAccess.push(_walletAddress);
        DoctorAccess[_walletAddress]=true;
        totalAdmin++;
    }
    
    function DeleteDoctorAccess(address _walletAddress)public _onlyOwner() {
        require(owner[msg.sender]=true,"Only owner has privilege to delete owner access!!");
        require(_walletAddress!=address(0), "Invalid Address");
        require(DoctorAccess[_walletAddress], "Provided address must be an AdminAccessAddress to remove AdminAccess!!");
        DoctorAccess[_walletAddress]=false;
    }
    
    function AddDoctorProfessionalInfo( address _walletAddress,string memory _MedicalLicenseNumber,
        string memory _Specialization,
        
        uint _ExperienceInYear,
          string memory _MedicalSchoolAttended)public  _onlyOwner{
             require(Doctors_ProfessionalDetails[_walletAddress].walletAddress!=_walletAddress, "Physician Professional details already exist!!");
        require(Doctors_ProfessionalDetails[_walletAddress].walletAddress!=_walletAddress && bytes(_MedicalSchoolAttended).length>0 &&  bytes(_MedicalLicenseNumber).length>0 && bytes(_Specialization).length>0 ,
        "Enter Correct details");
        Doctors_ProfessionalDetails[_walletAddress]=DoctorProfessionalDetails(
                _walletAddress,
                 _MedicalSchoolAttended,
                _MedicalLicenseNumber,
                _Specialization,
                _ExperienceInYear
                // new address[](0)
            );
            if (DoctorsPersonalInfo[_walletAddress].walletAddress==_walletAddress) {
                AddDoctorAccess(_walletAddress);
                totalDoctors++;
            }
         }
    function AddDoctorPersonalInfo( 
        string  memory _name,
        address _walletAddress,
      
        string memory _dateOfBirth,
        uint _age,
        uint _phoneNumber,
        string memory _email
        
        )public _onlyOwner{
require(DoctorsPersonalInfo[_walletAddress].walletAddress!=_walletAddress , "Physician personal detail already exist!!");
// uint getCurrentYear=getYear(block.timestamp / (365 * 24 * 60 * 60))+1970;
       require( _walletAddress!=address(0) &&  _phoneNumber>0 &&bytes(_email).length>0 &&bytes(_name).length>0 
        ,"Kindly fill all the mandatory feilds properly!!");
       uint age=_age;
     
            DoctorsPersonalInfo[_walletAddress]=DoctorPersonalInfo(_name,
                _walletAddress,
                _dateOfBirth,
                age,
                _phoneNumber,
                _email
               
            );
          
          if (Doctors_ProfessionalDetails[_walletAddress].walletAddress==_walletAddress) {
              AddDoctorAccess(_walletAddress);
              totalDoctors++;
          }
            
    }
    function getDoctorPersonalDetails(address _walletAddress) public _onlyOwner view returns(DoctorPersonalInfo memory){
       require(_walletAddress!=address(0),"Wallet Address cannot be empty");
        require(DoctorsPersonalInfo[_walletAddress].walletAddress==_walletAddress  ,"Incorrect Doctor wallet address or The Doctor detail for the address provided is not completely available in the chain!!");
       
       return DoctorsPersonalInfo[_walletAddress];
       
    }

function getDoctorProfessionalDetails(address _walletAddress) public _onlyOwner view returns(DoctorProfessionalDetails memory){
       require(_walletAddress!=address(0),"Wallet Address cannot be empty");
        require( Doctors_ProfessionalDetails[_walletAddress].walletAddress==_walletAddress ,"Incorrect Doctor wallet address or The Doctor detail for the address provided is not completely available in the chain!!");
       
       return Doctors_ProfessionalDetails[_walletAddress];
       
    }

    function EditDoctorProfessionalDetails(address _walletAddress,string memory _MedicalLicenseNumber,
        string memory _Specialization, 
        uint _ExperienceInYear,
        string memory _MedicalSchoolAttended)public _onlyOwner{
        require(_walletAddress!=address(0) && bytes(_MedicalSchoolAttended).length>0 && bytes(_MedicalLicenseNumber).length>0 && bytes(_Specialization).length>0 ,"enter correct details" );
         require(Doctors_ProfessionalDetails[_walletAddress].walletAddress==_walletAddress, "Incorrect Doctor's wallet address or The Doctor detail for the address provided not available in the chain!!");
        Doctors_ProfessionalDetails[_walletAddress]=DoctorProfessionalDetails( _walletAddress,
                _MedicalSchoolAttended,
                _MedicalLicenseNumber,
                _Specialization,
               
                _ExperienceInYear
               
            );
         }
        function EditDoctorPersonalDetails( 
        string memory _name,
        address _walletAddress,
     
       string memory _dateOfBirth,
       uint _age,
        uint _phoneNumber,
        string memory _email
        
        )public _onlyOwner{

       require(_walletAddress!=address(0) 
        &&bytes(_email).length>0
         &&bytes(_name).length>0 ,"Kindly fill all the mandatory feilds properly!!");

        require(DoctorsPersonalInfo[_walletAddress].walletAddress==_walletAddress,"Incorrect Doctor's wallet address or The Doctor detail for the address provided not available in the chain!!");

       uint age=_age;
  
            DoctorsPersonalInfo[_walletAddress]=DoctorPersonalInfo(
                _name,
                _walletAddress,
                _dateOfBirth,
                age,
                _phoneNumber,
                _email
               
            );
         
    }
    function isDoctor(address _address)public view returns(bool val){
        if (DoctorAccess[_address]){
            return true;
        }
        
    }
function isOwner(address _address)public view returns(bool val){
            if(owner[_address]){
                return true;
            }
        }
function isPatient(address _address) public view returns(bool){
     return PatientsPersonalDetails[_address].walletAddress==_address || PatientsMedicalDetails[_address].walletAddress==_address;
}       
}


// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15 ;
pragma experimental ABIEncoderV2;
import "./Doctor.sol";
contract PatientDetails is DoctorDetails {
    uint public id;
    
    constructor(){
         id=1;
        
    }
    modifier userOrAdmin(){
          bool checkAccess;
      if (PatientsPersonalDetails[msg.sender].walletAddress==msg.sender || PatientsMedicalDetails[msg.sender].walletAddress==msg.sender || OnlyOwner[msg.sender]) {
          checkAccess=true;
      }
      require(checkAccess, "You have no access to fetch the details");
      _;
    }
      struct PatientPersonalDetails{
        bool isAlive;
        string name;
        address walletAddress;
        string gender;
        string Occupation;
        uint256 dayOfBirth;
        uint256 monthOfBirth;
        uint256 yearOfBirth;
        uint256 age;
        }
        struct PatientMedicalDetails{
        address walletAddress;
        bool isAlcoholic;
        bool isSmoker;
        bool isSmokelessTobaccoUser;
        string surgicalHistory_ifAny;
        string physicalActivityLevel;
        string pastMedicationDetails_IfAny;
        }
        struct PatientHealthCondition{
        address walletAddress;
        address physician;
        string Department_uint;
        string BloodPressure;
        string HeartRate;
        string RespiratoryRate;
        string Dosage;
    }
    mapping (address => PatientPersonalDetails) public PatientsPersonalDetails;
    mapping(address=> PatientMedicalDetails)public PatientsMedicalDetails;
    mapping (address=>PatientHealthCondition[])public HealthCondition;
    mapping(address=>string[])public patientsStoredData;
    uint256 public totalPatient;
    function AddPatientsMedicalDetails(
        address _walletAddress,
        bool _isAlcoholic,
        bool _isSmoker,
        bool _isSmokelessTobaccoUser,
        string memory _surgicalHistory_ifAny,
        string memory _physicalActivityLevel,
        string memory _pastMedicationDetails_IfAny
        )
        public {
            require(PatientsMedicalDetails[_walletAddress].walletAddress!=_walletAddress,"Patient medical details already exist!!");
            require(_walletAddress!=address(0), "Kindly fill all the mandatory feilds!!");
            PatientsMedicalDetails[_walletAddress]=PatientMedicalDetails(_walletAddress,
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
        bool _isAlive,
        string memory _name,
        address _walletAddress,
        string memory _gender,
        string memory _Occupation,
        uint256 _dayOfBirth,
        uint256 _monthOfBirth,
        uint256 _yearOfBirth)public _onlyAdmin{
            require(PatientsPersonalDetails[_walletAddress].walletAddress!=_walletAddress,"Patient's personal details already exist!!");
        require(_walletAddress!=address(0) && bytes(_gender).length>0 && bytes(_Occupation).length>0 && _dayOfBirth!=0 && _dayOfBirth<30 && _monthOfBirth!=0 && _monthOfBirth<12 && _yearOfBirth!=0 ,"Kindly fill all the mandatory feilds!!");
    
        uint256 age=getAge(_yearOfBirth);
       
        PatientsPersonalDetails[_walletAddress] = PatientPersonalDetails(_isAlive,
        _name,
        _walletAddress,
        _gender,
        _Occupation,
        _dayOfBirth,
        _monthOfBirth,
        _yearOfBirth,
        age
        );
        if (PatientsMedicalDetails[_walletAddress].walletAddress==_walletAddress) {
            totalPatient++;
        } 
    }
    
    function addPatientHealthDetails(
        address _walletAddress,
        address _physician,
        string memory _Department_uint,
        string memory _BloodPressure,
        string memory _HeartRate,
        string memory _RespiratoryRate,
        string memory _Dosage

        ) public  {

        require(PatientsPersonalDetails[_walletAddress].isAlive, "We regret to say that,this Patient is dead and cannot add Health details anymore!!");
        require(PatientsPersonalDetails[_walletAddress].walletAddress==_walletAddress && PatientsMedicalDetails[_walletAddress].walletAddress==_walletAddress,"Incorrect Patient wallet address or The Patient detail specific to personal or past medical history of the address provided not available in the chain!! ");

        require(DoctorsPersonalInfo[_walletAddress].walletAddress==_physician, "Incorrect Physician wallet address or The Physician detail for the address provided not available in the chain!! ");

        HealthCondition[_walletAddress].push(PatientHealthCondition(_walletAddress,
        _physician,
        _Department_uint,
        _BloodPressure,
        _HeartRate,
        _RespiratoryRate,
        _Dosage
        ));
        Doctors_ProfessionalDetails[_physician].treatedPatients.push(_walletAddress);
    }

      function getPatientDetails(address _walletAddress) public userOrAdmin view returns(PatientPersonalDetails memory,PatientMedicalDetails memory){
        require(_walletAddress!=address(0),"Wallet Address cannot be empty");
        require(PatientsPersonalDetails[_walletAddress].walletAddress==_walletAddress && PatientsMedicalDetails[_walletAddress].walletAddress==_walletAddress,"Incorrect Patient wallet address or The Patient detail for the address provided is not completly available in the chain!!");
        return (
            PatientsPersonalDetails[_walletAddress],PatientsMedicalDetails[_walletAddress]
        );
    }

    function PatientDataStorage(string memory dataURL,address user) public {
        patientsStoredData[user].push(dataURL);
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
      address _walletAddress,
        bool _isAlcoholic,
        bool _isSmoker,
        bool _isSmokelessTobaccoUser,
        string memory _surgicalHistory_ifAny,
        string memory _physicalActivityLevel,
        string memory _pastMedicationDetails_IfAny
       
)public {
    require(_walletAddress!=address(0) ,"Kindly fill all the mandatory feilds!!");

        require(PatientsPersonalDetails[_walletAddress].walletAddress==_walletAddress,"Incorrect Patient wallet address or The Patient detail for the address provided not available in the chain!!");
        PatientsMedicalDetails[_walletAddress]=PatientMedicalDetails(_walletAddress,
        _isAlcoholic,
        _isSmoker,
        _isSmokelessTobaccoUser,
        _surgicalHistory_ifAny,
        _physicalActivityLevel,
        _pastMedicationDetails_IfAny
        );
}
    function EditPatientPersonalDetails(bool _isAlive,
        string memory _name,
        address _walletAddress,
        string memory _gender,
        string memory _Occupation,
        uint256 _dayOfBirth,
        uint256 _monthOfBirth,
        uint256 _yearOfBirth)public _onlyAdmin(){
           
        require(_walletAddress!=address(0) && bytes(_gender).length>0 && bytes(_Occupation).length>0 && _dayOfBirth!=0 &&_monthOfBirth!=0 && _yearOfBirth!=0  ,"Kindly fill all the mandatory feilds!!");

        require(PatientsPersonalDetails[_walletAddress].walletAddress==_walletAddress,"Incorrect Patient wallet address or The Patient detail for the address provided not available in the chain!!");
            
      
        uint256 age=getAge(_yearOfBirth);

       
         PatientsPersonalDetails[_walletAddress] = PatientPersonalDetails( _isAlive,
        _name,
        _walletAddress,
        _gender,
        _Occupation,
        _dayOfBirth,
        _monthOfBirth,
        _yearOfBirth,
        age
        );
    }
}
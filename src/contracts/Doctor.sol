//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
// import "./Patient.sol";
contract DoctorDetails {
    mapping(address=>bool)public owner;
    address public superOwner;
    // address[] public owner;
  constructor () {
    owner[msg.sender] = true;
    AddAdminAccess(msg.sender);
     superOwner = msg.sender;
  }
     modifier _onlyOwner() {
        require(owner[msg.sender]==true, "Accesseble only for Owners");
        _;
    }
  modifier _onlyAdmin(){
      bool checkAccess;
      if (OnlyOwner[msg.sender]) {
          checkAccess=true;
      }
    require(OnlyOwner[msg.sender],"Only the Admin can call this function due to security reasons!!!");
    _;
  }
  
 modifier _superAdmin(){
    require(msg.sender==superOwner, "Accesseble only for SuperOwners");
        _;
  }
    struct DoctorPersonalInfo{
        string name;
        address walletAddress;
        uint256 dayOfBirth;
        uint256 monthOfBirth;
        uint256 yearOfBirth;
        uint256 age;
        uint256 phoneNumber;
        string email;
    }
    struct DoctorProfessionalDetails{
        address walletAddress;
        string MedicalSchoolAttended;
        string MedicalLicenseNumber;
        string Specialization;
        string AvailableTimings;
        uint ExperienceInYear;
        address[] treatedPatients;
        bool isLicenseValid;
        }
    address[] public AdminAccess;
    mapping (address=>bool)public OnlyOwner;
    mapping(address=>DoctorPersonalInfo)public DoctorsPersonalInfo;
    mapping (address=>DoctorProfessionalDetails)public Doctors_ProfessionalDetails;
    uint256 public totalDoctors;
    uint256 public totalAdmin;

 

    function getYear(uint256 timestamp) public pure returns (uint256) {
        return timestamp / (365 * 24 * 60 * 60);
    }

    function getAge(uint256 _yearOfBirth)public view returns(uint256){
       
         uint256 yearDifference=getYear(block.timestamp);
        uint256 age=(1970+yearDifference)-_yearOfBirth;
        require(age>0, "Enter correct birth year");
        return age;
    }
    function addOwner(address _address)public _superAdmin(){
        owner[_address]=true;
    }
    function removeOwner(address _address)public _superAdmin(){
        owner[_address]=false;
    }
    function AddAdminAccess(address _walletAddress)public _onlyOwner(){
        require(owner[msg.sender]=true,"Only owner has privilege to add owner access!!");
        require(!OnlyOwner[_walletAddress], "Address already has admin access");
        require(_walletAddress!=address(0), "Invalid Address");
        AdminAccess.push(_walletAddress);
        OnlyOwner[_walletAddress]=true;
        totalAdmin++;
    }
    
    function DeleteAdminAccess(address _walletAddress)public _onlyOwner() {
        require(owner[msg.sender]=true,"Only owner has privilege to delete owner access!!");
        require(_walletAddress!=address(0), "Invalid Address");
        require(OnlyOwner[_walletAddress], "Provided address must be an AdminAccessAddress to remove AdminAccess!!");
        OnlyOwner[_walletAddress]=false;
    }
    
    function AddDoctorProfessionalInfo( address _walletAddress,string memory _MedicalLicenseNumber,
        string memory _Specialization,
        string memory _AvailableTimings,
        uint _ExperienceInYear,
          string memory _MedicalSchoolAttended,
        bool _isLicenseValid)public  _onlyOwner{
             require(Doctors_ProfessionalDetails[_walletAddress].walletAddress!=_walletAddress, "Physician Professional details already exist!!");
        require(Doctors_ProfessionalDetails[_walletAddress].walletAddress!=_walletAddress && bytes(_MedicalSchoolAttended).length>0 &&  bytes(_MedicalLicenseNumber).length>0 && bytes(_Specialization).length>0 && bytes(_AvailableTimings).length>0,
        "Enter Correct details");
        Doctors_ProfessionalDetails[_walletAddress]=DoctorProfessionalDetails(
                _walletAddress,
                 _MedicalSchoolAttended,
                _MedicalLicenseNumber,
                _Specialization,
                _AvailableTimings,
                _ExperienceInYear,
                new address[](0),
                _isLicenseValid
            );
            if (DoctorsPersonalInfo[_walletAddress].walletAddress==_walletAddress) {
                AddAdminAccess(_walletAddress);
                totalDoctors++;
            }
         }
    function AddDoctorPersonalInfo( 
        string  memory _name,
        address _walletAddress,
      
        uint256 _dayOfBirth,
        uint256 _monthOfBirth,
        uint256 _yearOfBirth,
        uint256 _phoneNumber,
        string memory _email
        
        )public _onlyOwner{
require(DoctorsPersonalInfo[_walletAddress].walletAddress!=_walletAddress , "Physician personal detail already exist!!");
// uint getCurrentYear=getYear(block.timestamp / (365 * 24 * 60 * 60))+1970;
       require( _walletAddress!=address(0) &&  _dayOfBirth>0 && _dayOfBirth<=31 && _monthOfBirth>0 && _monthOfBirth<=12 &&_yearOfBirth>0&&  _phoneNumber>0 &&bytes(_email).length>0 &&bytes(_name).length>0 
        ,"Kindly fill all the mandatory feilds properly!!");
       uint256 age=getAge(_yearOfBirth);
     
            DoctorsPersonalInfo[_walletAddress]=DoctorPersonalInfo(_name,
                _walletAddress,
                _dayOfBirth,
                _monthOfBirth,
                _yearOfBirth,
                age,
                _phoneNumber,
                _email
               
            );
          
          if (Doctors_ProfessionalDetails[_walletAddress].walletAddress==_walletAddress) {
              AddAdminAccess(_walletAddress);
              totalDoctors++;
          }
            
    }
    function getDoctor(address _walletAddress) public _onlyOwner view returns(DoctorPersonalInfo memory,DoctorProfessionalDetails memory){
       require(_walletAddress!=address(0),"Wallet Address cannot be empty");
        require(DoctorsPersonalInfo[_walletAddress].walletAddress==_walletAddress && Doctors_ProfessionalDetails[_walletAddress].walletAddress==_walletAddress ,"Incorrect Doctor wallet address or The Doctor detail for the address provided is not completely available in the chain!!");
       
       return (
            DoctorsPersonalInfo[_walletAddress],Doctors_ProfessionalDetails[_walletAddress]
        );
       
    }
    function EditDoctorProfessionalDetails(address _walletAddress,string memory _MedicalLicenseNumber,
        string memory _Specialization, 
        string memory _AvailableTimings,
        uint _ExperienceInYear,
        string memory _MedicalSchoolAttended,
        bool _isLicenseValid,
        address[] memory _treatedPatients)public _onlyOwner{
        require(_walletAddress!=address(0) && bytes(_MedicalSchoolAttended).length>0 && bytes(_MedicalLicenseNumber).length>0 && bytes(_Specialization).length>0 && 
         bytes(_AvailableTimings).length>0,"enter correct details" );
         require(Doctors_ProfessionalDetails[_walletAddress].walletAddress==_walletAddress, "Incorrect Doctor's wallet address or The Doctor detail for the address provided not available in the chain!!");
        Doctors_ProfessionalDetails[_walletAddress]=DoctorProfessionalDetails( _walletAddress,
                _MedicalSchoolAttended,
                _MedicalLicenseNumber,
                _Specialization,
                _AvailableTimings,
                _ExperienceInYear,
                _treatedPatients,
                _isLicenseValid
            );
         }
        function EditDoctorPersonalDetails( 
        string memory _name,
        address _walletAddress,
     
        uint256 _dayOfBirth,
        uint256 _monthOfBirth,
        uint256 _yearOfBirth,
        uint256 _phoneNumber,
        string memory _email
        
        )public _onlyOwner{

       require(_walletAddress!=address(0) 
        && _dayOfBirth>0 && _monthOfBirth>0 && _yearOfBirth>0&& _phoneNumber>0 &&bytes(_email).length>0
         &&bytes(_name).length>0 ,"Kindly fill all the mandatory feilds properly!!");

        require(DoctorsPersonalInfo[_walletAddress].walletAddress==_walletAddress,"Incorrect Doctor's wallet address or The Doctor detail for the address provided not available in the chain!!");

       uint256 age=getAge(_yearOfBirth);
  
            DoctorsPersonalInfo[_walletAddress]=DoctorPersonalInfo(
                _name,
                _walletAddress,
                _dayOfBirth,
                _monthOfBirth,
                _yearOfBirth,
                age,
                _phoneNumber,
                _email
               
            );
         
    }

}
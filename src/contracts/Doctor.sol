//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
// import "./Patient.sol";
contract DoctorDetails {
    mapping(address=>bool)public owner;
    address public superOwner;
    // address[] public owner;
  constructor () {
    owner[msg.sender] = true;
    superOwner = msg.sender;
    AddAdminAccess(msg.sender);
     
  }
     modifier _onlyOwner() {
        require(owner[msg.sender]==true || msg.sender==superOwner, "Accesseble only for Owners and SuperOwners");
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
        string AvailableTimings;
        uint ExperienceInYear;
        address[] treatedPatients;
        bool isLicenseValid;
        }
    address[] public AdminAccess;
    mapping (address=>bool)public DoctorAccess;
    mapping(address=>DoctorPersonalInfo)public DoctorsPersonalInfo;
    mapping (address=>DoctorProfessionalDetails)public Doctors_ProfessionalDetails;
    uint public totalDoctors;
    uint public totalAdmin;

 

    function getYear(uint timestamp) public pure returns (uint) {
        return timestamp / (365 * 24 * 60 * 60);
    }

    function getAge(uint _yearOfBirth)public view returns(uint){
       
         uint yearDifference=getYear(block.timestamp);
        uint age=(1970+yearDifference)-_yearOfBirth;
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
        require(!DoctorAccess[_walletAddress], "Address already has admin access");
        require(_walletAddress!=address(0), "Invalid Address");
        AdminAccess.push(_walletAddress);
        DoctorAccess[_walletAddress]=true;
        totalAdmin++;
    }
    
    function DeleteAdminAccess(address _walletAddress)public _onlyOwner() {
        require(owner[msg.sender]=true,"Only owner has privilege to delete owner access!!");
        require(_walletAddress!=address(0), "Invalid Address");
        require(DoctorAccess[_walletAddress], "Provided address must be an AdminAccessAddress to remove AdminAccess!!");
        DoctorAccess[_walletAddress]=false;
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
    

}
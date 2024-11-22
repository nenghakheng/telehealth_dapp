// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Patient.sol";

contract PatientDataContract {
    // Variables to store data
    address[] public patientList;

    mapping(address => Patient) patients;

    // Variables for state check
    mapping(address => bool) isPatient;

    // Variables for counting
    uint256 public patientCount = 0;

    event PatientRegistered(address indexed patient, string did);

    event PatientUpdated(address indexed patient, string did, string dataHash);

    function getPatients() public view returns (address[] memory) {
        return patientList;
    }

    function getPatient(
        address patientAddress
    ) public view returns (string memory did, string memory dataHash) {
        require(isPatient[patientAddress], "Patient does not exist");
        Patient memory patient = patients[patientAddress];
        return (patient.did, patient.dataHash);
    }

    function registerPatient(string memory did) public {
        require(!isPatient[msg.sender], "Patient already registered.");
        patients[msg.sender] = Patient(did, "");

        patientList.push(msg.sender);
        isPatient[msg.sender] = true;
        emit PatientRegistered(msg.sender, did);
    }

    function updatePatient(string memory did, string memory dataHash) public {
        require(isPatient[msg.sender], "Patient does not exist");
        patients[msg.sender].dataHash = dataHash;

        patients[msg.sender] = Patient(did, dataHash);
        emit PatientUpdated(msg.sender, did, dataHash);
    }
}

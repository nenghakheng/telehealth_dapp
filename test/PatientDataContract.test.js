/* eslint-disable no-undef */
const PatientDataContract = artifacts.require("PatientDataContract");

contract("PatientDataContract", (accounts) => {
  let patientDataContract;

  before(async () => {
    patientDataContract = await PatientDataContract.deployed();
  });

  it("should register a patient", async () => {
    const did = "did:example:123456789abcdefghi";
    await patientDataContract.registerPatient(did, { from: accounts[0] });

    const patientList = await patientDataContract.getPatients();
    assert.equal(patientList.length, 1, "Patient list should have one patient");
    assert.equal(
      patientList[0],
      accounts[0],
      "Registered patient address should match"
    );
  });

  it("should not allow registering the same patient twice", async () => {
    const did = "did:example:123456789abcdefghi";
    try {
      await patientDataContract.registerPatient(did, { from: accounts[0] });
      assert.fail("Expected error not received");
    } catch (error) {
      assert(
        error.message.includes("Patient already registered"),
        "Expected 'Patient already registered' error"
      );
    }
  });

  it("should update patient data", async () => {
    const did = "did:example:123456789abcdefghi";
    const dataHash = "QmTzQ1Nj5Q1N5Q1N5Q1N5Q1N5Q1N5Q1N5Q1N5Q1N5Q1N5Q1N5Q1N5";
    await patientDataContract.updatePatient(did, dataHash, {
      from: accounts[0],
    });

    const patient = await patientDataContract.getPatient(accounts[0]);
    assert.equal(
      patient.dataHash,
      dataHash,
      "Patient data hash should be updated"
    );
  });

  it("should not allow updating non-existent patient", async () => {
    const did = "did:example:123456789abcdefghi";
    const dataHash = "QmTzQ1Nj5Q1N5Q1N5Q1N5Q1N5Q1N5Q1N5Q1N5Q1N5Q1N5Q1N5Q1N5";
    try {
      await patientDataContract.updatePatient(did, dataHash, {
        from: accounts[1],
      });
      assert.fail("Expected error not received");
    } catch (error) {
      assert(
        error.message.includes("Patient does not exist"),
        "Expected 'Patient does not exist' error"
      );
    }
  });
});

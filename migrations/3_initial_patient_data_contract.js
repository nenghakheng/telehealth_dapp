// eslint-disable-next-line no-undef
const PatientDataContract = artifacts.require("PatientDataContract");

module.exports = function (deployer) {
  deployer.deploy(PatientDataContract);
};

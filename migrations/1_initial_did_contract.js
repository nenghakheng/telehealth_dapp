// eslint-disable-next-line no-undef
const DIDContract = artifacts.require("DIDContract");

module.exports = function (deployer) {
  deployer.deploy(DIDContract, { gas: 5000000 });
};

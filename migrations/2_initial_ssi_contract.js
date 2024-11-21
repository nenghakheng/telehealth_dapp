// eslint-disable-next-line no-undef
const SSIContract = artifacts.require("SSIContract");

module.exports = function (deployer) {
  deployer.deploy(SSIContract, { gas: 5000000 });
};

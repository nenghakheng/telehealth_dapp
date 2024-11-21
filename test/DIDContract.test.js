// eslint-disable-next-line no-undef
const DIDContract = artifacts.require("DIDContract");
const assert = require("assert");

// eslint-disable-next-line no-undef
contract("DIDContract", (accounts) => {
  it("should register a DID", async () => {
    const instance = await DIDContract.deployed();

    // Register a DID
    await instance.registerDID("did:example:456", "publicKey456", {
      from: accounts[0],
    });

    // Get the registered DID
    const details = await instance.getDID("did:example:456");

    assert.equal(details.owner, accounts[0], "Owner is incorrect");
    assert.equal(details.publicKey, "publicKey456", "Public key is incorrect");
    assert.equal(details.active, true, "DID should be active");
  });

  it("should deactivate a DID", async () => {
    const instance = await DIDContract.deployed();

    // Deactivate the DID
    await instance.deactivateDID("did:example:456", { from: accounts[0] });

    // Get the DID details
    const details = await instance.getDID("did:example:456");

    assert.equal(details.active, false, "DID should be deactivated");
  });

  it("should prevent unauthorized deactivation", async () => {
    const instance = await DIDContract.deployed();

    try {
      await instance.deactivateDID("did:example:456", { from: accounts[1] });
      assert.fail("Unauthorized user was able to deactivate the DID");
    } catch (error) {
      assert(
        error.message.includes("User is not authorized"),
        "Expected 'User is not authorized' error"
      );
    }
  });
});

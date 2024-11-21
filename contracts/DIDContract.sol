// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DIDContract {
    struct DIDDocument {
        address owner;
        string publicKey;
        bool active;
    }

    mapping(string => DIDDocument) private didRegistry;

    event DIDRegistered(string did, address owner);
    event DIDDeactivated(string did);

    // Register DID
    function registerDID(string memory did, string memory publicKey) public {
        require(didRegistry[did].owner == address(0), "DID already exists");

        didRegistry[did] = DIDDocument({
            owner: msg.sender,
            publicKey: publicKey,
            active: true
        });

        emit DIDRegistered(did, msg.sender);
    }

    // Deactivate DID
    function deactivateDID(string memory did) public {
        require(didRegistry[did].owner == msg.sender, "User is not authorized");
        require(didRegistry[did].active, "DID is already deactivated");

        didRegistry[did].active = false;

        emit DIDDeactivated(did);
    }

    function getDID(
        string memory did
    )
        public
        view
        returns (address owner, string memory publicKey, bool active)
    {
        require(didRegistry[did].owner != address(0), "DID did not exist.");

        DIDDocument memory document = didRegistry[did];

        return (document.owner, document.publicKey, document.active);
    }
}

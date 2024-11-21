// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./DIDContract.sol";

contract SSIContract is DIDContract {
    struct VerifiableCredential {
        address issuer;
        address holder;
        string credentialHash;
        uint256 issuedAt;
        uint256 expiresAt;
        bool revoked;
    }

    mapping(string => VerifiableCredential) private credentials;

    event CredentialIssued(string credentialID, address holder, address issuer);
    event CredentialRevoked(string credentialID);

    // Issue Credentials
    function issueCredential(
        string memory credentialID,
        address holder,
        string memory credentialHash,
        uint256 expiresAt
    ) public {
        require(
            credentials[credentialID].issuer == address(0),
            "Credential already exists."
        );

        credentials[credentialID] = VerifiableCredential({
            issuer: msg.sender,
            holder: holder,
            credentialHash: credentialHash,
            issuedAt: block.timestamp,
            expiresAt: expiresAt,
            revoked: false
        });

        emit CredentialIssued(credentialID, holder, msg.sender);
    }

    // Revoke a verifiable credential
    function revokeCredential(string memory credentialID) public {
        require(
            credentials[credentialID].issuer == msg.sender,
            "User is unauthorized"
        );
        require(
            !credentials[credentialID].revoked,
            "Credentials is already revoked."
        );

        credentials[credentialID].revoked = true;

        emit CredentialRevoked(credentialID);
    }

    // Verify credentials
    function verifyCredential(
        string memory credentialID
    ) public view returns (bool) {
        VerifiableCredential memory credential = credentials[credentialID];

        // Check if the credential exists, not revoked, and not expired
        return (credential.issuer != address(0) &&
            !credential.revoked &&
            block.timestamp < credential.expiresAt);
    }

    function getCredential(
        string memory credentialID
    )
        public
        view
        returns (
            address issuer,
            address holder,
            string memory credentialHash,
            uint256 issuedAt,
            uint256 expiresAt,
            bool revoked
        )
    {
        require(
            credentials[credentialID].issuer != address(0),
            "Credentials does not exist."
        );

        VerifiableCredential memory credential = credentials[credentialID];

        return (
            credential.issuer,
            credential.holder,
            credential.credentialHash,
            credential.issuedAt,
            credential.expiresAt,
            credential.revoked
        );
    }
}

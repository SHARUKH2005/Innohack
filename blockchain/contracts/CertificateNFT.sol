// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title CertificateNFT
 * @dev Soulbound ERC-721 Graduation Certificate Token for BlockLearnX
 * Minted upon course completion with verified quiz scores & AI assignment grades.
 */
contract CertificateNFT {
    string public name = "BlockLearnX Soulbound Certificate";
    string public symbol = "BLX-CERT";
    
    address public admin;
    uint256 public nextTokenId = 1;

    struct CertificateData {
        string courseTitle;
        string learnerName;
        uint256 score;
        uint256 completionTimestamp;
        string metadataURI;
    }

    mapping(uint256 => address) public ownerOf;
    mapping(address => uint256[]) public learnerCertificates;
    mapping(uint256 => CertificateData) public certificates;

    event CertificateMinted(uint256 indexed tokenId, address indexed learner, string courseTitle, uint256 score);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can mint certificates");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function mintCertificate(
        address learner,
        string memory courseTitle,
        string memory learnerName,
        uint256 score,
        string memory metadataURI
    ) external onlyAdmin returns (uint256) {
        uint256 tokenId = nextTokenId++;
        ownerOf[tokenId] = learner;
        learnerCertificates[learner].push(tokenId);

        certificates[tokenId] = CertificateData({
            courseTitle: courseTitle,
            learnerName: learnerName,
            score: score,
            completionTimestamp: block.timestamp,
            metadataURI: metadataURI
        });

        emit CertificateMinted(tokenId, learner, courseTitle, score);
        return tokenId;
    }

    function getCertificate(uint256 tokenId) external view returns (CertificateData memory) {
        require(ownerOf[tokenId] != address(0), "Certificate does not exist");
        return certificates[tokenId];
    }

    function getLearnerCertificates(address learner) external view returns (uint256[] memory) {
        return learnerCertificates[learner];
    }

    // Non-transferable (Soulbound) enforcement
    function transferFrom(address, address, uint256) external pure {
        revert("Soulbound: Certificates are non-transferable");
    }
}

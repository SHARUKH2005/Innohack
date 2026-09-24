// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CertificateNFT is ERC721, Ownable {
    uint256 private _nextTokenId;

    address public certificateMinter;

    string private _baseTokenURI;

    mapping(uint256 => string) private _verificationCodes;

    event CertificateMinterUpdated(
        address indexed oldMinter,
        address indexed newMinter
    );

    event CertificateIssued(
        address indexed student,
        uint256 indexed tokenId,
        string verificationCode
    );

    constructor(
        string memory baseURI
    )
        ERC721("BlockLearnX Certificate", "BLXC")
        Ownable(msg.sender)
    {
        _baseTokenURI = baseURI;
    }

    modifier onlyCertificateMinter() {
        require(
            msg.sender == certificateMinter ||
                msg.sender == owner(),
            "CertificateNFT: not authorized"
        );
        _;
    }

    function setCertificateMinter(
        address newMinter
    ) external onlyOwner {
        require(
            newMinter != address(0),
            "CertificateNFT: invalid minter"
        );

        address oldMinter = certificateMinter;
        certificateMinter = newMinter;

        emit CertificateMinterUpdated(
            oldMinter,
            newMinter
        );
    }

    function issueCertificate(
        address student,
        string calldata code
    )
        external
        onlyCertificateMinter
        returns (uint256)
    {
        require(
            student != address(0),
            "CertificateNFT: invalid student"
        );

        require(
            bytes(code).length > 0,
            "CertificateNFT: verification code required"
        );

        uint256 tokenId = _nextTokenId;
        _nextTokenId++;

        _safeMint(student, tokenId);

        _verificationCodes[tokenId] = code;

        emit CertificateIssued(
            student,
            tokenId,
            code
        );

        return tokenId;
    }

    function verificationCode(
        uint256 tokenId
    )
        external
        view
        returns (string memory)
    {
        require(
            _ownerOf(tokenId) != address(0),
            "CertificateNFT: nonexistent token"
        );

        return _verificationCodes[tokenId];
    }

    function setBaseURI(
        string calldata newBaseURI
    ) external onlyOwner {
        _baseTokenURI = newBaseURI;
    }

    function _baseURI()
        internal
        view
        override
        returns (string memory)
    {
        return _baseTokenURI;
    }

    // Certificates are non-transferable.
    // Minting is allowed, but wallet-to-wallet transfers are blocked.
    function _update(
        address to,
        uint256 tokenId,
        address auth
    )
        internal
        override
        returns (address)
    {
        address from = _ownerOf(tokenId);

        if (
            from != address(0) &&
            to != address(0)
        ) {
            revert(
                "CertificateNFT: certificates are non-transferable"
            );
        }

        return super._update(
            to,
            tokenId,
            auth
        );
    }
}
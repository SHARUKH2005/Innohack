// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AvatarNFT is ERC721, Ownable {
    uint256 private _nextTokenId;

    address public rewardMinter;

    string private _baseTokenURI;

    event RewardMinterUpdated(
        address indexed oldMinter,
        address indexed newMinter
    );

    event AchievementMinted(
        address indexed user,
        uint256 indexed tokenId,
        string achievement
    );

    constructor(
        string memory baseURI
    ) ERC721("BlockLearnX Achievement", "BLXA") Ownable(msg.sender) {
        _baseTokenURI = baseURI;
    }

    modifier onlyRewardMinter() {
        require(
            msg.sender == rewardMinter || msg.sender == owner(),
            "AvatarNFT: not authorized"
        );
        _;
    }

    function setRewardMinter(address newMinter) external onlyOwner {
        require(
            newMinter != address(0),
            "AvatarNFT: invalid minter"
        );

        address oldMinter = rewardMinter;
        rewardMinter = newMinter;

        emit RewardMinterUpdated(oldMinter, newMinter);
    }

    function mintAchievement(
        address user,
        string calldata achievement
    ) external onlyRewardMinter returns (uint256) {
        require(
            user != address(0),
            "AvatarNFT: invalid user"
        );

        require(
            bytes(achievement).length > 0,
            "AvatarNFT: achievement required"
        );

        uint256 tokenId = _nextTokenId;
        _nextTokenId++;

        _safeMint(user, tokenId);

        emit AchievementMinted(
            user,
            tokenId,
            achievement
        );

        return tokenId;
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
}
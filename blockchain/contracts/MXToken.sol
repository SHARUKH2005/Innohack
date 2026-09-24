// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MXToken is ERC20, Ownable {
    uint256 public constant INITIAL_SUPPLY = 1_000_000 * 10 ** 18;

    address public rewardMinter;

    event RewardMinterUpdated(
        address indexed oldMinter,
        address indexed newMinter
    );

    event RewardMinted(
        address indexed user,
        uint256 amount,
        string reason
    );

    constructor() ERC20("BlockLearnX Token", "MX") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    modifier onlyRewardMinter() {
        require(
            msg.sender == rewardMinter || msg.sender == owner(),
            "MXToken: not authorized"
        );
        _;
    }

    function setRewardMinter(address newMinter) external onlyOwner {
        require(newMinter != address(0), "MXToken: invalid minter");

        address oldMinter = rewardMinter;
        rewardMinter = newMinter;

        emit RewardMinterUpdated(oldMinter, newMinter);
    }

    function mintReward(
        address user,
        uint256 amount,
        string calldata reason
    ) external onlyRewardMinter {
        require(user != address(0), "MXToken: invalid user");
        require(amount > 0, "MXToken: amount must be greater than zero");

        _mint(user, amount);

        emit RewardMinted(user, amount, reason);
    }
}
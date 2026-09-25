// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title MXToken
 * @dev ERC-20 Reward Token for BlockLearnX Decentralized Learning Platform
 * Learners earn MX tokens for completing lessons, passing quizzes, and submitting AI assignments.
 */
contract MXToken {
    string public name = "BlockLearnX MX Token";
    string public symbol = "MX";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    address public owner;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    mapping(address => bool) public authorizedMinters;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event RewardMinted(address indexed learner, uint256 amount, string milestone);
    event MinterAuthorized(address indexed minter);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    modifier onlyMinter() {
        require(msg.sender == owner || authorizedMinters[msg.sender], "Not authorized to mint rewards");
        _;
    }

    constructor(uint256 initialSupply) {
        owner = msg.sender;
        authorizedMinters[msg.sender] = true;
        mint(msg.sender, initialSupply * 10 ** uint256(decimals));
    }

    function setMinter(address minter, bool authorized) external onlyOwner {
        authorizedMinters[minter] = authorized;
        emit MinterAuthorized(minter);
    }

    function mint(address to, uint256 amount) public onlyMinter returns (bool) {
        totalSupply += amount;
        balanceOf[to] += amount;
        emit Transfer(address(0), to, amount);
        return true;
    }

    function mintReward(address learner, uint256 amount, string memory milestone) external onlyMinter returns (bool) {
        uint256 value = amount * 10 ** uint256(decimals);
        totalSupply += value;
        balanceOf[learner] += value;
        emit Transfer(address(0), learner, value);
        emit RewardMinted(learner, amount, milestone);
        return true;
    }

    function transfer(address to, uint256 value) external returns (bool) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function approve(address spender, uint256 value) external returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) external returns (bool) {
        require(balanceOf[from] >= value, "Insufficient balance");
        require(allowance[from][msg.sender] >= value, "Allowance exceeded");
        balanceOf[from] -= value;
        allowance[from][msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(from, to, value);
        return true;
    }
}

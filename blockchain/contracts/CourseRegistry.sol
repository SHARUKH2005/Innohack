// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title CourseRegistry
 * @dev On-chain course registry & enrollment escrow for BlockLearnX
 * Handles course lifecycle (Draft, Pending Approval, Published),
 * enrollment payments in native token / stablecoins, and provider payouts.
 */
contract CourseRegistry {
    enum CourseStatus { Draft, PendingApproval, Published, Archived }

    struct Course {
        string courseId;
        string title;
        address provider;
        uint256 price; // In wei or token base units
        uint256 rewardPool;
        CourseStatus status;
        uint256 totalEnrollments;
        uint256 totalRevenue;
    }

    address public admin;
    mapping(string => Course) public courses;
    mapping(string => mapping(address => bool)) public isEnrolled;
    string[] public courseIds;

    event CourseRegistered(string indexed courseId, string title, address indexed provider, uint256 price);
    event CourseStatusChanged(string indexed courseId, CourseStatus status);
    event CourseEnrolled(string indexed courseId, address indexed learner, uint256 feePaid);
    event ProviderPayout(address indexed provider, uint256 amount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only platform admin");
        _;
    }

    modifier onlyProvider(string memory courseId) {
        require(courses[courseId].provider == msg.sender || msg.sender == admin, "Not authorized provider");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function registerCourse(
        string memory courseId,
        string memory title,
        uint256 price,
        uint256 rewardPool
    ) external {
        require(courses[courseId].provider == address(0), "Course already registered");

        courses[courseId] = Course({
            courseId: courseId,
            title: title,
            provider: msg.sender,
            price: price,
            rewardPool: rewardPool,
            status: CourseStatus.Draft,
            totalEnrollments: 0,
            totalRevenue: 0
        });

        courseIds.push(courseId);
        emit CourseRegistered(courseId, title, msg.sender, price);
    }

    function submitForApproval(string memory courseId) external onlyProvider(courseId) {
        require(courses[courseId].status == CourseStatus.Draft, "Course not in Draft state");
        courses[courseId].status = CourseStatus.PendingApproval;
        emit CourseStatusChanged(courseId, CourseStatus.PendingApproval);
    }

    function approveCourse(string memory courseId) external onlyAdmin {
        require(courses[courseId].status == CourseStatus.PendingApproval, "Not awaiting approval");
        courses[courseId].status = CourseStatus.Published;
        emit CourseStatusChanged(courseId, CourseStatus.Published);
    }

    function enrollInCourse(string memory courseId) external payable {
        Course storage c = courses[courseId];
        require(c.status == CourseStatus.Published, "Course not published");
        require(!isEnrolled[courseId][msg.sender], "Already enrolled");
        require(msg.value >= c.price, "Insufficient enrollment fee");

        isEnrolled[courseId][msg.sender] = true;
        c.totalEnrollments += 1;
        c.totalRevenue += msg.value;

        // Transfer 90% to provider, 10% platform fee
        uint256 providerShare = (msg.value * 90) / 100;
        payable(c.provider).transfer(providerShare);

        emit CourseEnrolled(courseId, msg.sender, msg.value);
        emit ProviderPayout(c.provider, providerShare);
    }

    function getCourseCount() external view returns (uint256) {
        return courseIds.length;
    }
}

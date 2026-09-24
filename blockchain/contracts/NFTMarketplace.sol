// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract NFTMarketplace is ReentrancyGuard {
    IERC20 public immutable paymentToken;

    uint256 private _nextListingId;

    struct Listing {
        uint256 listingId;
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool active;
    }

    mapping(uint256 => Listing) public listings;

    event NFTListed(
        uint256 indexed listingId,
        address indexed seller,
        address indexed nftContract,
        uint256 tokenId,
        uint256 price
    );

    event NFTPurchased(
        uint256 indexed listingId,
        address indexed buyer,
        address indexed seller,
        uint256 price
    );

    event ListingCancelled(
        uint256 indexed listingId,
        address indexed seller
    );

    constructor(address paymentTokenAddress) {
        require(
            paymentTokenAddress != address(0),
            "Marketplace: invalid payment token"
        );

        paymentToken = IERC20(paymentTokenAddress);
    }

    function listNFT(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) external returns (uint256) {
        require(
            nftContract != address(0),
            "Marketplace: invalid NFT contract"
        );

        require(
            price > 0,
            "Marketplace: price must be greater than zero"
        );

        IERC721 nft = IERC721(nftContract);

        require(
            nft.ownerOf(tokenId) == msg.sender,
            "Marketplace: not NFT owner"
        );

        require(
            nft.getApproved(tokenId) == address(this) ||
                nft.isApprovedForAll(msg.sender, address(this)),
            "Marketplace: NFT not approved"
        );

        uint256 listingId = _nextListingId;
        _nextListingId++;

        listings[listingId] = Listing({
            listingId: listingId,
            seller: msg.sender,
            nftContract: nftContract,
            tokenId: tokenId,
            price: price,
            active: true
        });

        emit NFTListed(
            listingId,
            msg.sender,
            nftContract,
            tokenId,
            price
        );

        return listingId;
    }

    function buyNFT(
        uint256 listingId
    ) external nonReentrant {
        Listing storage listing = listings[listingId];

        require(
            listing.active,
            "Marketplace: listing not active"
        );

        require(
            listing.seller != msg.sender,
            "Marketplace: seller cannot buy"
        );

        IERC721 nft = IERC721(listing.nftContract);

        require(
            nft.ownerOf(listing.tokenId) == listing.seller,
            "Marketplace: NFT no longer owned by seller"
        );

        listing.active = false;

        require(
            paymentToken.transferFrom(
                msg.sender,
                listing.seller,
                listing.price
            ),
            "Marketplace: payment failed"
        );

        nft.safeTransferFrom(
            listing.seller,
            msg.sender,
            listing.tokenId
        );

        emit NFTPurchased(
            listingId,
            msg.sender,
            listing.seller,
            listing.price
        );
    }

    function cancelListing(
        uint256 listingId
    ) external {
        Listing storage listing = listings[listingId];

        require(
            listing.active,
            "Marketplace: listing not active"
        );

        require(
            listing.seller == msg.sender,
            "Marketplace: not listing owner"
        );

        listing.active = false;

        emit ListingCancelled(
            listingId,
            msg.sender
        );
    }

    function getListing(
        uint256 listingId
    ) external view returns (Listing memory) {
        return listings[listingId];
    }
}
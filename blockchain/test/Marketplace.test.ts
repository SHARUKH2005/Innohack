import { network } from "hardhat";
import assert from "node:assert/strict";
import { describe, it } from "node:test";

describe("NFTMarketplace", async function () {
  const { ethers } = await network.connect();

  it("should deploy with the correct payment token", async function () {
    const token = await ethers.deployContract("MXToken");
    await token.waitForDeployment();

    const marketplace = await ethers.deployContract(
      "NFTMarketplace",
      [await token.getAddress()]
    );

    await marketplace.waitForDeployment();

    assert.equal(
      await marketplace.paymentToken(),
      await token.getAddress()
    );
  });

  it("should allow a seller to list an NFT", async function () {
    const token = await ethers.deployContract("MXToken");
    await token.waitForDeployment();

    const nft = await ethers.deployContract("AvatarNFT", [
      "https://api.blocklearnx.com/achievements/",
    ]);
    await nft.waitForDeployment();

    const marketplace = await ethers.deployContract(
      "NFTMarketplace",
      [await token.getAddress()]
    );
    await marketplace.waitForDeployment();

    const [seller] = await ethers.getSigners();

    await nft.mintAchievement(
      seller.address,
      "Python Mastery"
    );

    await nft.approve(
      await marketplace.getAddress(),
      0
    );

    const price = 100n * 10n ** 18n;

    await marketplace.listNFT(
      await nft.getAddress(),
      0,
      price
    );

    const listing = await marketplace.getListing(0);

    assert.equal(
      listing.seller,
      seller.address
    );

    assert.equal(
      listing.nftContract,
      await nft.getAddress()
    );

    assert.equal(
      listing.tokenId,
      0n
    );

    assert.equal(
      listing.price,
      price
    );

    assert.equal(
      listing.active,
      true
    );
  });

  it("should allow a buyer to purchase an NFT using MX tokens", async function () {
    const token = await ethers.deployContract("MXToken");
    await token.waitForDeployment();

    const nft = await ethers.deployContract("AvatarNFT", [
      "https://api.blocklearnx.com/achievements/",
    ]);
    await nft.waitForDeployment();

    const marketplace = await ethers.deployContract(
      "NFTMarketplace",
      [await token.getAddress()]
    );
    await marketplace.waitForDeployment();

    const [seller, buyer] = await ethers.getSigners();

    // Mint achievement NFT to seller
    await nft.mintAchievement(
      seller.address,
      "Python Mastery"
    );

    // Approve marketplace to transfer seller's NFT
    await nft.approve(
      await marketplace.getAddress(),
      0
    );

    const price = 100n * 10n ** 18n;

    // Transfer MX tokens from owner to buyer
    await token.transfer(
      buyer.address,
      price
    );

    // Buyer approves marketplace to spend MX tokens
    await token
      .connect(buyer)
      .approve(
        await marketplace.getAddress(),
        price
      );

    // Seller lists NFT
    await marketplace.listNFT(
      await nft.getAddress(),
      0,
      price
    );

    const sellerBalanceBefore =
      await token.balanceOf(seller.address);

    // Buyer purchases NFT
    await marketplace
      .connect(buyer)
      .buyNFT(0);

    const sellerBalanceAfter =
      await token.balanceOf(seller.address);

    // NFT should now belong to buyer
    assert.equal(
      await nft.ownerOf(0),
      buyer.address
    );

    // Seller should receive payment
    assert.equal(
      sellerBalanceAfter - sellerBalanceBefore,
      price
    );

    // Listing should become inactive
    const listing =
      await marketplace.getListing(0);

    assert.equal(
      listing.active,
      false
    );
  });
});
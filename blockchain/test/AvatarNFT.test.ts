import { network } from "hardhat";
import assert from "node:assert/strict";
import { describe, it } from "node:test";

describe("AvatarNFT", async function () {
  const { ethers } = await network.connect();

  it("should deploy with the correct NFT details", async function () {
    const nft = await ethers.deployContract("AvatarNFT", [
      "https://api.blocklearnx.com/achievements/",
    ]);

    await nft.waitForDeployment();

    assert.equal(await nft.name(), "BlockLearnX Achievement");
    assert.equal(await nft.symbol(), "BLXA");
  });

  it("should allow the owner to set the reward minter", async function () {
    const nft = await ethers.deployContract("AvatarNFT", [
      "https://api.blocklearnx.com/achievements/",
    ]);

    await nft.waitForDeployment();

    const [owner, rewardMinter] = await ethers.getSigners();

    await nft.setRewardMinter(rewardMinter.address);

    assert.equal(
      await nft.rewardMinter(),
      rewardMinter.address
    );

    assert.equal(
      await nft.owner(),
      owner.address
    );
  });

  it("should mint an achievement NFT to a user", async function () {
    const nft = await ethers.deployContract("AvatarNFT", [
      "https://api.blocklearnx.com/achievements/",
    ]);

    await nft.waitForDeployment();

    const [owner, user] = await ethers.getSigners();

    await nft.setRewardMinter(owner.address);

    await nft.mintAchievement(
      user.address,
      "Python Mastery"
    );

    assert.equal(
      await nft.ownerOf(0),
      user.address
    );

    assert.equal(
      await nft.tokenURI(0),
      "https://api.blocklearnx.com/achievements/0"
    );
  });
});
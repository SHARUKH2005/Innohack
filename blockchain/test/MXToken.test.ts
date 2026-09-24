import { network } from "hardhat";
import assert from "node:assert/strict";
import { describe, it } from "node:test";

describe("MXToken", async function () {
  const { ethers } = await network.connect();

  it("should deploy with the correct token details", async function () {
    const token = await ethers.deployContract("MXToken");
    await token.waitForDeployment();

    assert.equal(await token.name(), "BlockLearnX Token");
    assert.equal(await token.symbol(), "MX");

    const [owner] = await ethers.getSigners();

    const ownerBalance = await token.balanceOf(owner.address);
    const expectedSupply = 1_000_000n * 10n ** 18n;

    assert.equal(ownerBalance, expectedSupply);
    assert.equal(await token.totalSupply(), expectedSupply);
  });

  it("should allow the owner to set the reward minter", async function () {
    const token = await ethers.deployContract("MXToken");
    await token.waitForDeployment();

    const [owner, rewardMinter] = await ethers.getSigners();

    await token.setRewardMinter(rewardMinter.address);

    assert.equal(
      await token.rewardMinter(),
      rewardMinter.address
    );

    assert.equal(await token.owner(), owner.address);
  });

  it("should allow the reward minter to mint rewards", async function () {
    const token = await ethers.deployContract("MXToken");
    await token.waitForDeployment();

    const [owner, user] = await ethers.getSigners();

    await token.setRewardMinter(owner.address);

    const rewardAmount = 100n * 10n ** 18n;

    await token.mintReward(
      user.address,
      rewardAmount,
      "Course completion"
    );

    assert.equal(
      await token.balanceOf(user.address),
      rewardAmount
    );
  });
});
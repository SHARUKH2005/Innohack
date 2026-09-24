import { network } from "hardhat";
import assert from "node:assert/strict";
import { describe, it } from "node:test";

describe("CertificateNFT", async function () {
  const { ethers } = await network.connect();

  it("should deploy with the correct certificate details", async function () {
    const nft = await ethers.deployContract("CertificateNFT", [
      "https://api.blocklearnx.com/certificates/",
    ]);

    await nft.waitForDeployment();

    assert.equal(
      await nft.name(),
      "BlockLearnX Certificate"
    );

    assert.equal(
      await nft.symbol(),
      "BLXC"
    );
  });

  it("should allow the owner to set the certificate minter", async function () {
    const nft = await ethers.deployContract("CertificateNFT", [
      "https://api.blocklearnx.com/certificates/",
    ]);

    await nft.waitForDeployment();

    const [owner, certificateMinter] =
      await ethers.getSigners();

    await nft.setCertificateMinter(
      certificateMinter.address
    );

    assert.equal(
      await nft.certificateMinter(),
      certificateMinter.address
    );

    assert.equal(
      await nft.owner(),
      owner.address
    );
  });

  it("should issue a certificate NFT with a verification code", async function () {
    const nft = await ethers.deployContract("CertificateNFT", [
      "https://api.blocklearnx.com/certificates/",
    ]);

    await nft.waitForDeployment();

    const [owner, student] =
      await ethers.getSigners();

    await nft.setCertificateMinter(
      owner.address
    );

    await nft.issueCertificate(
      student.address,
      "BLX-CERT-2026-001"
    );

    assert.equal(
      await nft.ownerOf(0),
      student.address
    );

    assert.equal(
      await nft.verificationCode(0),
      "BLX-CERT-2026-001"
    );

    assert.equal(
      await nft.tokenURI(0),
      "https://api.blocklearnx.com/certificates/0"
    );
  });
});
const { expect } = require("chai");
const { ethers } = require("hardhat");

let Contract, contract;

describe("BestAnime", function () {
  beforeEach(async () => {
    Contract = await ethers.getContractFactory("BestAnimeContract");
    contract = await Contract.deploy();
    await contract.deployed();
  });

  it("Should return the best anime in the world", async function () {
    const BEST_ANIME = "Sasaki To Miyano";

    const setAnimeTx = await contract.setBestAnime(BEST_ANIME);
    await setAnimeTx.wait();

    expect(await contract.TheBestAnime()).to.equal(BEST_ANIME);
  });
});

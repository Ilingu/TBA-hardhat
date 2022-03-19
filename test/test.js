const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { parseEther, formatEther } = require("ethers/lib/utils");
const { ethers } = require("hardhat");

let Contract, contract;
let BEST_ANIME = "Sasaki To Miyano";

// formatEther(1000000000000000000n) --> wei to eth
// Accounts
let [owner, addr1, addr2 /*, addr2, ... */] = [];

describe("BestAnime", function () {
  beforeEach(async () => {
    Contract = await ethers.getContractFactory("BestAnimeContract");
    contract = await Contract.deploy(BEST_ANIME);
    await contract.deployed();
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("Should return the best anime in the world", async function () {
    // Getter
    const GetBestAnime = async () =>
      (await contract.TheBestAnime()).toString().split(",")[0];
    const GetOwnerBA = async () =>
      (await contract.OwnerOfBestAnime()).toString().split(",")[0];
    const GetLastBuyPrice = async () =>
      parseInt((await contract.LastBuyPrice()).toString());
    const GetBalance = async () =>
      parseInt((await contract.getSCBalance()).toString());

    let TheCurrentBestAnime = await GetBestAnime();
    let LastBuyPrice = await GetLastBuyPrice();
    let OwnerBA = await GetOwnerBA();
    let Balance = await GetBalance();

    // Test
    expect(LastBuyPrice).to.equal(0);
    expect(Balance).to.equal(0);
    expect(TheCurrentBestAnime).to.equal(BEST_ANIME);
    expect(OwnerBA).to.equal(owner.address);
    BEST_ANIME = "Bungo Stray Dogs";

    // Set New Price To +1 ETH
    const valToPay = BigInt(LastBuyPrice) + 1000000000000000000n;
    // Contract Initiate With Owner, So If We do the Tx With Owner --> Revert
    // .connect() change the address of the sender
    const setAnimeTx = await contract.connect(addr1).setBestAnime(BEST_ANIME, {
      value: valToPay,
    });
    await setAnimeTx.wait();

    TheCurrentBestAnime = await GetBestAnime();
    LastBuyPrice = await GetLastBuyPrice();
    OwnerBA = await GetOwnerBA();
    Balance = await GetBalance();

    expect(BigInt(LastBuyPrice)).to.equal(valToPay);
    expect(Balance).to.equal(LastBuyPrice);
    expect(TheCurrentBestAnime).to.equal(BEST_ANIME);
    expect(OwnerBA).to.equal(addr1.address);
  });

  it("Should stop the contract", async function () {
    expect(await contract.ContractState()).to.equal(0);
    expect(await contract.OwnerReqStop()).to.equal(false);

    await contract.requestReadOnly();

    let setAnimeTx = await contract.connect(addr1).setBestAnime(BEST_ANIME, {
      value: 1,
    });
    await setAnimeTx.wait();

    expect(await contract.OwnerReqStop()).to.equal(true);
    expect(await contract.ContractState()).to.equal(0);

    await contract.connect(addr1).requestReadOnly();

    expect(await contract.ContractState()).to.equal(1);

    try {
      setAnimeTx = await contract.connect(addr2).setBestAnime(BEST_ANIME, {
        value: 2,
      });
      await setAnimeTx.wait();
      expect(0).to.equal(1);
    } catch (err) {
      expect(0).to.equal(0);
    }
  });
});

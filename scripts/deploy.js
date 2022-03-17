const hre = require("hardhat");

async function main() {
  const Network = await hre.ethers.provider.getNetwork();

  const BestAnimeContract = await hre.ethers.getContractFactory(
    "BestAnimeContract"
  );

  const BestAnimeC = await BestAnimeContract.deploy("Sasaki To Miyano");
  await BestAnimeC.deployed();

  console.log(`BAContract deployed to ${Network.name}: `);
  console.log("With Address: ", BestAnimeC.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

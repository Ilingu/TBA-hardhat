const hre = require("hardhat");

async function main() {
  const BestAnimeContract = await hre.ethers.getContractFactory(
    "BestAnimeContract"
  );

  const BestAnimeC = await BestAnimeContract.deploy();
  await BestAnimeC.deployed();

  console.log("Greeter deployed to:", BestAnimeC.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

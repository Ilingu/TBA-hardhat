require("@nomiclabs/hardhat-waffle");
const NODES = require("./lib/utils");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("nodes", "prints all the project networks", () => {
  const IterableNodes = Object.keys(NODES);
  IterableNodes.forEach((NodeKey) => {
    console.log({ [NodeKey]: NODES[NodeKey].url });
  });
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    // Polygon
    polygon: NODES.POLYGON_NODE,
    mumbai: NODES.MUMBAI_NODE,
    // ETH
    ethereum: NODES.ETHEREUM_NODE,
    ropsten: NODES.ROPSTEN_NODE,
    goerli: NODES.GOERLI_NODE,
    rinkeby: NODES.RINKEBY_NODE,
    kovan: NODES.KOVAN_NODE,
    // BSC
    bsc: NODES.BSC_NODE,
    bsc_testnet: NODES.BSC_TESTNET_NODE,
    // Arbitrum
    arbitrum: NODES.ARBITRUM_NODE,
    arbitrum_rinkeby: NODES.ARBITRUM_TESTNET_NODE,
    // Avalanche
    avalanche: NODES.AVALANCHE_NODE,
    fuji: NODES.FUJI_NODE,
    // Fantom
    fantom: NODES.FANTOM_NODE,
  },
};

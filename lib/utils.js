/* ENV VAR */
const dotenv = require("dotenv");
dotenv.config();

const ACCOUNT = process.env.PRIVATE_KEY;
const MORALIS_KEY = process.env.MORALIS_KEY;

/* GENENATE NETWORK */
const GenerateNetwork = (endpoint) => ({
  url: GenerateNodeUrl(endpoint),
  accounts: [ACCOUNT],
});
const GenerateNodeUrl = (endpoint) =>
  `https://speedy-nodes-nyc.moralis.io/${MORALIS_KEY}/${endpoint}`;

exports.POLYGON_NODE = GenerateNetwork("polygon/mainnet");
exports.MUMBAI_NODE = GenerateNetwork("polygon/mumbai");

exports.ETHEREUM_NODE = GenerateNetwork("eth/mainnet");
exports.ROPSTEN_NODE = GenerateNetwork("eth/ropsten");
exports.GOERLI_NODE = GenerateNetwork("eth/goerli");
exports.RINKEBY_NODE = GenerateNetwork("eth/rinkeby");
exports.KOVAN_NODE = GenerateNetwork("eth/kovan");

exports.BSC_NODE = GenerateNetwork("bsc/mainnet");
exports.BSC_TESTNET_NODE = GenerateNetwork("bsc/testnet");

exports.ARBITRUM_NODE = GenerateNetwork("arbitrum/mainnet");
exports.ARBITRUM_TESTNET_NODE = GenerateNetwork("arbitrum/testnet");

exports.AVALANCHE_NODE = GenerateNetwork("avalanche/mainnet");
exports.FUJI_NODE = GenerateNetwork("avalanche/testnet");

exports.FANTOM_NODE = GenerateNetwork("fantom/mainnet");

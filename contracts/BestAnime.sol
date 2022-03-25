//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

/* Add Oracle (Don't Work Well Yet: For Future Version)
    - [https://docs.witnet.io/smart-contracts/apis-and-http-get-post-oracle/make-a-get-request]
    - Make A req to Jikan to see if anime exist, if not: revert
*/

/// @title TheBestAnime Contract
/// @author Ilingu (github/Ilingu)
/// @notice Contract to carve your Best Anime on the Blockchain
/// @dev - Keep Track Of The Current BestAnime, The Owner of Contract, The Owner of the current Best Anime, the last buy price of the current anime || receive and fallback function for donations || The Owner can retrieve 100% of the contract's balance || The "setBestAnime" function is to change the current anime, cannot be call by the owner and the EOA have to pay greeter than the last buy price || "TheBestAnime" function return all the information at once || Two Mode: ReadWrite/ReadOnly (Can only be change when the owner AND the ownerofcurrentBA decide it)
contract BestAnimeContract {
  address private immutable owner;

  string public BestAnime;
  address public OwnerOfBestAnime;
  uint256 public LastBuyPrice;

  bool public OwnerReqStop;

  enum State {
    ReadWrite,
    ReadOnly
  }

  State public ContractState = State.ReadWrite;

  constructor(string memory _initAnime) {
    owner = msg.sender;
    OwnerOfBestAnime = msg.sender;
    BestAnime = _initAnime;
    LastBuyPrice = 0 ether;

    OwnerReqStop = false;
  }

  receive() external payable {}

  fallback() external payable {}

  event NewBestAnime(
    string NewBestAnime,
    uint256 NewBuyPrice,
    address indexed NewOwner
  );

  modifier onlyOwners() {
    require(
      msg.sender == owner || msg.sender == OwnerOfBestAnime,
      "Not The Owner :)"
    );
    _;
  }

  modifier onlyTheOwner() {
    require(msg.sender == owner, "Not The Owner :)");
    _;
  }

  modifier NotTheOwner() {
    require(msg.sender != owner, "You're the Onwer :)");
    _;
  }

  modifier IsWritable() {
    require(ContractState == State.ReadWrite, "The Contract is ReadOnly");
    _;
  }

  function requestReadOnly() external onlyOwners {
    if (!OwnerReqStop) {
      require(msg.sender == owner);
      OwnerReqStop = true;
    } else {
      require(msg.sender == OwnerOfBestAnime && OwnerReqStop);
      ContractState = State.ReadOnly;
    }
  }

  function getSCBalance() public view returns (uint256) {
    return address(this).balance;
  }

  function transferBalance() external onlyTheOwner {
    payable(owner).transfer(getSCBalance());
  }

  function TheBestAnime()
    public
    view
    returns (
      string memory,
      uint256,
      address
    )
  {
    return (BestAnime, LastBuyPrice, OwnerOfBestAnime);
  }

  function setBestAnime(string memory _bestanime)
    external
    payable
    NotTheOwner
    IsWritable
  {
    require(msg.value > LastBuyPrice, "You have to pay above the last price");

    LastBuyPrice = msg.value;
    OwnerOfBestAnime = msg.sender;

    BestAnime = _bestanime;
    emit NewBestAnime(BestAnime, LastBuyPrice, OwnerOfBestAnime);
  }
}

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// [ADDRESS]: 0xFF738C6988155096F9D912daB32D9C9eBB120B1C

/* Add Oracle (Don't Work Well Yet: For Future Version)
    - [https://docs.witnet.io/smart-contracts/apis-and-http-get-post-oracle/make-a-get-request]
    - Make A req to Jikan to see if anime exist, if not: revert
*/

contract BestAnimeContract {
  address private owner;

  string public BestAnime;

  address public OwnerOfBestAnime;
  uint256 public LastBuyPrice;

  constructor(string memory _initAnime) {
    owner = msg.sender;
    OwnerOfBestAnime = msg.sender;
    BestAnime = _initAnime;
    LastBuyPrice = 0 ether;
  }

  receive() external payable {}

  fallback() external payable {}

  event NewBestAnime(
    string NewBestAnime,
    uint256 NewBuyPrice,
    address NewOwner
  );

  modifier onlyOwner() {
    require(msg.sender == owner, "Not The Owner :)");
    _;
  }

  modifier NotOwner() {
    require(msg.sender != owner, "You're the Onwer :)");
    _;
  }

  function getSCBalance() public view returns (uint256) {
    return address(this).balance;
  }

  function transferBalance() external onlyOwner {
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

  function setBestAnime(string memory _bestanime) external payable NotOwner {
    require(msg.value > LastBuyPrice, "You have to pay above the last price");

    LastBuyPrice = msg.value;
    OwnerOfBestAnime = msg.sender;

    BestAnime = _bestanime;
    emit NewBestAnime(BestAnime, LastBuyPrice, OwnerOfBestAnime);
  }
}

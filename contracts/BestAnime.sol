//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// [ADDRESS]: 0xFF738C6988155096F9D912daB32D9C9eBB120B1C

contract BestAnimeContract {
  address private owner;

  string public BestAnime;

  address OwnerOfBestAnime;
  uint256 LastBuyPrice;

  constructor(string memory _initAnime) {
    owner = msg.sender;
    OwnerOfBestAnime = msg.sender;
    BestAnime = _initAnime;
    LastBuyPrice = 0 ether;
  }

  receive() external payable {}

  fallback() external payable {}

  modifier onlyOwner() {
    require(msg.sender == owner, "Not The Owner :)");
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

  function setBestAnime(string memory _bestanime) external payable {
    require(msg.value > LastBuyPrice, "You have to pay above the last price");
    LastBuyPrice = msg.value;
    OwnerOfBestAnime = msg.sender;

    BestAnime = _bestanime;
  }
}

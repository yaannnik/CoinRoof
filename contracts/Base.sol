// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Base is ERC721Enumerable{
  using Counters for Counters.Counter;

  Counters.Counter private Id_counter;
  address public transaction_address;

  struct NFT {
    uint256 id;
    address creator;
    string uri;
  }

  mapping(uint256 => NFT) public Items; //id => Item

  constructor () ERC721("Base", "BASE") {}

  function Init(address address_) public {
    transaction_address = address_;
  }

  function mint(string memory uri) public returns (uint256){
    Id_counter.increment();
    uint256 nft_id = Id_counter.current();
    _safeMint(msg.sender, nft_id);
    approve(transaction_address, nft_id);

    Items[nft_id] = NFT({
      id: nft_id, 
      creator: msg.sender,
      uri: uri
    });

    return nft_id;
  }

}
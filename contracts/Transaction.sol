// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Base.sol";

contract Transaction {
  Base private token;

  struct ItemForSale {
    uint256 id;
    uint256 tokenId;
    address payable seller;
    uint256 price;
    bool isSold;
  }

  ItemForSale[] public itemsForSale;
  mapping(uint256 => bool) public activeItems;

  constructor(Base _token) {
      token = _token;
  }

  modifier RightOwner(uint256 tokenId){
    require(token.ownerOf(tokenId) == msg.sender, "Wrong Owner");
    _;
  }

  modifier TransactionApproved(uint256 tokenId){
    require(token.getApproved(tokenId) == address(this), "Transaction not approved");
    _;
  }

  modifier ItemExists(uint256 id){
    require(id < itemsForSale.length && itemsForSale[id].id == id, "Can not find item");
    _;
  }

  modifier ForSale(uint256 id){
    require(!itemsForSale[id].isSold, "Item already sold");
    _;
  }

  function sellItem(uint256 tokenId, uint256 price) 
    RightOwner(tokenId) 
    TransactionApproved(tokenId) 
    external 
    returns (uint256){
      require(!activeItems[tokenId], "Item is on sale");

      uint256 newItemId = itemsForSale.length;

      itemsForSale.push(ItemForSale({
        id: newItemId,
        tokenId: tokenId,
        seller: payable(msg.sender),
        price: price,
        isSold: false
      }));
      activeItems[tokenId] = true;

      assert(itemsForSale[newItemId].id == newItemId);
      return newItemId;
  }

  function buyItem(uint256 id) 
    ItemExists(id)
    ForSale(id)
    TransactionApproved(itemsForSale[id].tokenId)
    payable 
    external {
      require(msg.value >= itemsForSale[id].price, "No enough money");
      require(msg.sender != itemsForSale[id].seller);

      itemsForSale[id].isSold = true;
      activeItems[itemsForSale[id].tokenId] = false;
      token.safeTransferFrom(itemsForSale[id].seller, msg.sender, itemsForSale[id].tokenId);
      itemsForSale[id].seller.transfer(msg.value);
    }

  function totalItemsForSale() external view returns(uint256) {
    return itemsForSale.length;
  }
}

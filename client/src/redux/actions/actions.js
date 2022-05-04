import { UserActionTypes, ItemActionTypes } from "../constants/types";

export const selectedNft = (nft) => {
  return {
    type: ItemActionTypes.SELECTED_NFT,
    context: nft,
  };
};

export const removeSelectedNft = () => {
  return {
    type: ItemActionTypes.REMOVE_SELECTED_NFT,
  };
};

export const setNft = (nft) => {
  return {
    type: UserActionTypes.SET_NFT,
    context: nft,
  };
};

export const setAccount = (account) => {
  return {
    type: UserActionTypes.SET_ACCOUNT,
    context: account,
  };
};

export const setBaseContract = (baseContract) => {
  return {
    type: UserActionTypes.SET_BASE_COTRACT,
    context: baseContract,
  };
};

export const setTransactionContract = (marketContract) => {
  return {
    type: UserActionTypes.SET_TRANSACTION_CONTRACT,
    context: marketContract,
  };
};
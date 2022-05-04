import { UserActionTypes, ItemActionTypes } from "../constants/types";

const intialState = {
  nft: [],
  account: '',
  baseContract: null,
  transactionContract: null
};

export const userReducer = (state = intialState, { type, context }) => {
  
  switch (type) {
    case UserActionTypes.SET_NFT:
      return { ...state, nft: context };

    case UserActionTypes.SET_ACCOUNT:
      return { ...state, account: context };
    
    case UserActionTypes.SET_BASE_COTRACT:
      return { ...state, baseContract: context }; 

    case UserActionTypes.SET_TRANSACTION_CONTRACT:
      return { ...state, transactionContract: context };
    default:
      return state;
  }
};

export const itemReducer = (state = {}, { type, context }) => {
  console.log(type);
  switch (type) {
    case ItemActionTypes.SELECTED_NFT:
      return { ...state, ...context };
    case ItemActionTypes.REMOVE_SELECTED_NFT:
      return {};
    default:
      return state;
  }
};


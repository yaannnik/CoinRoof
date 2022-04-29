import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Web3 from "web3";
import getWeb3 from "../../utils/getWeb3";
import ArtToken from "../../contracts/ArtToken.json";
import ArtMarketplace from "../../contracts/ArtMarketplace.json";
import Address from "../../contracts/Address.json";

import { selectedNft, removeSelectedNft } from "../../redux/actions/nftActions";

import { useStyles } from "./styles.js";

const Item = () => {
  const classes = useStyles();

  const { nftId } = useParams();
  const marketplaceContract = useSelector(
    (state) => state.allNft.marketplaceContract
  );
  const artTokenContract = useSelector(
    (state) => state.allNft.artTokenContract
  );
  const account = useSelector((state) => state.allNft.account);
  let nft = useSelector((state) => state.nft);
  let nftItem = useSelector((state) =>
    state.allNft.nft.filter((nft) => nft.tokenId === nftId)
  );
  const {
    image,
    name,
    price,
    owner,
    creator,
    description,
    tokenId,
    saleId,
    isForSale,
    isSold,
  } = nft;
  const dispatch = useDispatch();

  useEffect(() => {
    if (nftId && nftId !== "" && nftItem) dispatch(selectedNft(nftItem[0]));
    return () => {
      dispatch(removeSelectedNft());
    };
  }, [nftId]);

  async function putForSale(id, price) {
    try {
      alert(id);
      // const itemIdex = getItemIndexBuyTokenId(id);
      let itemList = ArtMarketplace.itemsForSale
      const totalItemsForSale = await marketplaceContract.methods
            .totalItemsForSale()
            .call();
      console.log(itemList)
      if (totalItemsForSale > 0) {
        console.log(itemList)
      }
      
      console.log("1");
      // const marketAddress = ArtMarketplace.networks[1337].address;
      // console.log(marketAddress);
      console.log("2");
      const web3 = new Web3("http://localhost:8545")
      console.log("3");
      const networkId = await web3.eth.net.getId();
      const contractAddress = ArtMarketplace.networks[networkId].address;
      console.log(contractAddress);
      await artTokenContract.methods.approve(contractAddress, id).send({from: account});
      // await artTokenContract.methods.setApprovalForAll("0x1b826918842a944e06c631b714c88ed3d213fb30", id).send({from: account});
      // console.log(account);
      // let transaction = await artTokenContract.setApprovalForAll(marketAddress, true);
      // await transaction.wait();
      const receipt = await marketplaceContract.methods
        .putItemForSale(id, price)
        .send({ gas: 210000, from: account });
      console.log(receipt);
    } catch (error) {
      alert(id);
      console.error("Error, puting for sale: ", error);
      alert("Error while puting for sale!");
    }
  }

  async function buy(saleId, price, tokenId) {
    try {
      // alert(saleId); // for test
      const receipt = await marketplaceContract.methods
        .buyItem(saleId)
        .send({ gas: 210000, value: price, from: account });
      console.log(receipt);
      const id = receipt.events.itemSold.id; ///saleId
      // alert("Error while buying!");
      // console.log("1");
      // const marketAddress = ArtMarketplace.networks[1337].address;
      // console.log("2");
      // await artTokenContract.methods.setApprovalForAll(marketAddress, tokenId);
      // console.log("3");
    } catch (error) {
      console.error("Error, buying: ", error);
      alert("Error while buying!");
    }
  }

  return (
    <div className={classes.pageItem}>
      {Object.keys(nft).length === 0 ? (
        <div>Loading...</div>
      ) : (
        <main>
          <header className={classes.pageHeader}>
            <Link to="/">
              <KeyboardBackspaceIcon fontSize="large" />
            </Link>
          </header>
          <section>
            <Grid container 
              spacing={0} 
              alignItems="center"
              justify="center"
            >
              <Grid item md={7} sm={7} xs={12}>
                <figure> 
                  <img className="ui fluid image" src={image} />
                </figure>
              </Grid>
              <Grid item md={5} sm={5} xs={12}>
                <fieldset>
                  <h1>{name}</h1>
                  <TextField
                    label="creator"
                    name="creator"
                    variant="filled"
                    margin="dense"
                    fullWidth
                    disabled
                    defaultValue={
                      creator.slice(0, 7) + "..." + creator.slice(-4)
                    }
                  />
                  <TextField
                    label="owner"
                    name="owner"
                    variant="filled"
                    disabled
                    fullWidth
                    margin="dense"
                    defaultValue={owner.slice(0, 7) + "..." + owner.slice(-4)}
                  />
                  <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    label="Description"
                    name="description"
                    variant="filled"
                    margin="dense"
                    disabled
                    fullWidth
                    defaultValue={description}
                  />
                  <TextField
                    label="price"
                    name="price"
                    variant="filled"
                    margin="dense"
                    defaultValue={Web3.utils.fromWei(String(price), "ether")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">ETH</InputAdornment>
                      ),
                    }}
                    fullWidth
                    disabled
                  />
                  {owner === account && !isForSale && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => putForSale(tokenId, price)}
                    >
                      Sell
                    </Button>
                  )}

                  {owner === account && isForSale && (
                    <Button
                      variant="contained"
                      color="Success"
                    >
                      You are selling this item!
                    </Button>
                  )}

                  {owner !== account && isForSale && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => buy(saleId, price, tokenId)}
                    >
                      Buy
                    </Button>
                  )}
                </fieldset>
              </Grid>
            </Grid>
          </section>
        </main>
      )}
    </div>
  );
};

export default Item;

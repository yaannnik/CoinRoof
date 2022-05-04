import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// material ui framework
import { Link } from "react-router-dom";
import {Button, Grid, Typography} from '@material-ui/core';

import getWeb3 from "../../utils/getWeb3";
import { api } from "../../services/api";

// contracts
import Transaction from "../../contracts/Transaction.json";
import Base from "../../contracts/Base.json";

// reducers
import {
  setNft,
  setAccount,
  setTokenContract,
  setMarketContract,
} from "../../redux/actions/nftActions";

// internal components
import Card from "../../components/Card";
import StickyFooter from "../../components/StickyFooter";
import ImgList from "../../components/ImgList";

// css
import { useStyles } from "./styles.js";

const Home = () => {
  const classes = useStyles();
  const nft = useSelector((state) => state.allNft.nft);
  const dispatch = useDispatch();
  const [itemsList, setitemsList] = useState([])  // TODO: state refresh

  useEffect(() => {
    let itemsListNew = [];
    console.log("new img detected")
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();

        if (typeof accounts === undefined) {
          alert("Please login with Metamask!");
          console.log("login to metamask");
        }

        const networkId = await web3.eth.net.getId();
        try {
          const baseContract = new web3.eth.Contract(
            Base.abi,
            Base.networks[networkId].address
          );
          // console.log("Contract: ", baseContract);
          const marketplaceContract = new web3.eth.Contract(
            Transaction.abi,
            Transaction.networks[networkId].address
          );
          const totalSupply = await baseContract.methods
            .totalSupply()
            .call();
          const totalItemsForSale = await marketplaceContract.methods
            .totalItemsForSale()
            .call();
          for (var tokenId = 1; tokenId <= totalSupply; tokenId++) {
            let item = await baseContract.methods.Items(tokenId).call();
            let owner = await baseContract.methods.ownerOf(tokenId).call();
            const response = await api
              .get(`/tokens/${tokenId}`)
              .catch((err) => {
                console.log("Err: ", err);
              });
            console.log("response: ", response);

            itemsListNew.push({
              name: response.data.name,
              description: response.data.description,
              image: response.data.image,
              tokenId: item.id,
              creator: item.creator,
              owner: owner,
              uri: item.uri,
              isForSale: false,  // cannot buy items from yourself
              saleId: null,
              price: response.data.price,
              isSold: null,
            });
          }
          // alert(totalItemsForSale);
          if (totalItemsForSale > 0) {
            
            for (var saleId = 0; saleId < totalItemsForSale; saleId++) {
              let item = await marketplaceContract.methods
                .itemsForSale(saleId)
                .call();
              let active = await marketplaceContract.methods
                .activeItems(item.tokenId)
                .call();

              let itemListIndex = itemsListNew.findIndex(
                (i) => i.tokenId === item.tokenId
              );
              
              itemsListNew[itemListIndex] = {
                ...itemsListNew[itemListIndex],
                isForSale: active,
                saleId: item.id,
                price: item.price,
                isSold: item.isSold,
              };
            }
          }

          dispatch(setAccount(accounts[0]));
          dispatch(setTokenContract(baseContract));
          dispatch(setMarketContract(marketplaceContract));
          dispatch(setNft(itemsListNew));

          setitemsList(itemsListNew);
        } catch (error) {
          console.error("Error", error);
          alert(
            "Contracts not deployed to the current network " +
              networkId.toString()
          );
        }
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.` +
            error
        );
        console.error(error);
      }
    };
    init();
  }, [dispatch]);
  

  console.log("Nft :", nft);

  const nftItem = useSelector((state) => state.allNft.nft);


  return (
    <div className={classes.homepage}>
      <section className={classes.banner}>
        <Grid container spacing={0} xs={12} className={classes.gridBanner}>
          <Grid item xs={3}>
              <ImgList phase={1}/>
          </Grid>
          <Grid item xs={6} className={classes.main}>
            {/* <img src={galerie} alt="galerie" /> */}
            <h1>CoinRoof</h1>
            <Typography>A decentralized NFT marketplace where you can expose your art.
              You can buy and sell Exclusive NFTs simply with a few clicks.</Typography>
            <Typography>Own it, show it, buy it!</Typography>
            <Link to="/create-nft">
              <Button variant="contained" color="primary">
                Upload your artwork!
              </Button>
            </Link>
          </Grid>
          <Grid item xs={3}>
            <Grid container spacing={0}>
            <ImgList phase={2}/>
            </Grid>
          </Grid>
        </Grid>
      </section>
      <section className={classes.allNfts}>
        <Typography className={classes.title}> Market </Typography>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {nftItem.map((nft) => (
            <Grid item key={nft.tokenId}>
              <Card {...nft} />
            </Grid>
          ))}
        </Grid>
      </section>
      <section >
        <StickyFooter/>
      </section>
    </div>
  );
};

export default Home;

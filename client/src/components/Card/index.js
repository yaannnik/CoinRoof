import Web3 from "web3";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card as MuiCard } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import SvgIcon from "@material-ui/core/SvgIcon";
import Divider from "@material-ui/core/Divider";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";

import { useStyles } from "./styles.js";
import { ReactComponent as coin_logo } from "../../assets/lion.svg";

const Card = ({ tokenId, name, image, price, owner, isForSale }) => {
  const classes = useStyles();
  const account = useSelector((state) => state.allNft.account);
  console.log("image: ", image);
  return (
    <Link to={`/nft/${tokenId}`}>
      <MuiCard className={classes.root}>
        <CardActionArea>
          <CardContent className={classes.content}>
            <div className={classes.title}>
              <Typography
                className={"MuiTypography--heading"}
                variant={"h5"}
                gutterBottom
              >
                {name}
              </Typography>
              
            </div>
            
          </CardContent>
          <CardMedia
            component="img"
            alt={name}
            height="240"
            image={image}
            title={name}
          />
        </CardActionArea>
        <CardContent className={classes.content2}>
          <div>
          <Chip
                size="small"
                disabled={true}
                color={isForSale? "success": "primary"}
                label = {isForSale ? (owner === account ? "You are selling" : "Someone is selling") : (owner === account ? "You are owning" : "Someone is owning") }
                className={classes.badge}
              />
          </div>
        <Typography variant="h6" className={classes.price}>
              <SvgIcon
                component={coin_logo}
                viewBox="0 0 400 500"
                titleAccess="ETH"
              />
              <span>{Web3.utils.fromWei(String(price), "ether")}</span>
            </Typography>
            <Divider className={classes.divider} light />
            <Typography
              variant={"body1"}
              align={"center"}
              className={classes.seller}
            >
              {owner == account ? "You own this item" : "owner" + " " + owner.slice(0, 7) + "..." + owner.slice(-4)}
            </Typography>
        </CardContent>
      </MuiCard>
    </Link>
  );
};

export default Card;

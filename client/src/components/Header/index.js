import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
// import {PersonIcon} from '@material-ui/icons-material/Person';
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import {useStyles} from './styles.js'

import { useHistory } from "react-router-dom";
import logo from '../../assets/crown.png';

const Header = () => {
  const classes = useStyles();
  const account = useSelector((state) => state.allNft.account);
  const history = useHistory();

  const onClickImg = () => {

    history.push('/');
    history.go(0);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar color="primary" className={classes.header}>
        <Toolbar>
            <img  onClick={onClickImg} src={logo} alt="CoinRoof" className={classes.logo}/>
          <div className={classes.account}>
            <AccountBalanceWalletIcon titleAccess="Wallet Address" className={classes.walletIcon}/>
            <Typography variant="subtitle1">{account.slice(0,7)}...{account.slice(-4)}</Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};

export default Header;

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  header: {
    background: "#247dc2"
  },
  logo: {
    width: "3rem"
  },
  account: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
  },
  walletIcon: {
    marginRight: "0.4rem",
  }
});

export { useStyles };
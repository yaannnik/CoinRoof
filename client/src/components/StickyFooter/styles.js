import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    footer: {
    background: "#247dc1",
    color: "white",
    fontSize:14,

    '& Copyright': {
        fontSize:20,
    }
  },
});

export { useStyles };
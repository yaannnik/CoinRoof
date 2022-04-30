import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    footer: {
    background: "#4615b2",
    color: "white",
    fontSize:14,

    '& Copyright': {
        fontSize:20,
    }
  },
});

export { useStyles };
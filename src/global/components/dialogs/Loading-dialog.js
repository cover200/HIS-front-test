import { connect } from "react-redux";
import {
  Dialog,
  DialogContent,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "calc(100vh - 28px)",
  },
  content: {
    "justify-content": "center",
    display: "flex",
  },
}));

const LoadingDialog = ({ appState }) => {
  const classes = useStyles();

  return (
    <Dialog
      className={classes.root}
      open={!!appState.loading}
      PaperComponent="div"
      fullScreen
    >
      <DialogContent className={classes.content}>
        <Grid container direction="row" justify="center" alignItems="center">
          <CircularProgress color="secondary" size={100} thickness={4.5} />
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = ({ appState }) => ({ appState });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingDialog);

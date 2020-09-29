import { makeStyles } from "@material-ui/styles";

const styles = makeStyles((theme) => {
  return {
    container: {
      height: "-webkit-fill-available",
      alignItems: "center",
      justifyContent: "center",
    },

    cardForm: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: "auto auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    field: {
      marginBottom: theme.spacing(2),
    },

    logoContainer: {
      margin: "0",
      alignItems: "center",
      justifyContent: "center",
    },

    logo: {
      height: "50%",
      width: "50%",
      marginLeft: "auto",
      marginRight: "auto",
      display: "block",
    },

    buttonWrapper: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
    },

    feedbackWrapper: {
      width: "100%",
      textAlign: "center",
      marginBottom: theme.spacing(2),
    },
  };
});

export default styles;

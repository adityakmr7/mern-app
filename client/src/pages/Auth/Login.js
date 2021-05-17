import React from "react";
import {
  Box,
  Button,
  Container,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { AppCards } from "../../component/Cards";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
  inputField: {
    width: "100%",
  },
  centerText: {
    textAlign: "center",
  },
});
function Login(props) {
  const classes = useStyles();

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <AppCards>
          <Typography variant="h3">Login</Typography>
          <Box my={3} width="100%">
            <Box width="100%">
              <TextField
                className={classes.inputField}
                placeholder="Email"
                type="text"
                label="Email"
              />
            </Box>
            <Box>
              <TextField
                className={classes.inputField}
                placeholder="Password"
                type="password"
                label="Password"
              />
            </Box>
            <Box
              flexDirection="column"
              display="flex"
              justifyContent="center"
              py={2}
            >
              <Button>Login</Button>

              <Typography className={classes.centerText}>
                Create New Account <Link to="/register">Register</Link>
              </Typography>
            </Box>
          </Box>
        </AppCards>
      </Box>
    </Container>
  );
}

export default Login;

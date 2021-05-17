import {
  Box,
  Button,
  Container,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { AppCards } from "../../component/Cards";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
const useStyles = makeStyles({
  inputField: {
    width: "100%",
  },
  centerText: {
    textAlign: "center",
  },
});

const RegisterSchema = Yup.object({
  fullName: Yup.string()
    .min(4, "Name should be Minimum 4 character.")
    .required("field is required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password should be minimum 8 character")
    .required("Password is required"),
});
function Register(props) {
  const classes = useStyles();

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Formik
          initialValues={{ fullName: "", email: "", password: "" }}
          validationSchema={RegisterSchema}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {({ errors, touched, handleSubmit, handleChange }) => (
            <AppCards>
              <Typography variant="h3">Register</Typography>
              <Box my={3} width="100%">
                <Box>
                  <TextField
                    className={classes.inputField}
                    placeholder="Full Name"
                    type="text"
                    label="Full Name"
                  />
                </Box>
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
                  <Button>Register</Button>
                  <Typography className={classes.centerText}>
                    Create New Account <Link to="/login">Login</Link>
                  </Typography>
                </Box>
              </Box>
            </AppCards>
          )}
        </Formik>
      </Box>
    </Container>
  );
}

export default Register;

import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

import { useDispatch, useSelector } from "react-redux";
import { auth, db, storage } from "../../firebase/firebase";
import { login } from "../../features/userSlice";

import "./NewSignup.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgb(248, 248, 248)",
    padding: "20px",
    borderRadius: "10px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
  link: {
    textDecoration: "none",
  },
  buttonHide: {
    display: "none",
  },
  uploadButton: {
    display: "flex",
    border: "1px solid #c1c1c1",
    borderRadius: "5px",
    color: "RGB(114, 114, 114)",
    padding: "15px",
    transition: "all .3s",
    "&:hover": {
      backgroundImage: "linear-gradient(to right, #a18cd1 0%, #fbc2eb 100%)",
      color: "white",
    },
  },

  proLabel: {
    fontSize: "16px",
    fontWeight: "400",
    marginLeft: "5px",
  },
}));

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);

  const classes = useStyles();

  const dispatch = useDispatch();

  const getImage = (e) => {
    const selectedImage = e.target.files[0];

    console.log(selectedImage);

    const types = ["image/png", "image/jpeg"];

    if (selectedImage && types.includes(selectedImage.type)) {
      setImage(selectedImage);
    } else {
      console.log(`File not supported`);
    }
  };

  const register = async (e) => {
    e.preventDefault();
    console.log(name, email, password);
    if (!name) {
      return alert("Please Enter Full name");
    }
    auth.createUserWithEmailAndPassword(email, password).then((userAuth) => {
      console.log(userAuth);
      userAuth.user
        .updateProfile({
          displayName: name,
        })
        .then(() => {
          db.collection("users").doc(userAuth.user.uid).set({
            name,
            email,
            bio,
            uid: userAuth.user.uid,
          });
        })

        .then(() => {
          const storageRef = storage.ref();
          const imageRef = storageRef.child(image.name);

          imageRef.put(image).then(() => {
            imageRef.getDownloadURL().then((link) => {
              console.log(link);
              db.collection("users")
                .doc(userAuth.user.uid)
                .update({ profilePic: link });

              dispatch(
                login({
                  email: userAuth.user.email,
                  uid: userAuth.user.uid,
                  displayName: name,
                  bio: bio,
                  photoUrl: link,
                })
              );
            });
          });
        });
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        {/*======== FORM========== */}

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            {/* ==== NAME ====== */}
            <Grid item xs={12}>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
            </Grid>

            {/* ==== EMAIL ====== */}
            <Grid item xs={12}>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>

            {/* ==== BIO ====== */}
            <Grid item xs={12}>
              <TextField
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                variant="outlined"
                required
                fullWidth
                id="bio"
                label="One line Bio"
                name="bio"
                autoComplete="bio"
              />
            </Grid>

            {/* ==== DP ====== */}
            <Grid item xs={12}>
              <TextField
                className={classes.buttonHide}
                type="file"
                variant="outlined"
                required
                fullWidth
                id="dp"
                name="dp"
                autoComplete="dp"
                onChange={getImage}
              />
              <label className={classes.uploadButton} htmlFor="dp">
                <PhotoCameraIcon className={classes.photoIcon} />
                {!image && <p className={classes.proLabel}>Profile Picture</p>}
                {image && <p className={classes.proLabel}>{image.name}</p>}
              </label>
            </Grid>

            {/* ==== PASSWORD ====== */}
            <Grid item xs={12}>
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <Button
            onClick={register}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link className={classes.link} to="/login">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>{/* <Copyright /> */}</Box>
    </Container>
  );
}

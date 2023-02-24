import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { OutlinedInput } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import AuthContext from "../store/AuthContext";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const authCtx = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      username,
      password,
    };
    axios
      .post(register ? "/api/register" : "/api/login", body)
      .then((res) => {
        authCtx.login(res.data.token, res.data.exp, res.data.userId);
      })
      .catch((err) => alert(err.response.data));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (
    <div>
    <form className="authcontainer" onSubmit={(e) => handleSubmit(e)}>
      <TextField
        id="username"
        sx={{ m: 1, width: "35ch" }}
        label="Username"
        variant="outlined"
        onChange={(e) => setUsername(e.target.value)}
      />
      <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <div className="authbuttoncontainer">
        <Button
          variant="contained"
          onClick={(e) => handleSubmit(e)}
          style={{
            backgroundColor: "#424949",
            fontSize: "14pt",
            color: "antiquewhite",
          }}
        >
          {register ? "Register" : "Login"}
        </Button>
        <Button
          onClick={() => setRegister(!register)}
          style={{
            color: "#424949",
          }}
        >
          Need to {register ? "Login" : "Register"}?
        </Button>
      </div>
    </form>
    </div>
  );
};

export default Auth;

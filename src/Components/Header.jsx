import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AuthContext from "../store/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  return (
    <div className="header">
      <h1 className="nowGone">now gone.</h1>
      {authCtx.token ? (
        <div className="nav">
          <Button
            style={{
              color: "#424949",
            }}
            onClick={() => navigate("/addplace")}
            size="large"
          >
            Add a Place
          </Button>
          <Button
            style={{
              color: "#424949",
            }}
            onClick={() => navigate("/")}
            size="large"
          >
            Home
          </Button>
          <Button
            style={{
              color: "#424949",
            }}
            onClick={() => authCtx.logout()}
            size="large"
          >
            Logout
          </Button>
        </div>
      ) : (
        <div className="nav">
          <Button
            style={{
              color: "#424949",
            }}
            onClick={() => navigate("/")}
            size="large"
          >
            Home
          </Button>
          <Button
            style={{
              color: "#424949",
            }}
            onClick={() => navigate("/auth")}
            size="large"
          >
            Login / Register
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;

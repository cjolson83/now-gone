import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./store/AuthContext";

import Header from "./Components/Header";
import Home from "./Components/Home";
import Auth from "./Components/Auth";
import AddPlace from "./Components/AddPlace";
import PlaceDetail from "./Components/PlaceDetail";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/auth"
          element={!authCtx.token ? <Auth /> : <Navigate to="/" />}
        />
        <Route
          path="/addplace"
          element={authCtx.token ? <AddPlace /> : <Navigate to="/auth" />}
        />
        <Route exact path="/api/places/:id" element={<PlaceDetail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

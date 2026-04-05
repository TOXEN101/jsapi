import { useState, useEffect, useContext } from "react";

import {
  locationContext,
  addressContext,
} from "../contexts/location context.js";
import TextField from "@mui/material/TextField";
export default function Nav() {
  const [add, setAdd] = useContext(addressContext);

  return (
    <div className="nav-bar">
      <h1 className="page-title">Sajdah Serenity</h1>{" "}
      <div>
        <input
          type="text"
          className="location-input"
          value={add}
          onChange={(e) => {
            setAdd(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

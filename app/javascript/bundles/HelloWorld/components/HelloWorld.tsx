import PropTypes from "prop-types";
import React, { useState } from "react";
import * as style from "./HelloWorld.module.css";
import Test from "./Test";
import { Typography } from "@mui/material";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const HelloWorld = (props) => {
  const [name, setName] = useState(props.name);

  return (
    <div>
      <Typography variant="h5" component="h2" gutterBottom>
        Material-UI
      </Typography>
      <h3>Hello, {name}!</h3>
      <hr />
      <Test />
      <form>
        <label className={style.bright} htmlFor="name">
          Say hello to:
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </form>
    </div>
  );
};

HelloWorld.propTypes = {
  name: PropTypes.string.isRequired, // this is passed from the Rails view
};

export default HelloWorld;

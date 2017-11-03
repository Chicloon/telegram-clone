import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

import App from "./App";

const Root = () => {
  return (
    <AppContainer>
      <App />
    </AppContainer>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

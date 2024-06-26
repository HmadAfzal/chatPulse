import React, { useEffect, useState, useContext } from 'react';
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, extendTheme, ColorModeScript} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
const styles = {
  global: (props) => ({
    body: {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("whiteAlpha.900", "#09080A")(props),
    },
  }),
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const colors = {
  gray: {
    light: "#616161",
    dark: "#09080A",
  },
};

const theme = extendTheme({ config, styles, colors });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode> 
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    
         <App />
  
    </ChakraProvider>
  </React.StrictMode>
);
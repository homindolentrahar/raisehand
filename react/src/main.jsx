import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider, CSSReset, Box } from "@chakra-ui/react";
import Create from "./views/Create";
import Home from "./views/Home";
import Header from "./components/Header";

ReactDOM.render(
  <ChakraProvider>
    <React.StrictMode>
      <CSSReset />
      <Box p={8}>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);

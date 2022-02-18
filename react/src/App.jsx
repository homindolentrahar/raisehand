import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Header from "./components/Header";

export default function App() {
  return (
    <>
      <Flex direction="column" alignItems="center" p={8}>
        <Header />
        <Outlet />
      </Flex>
    </>
  );
}

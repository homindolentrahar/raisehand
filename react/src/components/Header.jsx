import React from "react";
import { Flex, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <>
      <Flex direction="column" alignItems="center">
        <Text fontSize="3xl" fontWeight="bold">
          raisehand
        </Text>
        <Text fontSize="sm" color="gray.400">
          Suggest topic for your lecturer to discuss together
        </Text>
      </Flex>
    </>
  );
};

export default Header;

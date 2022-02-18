import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Text, Flex, Button, SimpleGrid } from "@chakra-ui/react";
import client from "../axios";

import React from "react";
import SuggestionItem from "../components/SuggestionItem";

const Home = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const getSuggestions = async () => {
      const { data } = await client.get("suggestions");

      console.log(data);

      setSuggestions(data);
    };

    getSuggestions();
  }, [suggestions]);

  return (
    <>
      <Flex direction="column" alignItems="center">
        <Box w="2xl">
          <Flex
            justifyContent="space-between"
            justifySelf="center"
            alignItems="center"
            my={6}
          >
            <Text fontSize="sm" fontWeight="semibold">
              Your suggestions
            </Text>
            <Button fontSize="sm" colorScheme="green">
              <Link to="/create">Suggest Topic</Link>
            </Button>
          </Flex>
          <SimpleGrid columns={2} spacing={6} px={3}>
            {suggestions.map((suggestion) => (
              <SuggestionItem item={suggestion} key={suggestion.id} />
            ))}
          </SimpleGrid>
        </Box>
      </Flex>
    </>
  );
};

export default Home;

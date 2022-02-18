import React from "react";
import { Box, Button, Divider, Flex, Tag, Text } from "@chakra-ui/react";
import { FiTrendingUp } from "react-icons/fi";
import TagItem from "./TagItem";
import client from "../axios";

const SuggestionItem = ({ item }) => {
  return (
    <>
      <Box
        border="1px"
        borderColor="gray.200"
        borderRadius="lg"
        px={5}
        py={3}
        cursor="pointer"
      >
        <Box>
          <Text fontSize="lg" fontWeight="bold" color="gray.800">
            {item.title}
          </Text>
          <Text fontSize="sm" color="gray.400" isTruncated>
            {item.description}
          </Text>
        </Box>
        <Flex my={3} gap={3}>
          <Tag borderRadius={4} colorScheme={item.learningModel.color}>
            {item.learningModel.name}
          </Tag>
          <Tag borderRadius={4} colorScheme={item.track.color}>
            {item.track.name}
          </Tag>
        </Flex>
        <Divider />
        <Flex my={3} wrap="nowrap" gap={1}>
          {item.tags.map((tag) => (
            <TagItem key={tag.id} tag={tag} />
          ))}
        </Flex>
        <Flex gap={2} direction="row" alignItems="end">
          <Button
            colorScheme="green"
            w="full"
            mt={3}
            leftIcon={<FiTrendingUp />}
            gap={2}
            onClick={async () => {
              await client.post("vote", {
                id: item.id,
              });
            }}
          >
            Vote Up
          </Button>
          <Button disabled>{item.vote}</Button>
        </Flex>
      </Box>
    </>
  );
};

export default SuggestionItem;

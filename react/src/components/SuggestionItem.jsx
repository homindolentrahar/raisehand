import React from "react";
import { Box, Button, Divider, Flex, Tag, Text } from "@chakra-ui/react";
import { FiTrendingUp } from "react-icons/fi";
import { useForm } from "react-hook-form";
import TagItem from "./TagItem";
import client from "../axios";

const SuggestionItem = ({ item }) => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const handleVote = async () => {
    return client.patch("vote", {
      id: item.id,
    });
  };

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
          <form onSubmit={handleSubmit(handleVote)}>
            <Button
              colorScheme="green"
              w="full"
              mt={3}
              leftIcon={<FiTrendingUp />}
              gap={2}
              isLoading={isSubmitting}
              loadingText="Votting"
              type="submit"
            >
              Vote Up
            </Button>
          </form>
          <Button disabled>{item.vote}</Button>
        </Flex>
      </Box>
    </>
  );
};

export default SuggestionItem;

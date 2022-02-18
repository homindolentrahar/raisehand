import React from "react";
import { Tag, TagLabel } from "@chakra-ui/react";

const TagItem = ({ tag }) => {
  return (
    <>
      <Tag colorScheme={tag.color} px={3} py={1} borderRadius={4}>
        <TagLabel>{tag.name}</TagLabel>
      </Tag>
    </>
  );
};

export default TagItem;

import React from "react";
import { Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";

const ClickableTagItem = ({ tag, selected, handleClick }) => {
  return (
    <>
      <Tag
        colorScheme={tag.color}
        px={3}
        py={1}
        borderRadius={4}
        cursor="pointer"
        onClick={handleClick}
      >
        <TagLabel>{tag.name}</TagLabel>
        {selected && <TagCloseButton />}
      </Tag>
    </>
  );
};

export default ClickableTagItem;

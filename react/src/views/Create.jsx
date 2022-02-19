import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Box,
  Flex,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import client from "../axios";
import ClickableTagItem from "../components/ClickableTagItem";

const Create = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm();

  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [models, setModels] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const getTags = async () => {
      const { data } = await client.get("tags");

      setTags(data);
    };
    const getModels = async () => {
      const { data } = await client.get("models");

      setModels(data);
    };
    const getTracks = async () => {
      const { data } = await client.get("tracks");

      setTracks(data);
    };

    getTags();
    getModels();
    getTracks();
  }, []);

  useEffect(() => {
    console.log(selectedTags);
  }, [selectedTags]);

  const submit = async () => {
    return client
      .post("create", { ...getValues(), tags: selectedTags })
      .then(() => {
        reset();
        setSelectedTags([]);
        navigate(-1, {
          replace: true,
        });
      });
  };

  return (
    <>
      <Flex direction="column" alignItems="center">
        <Box boxSize="2xl" p={6} my={6}>
          <Button
            variant="ghost"
            colorScheme="blackAlpha"
            fontSize="xs"
            mb={6}
            leftIcon={<FiArrowLeft />}
            onClick={() => navigate(-1)}
          >
            All Suggestions
          </Button>
          <form onSubmit={handleSubmit(submit)} method="post">
            <Flex direction="column" gap={4}>
              <FormControl isInvalid={errors.title}>
                <FormLabel htmlFor="title" fontSize="sm" color="gray.600">
                  Suggestion
                </FormLabel>
                <Input
                  id="title"
                  name="title"
                  placeholder="Suggestion"
                  fontSize="sm"
                  {...register("title", {
                    required: "Specify what you want suggest!",
                  })}
                />
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.description}>
                <FormLabel htmlFor="description" fontSize="sm" color="gray.600">
                  Description
                </FormLabel>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe a brief about your suggession"
                  fontSize="sm"
                  {...register("description", {
                    required: "Please explain what you want suggest!",
                  })}
                />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.learningModel}>
                <Select
                  id="learningModel"
                  name="learningModel"
                  placeholder="Select Learning Model"
                  {...register("learningModel", {
                    required:
                      "Choose what learning model you want to be applied",
                  })}
                >
                  {models.map((model) => (
                    <option key={model.id} value={model.name}>
                      {model.name}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.learningModel && errors.learningModel.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.track}>
                <Select
                  id="track"
                  name="track"
                  placeholder="Select Track"
                  {...register("track", {
                    required: "Choose the topic's track",
                  })}
                >
                  {tracks.map((track) => (
                    <option key={track.id} value={track.name}>
                      {track.name}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.track && errors.track.message}
                </FormErrorMessage>
              </FormControl>
              <Flex justifyContent="center" flexWrap="wrap" gap={4}>
                {tags.map((tag) => (
                  <ClickableTagItem
                    key={tag.id}
                    tag={tag}
                    selected={selectedTags.includes(tag)}
                    handleClick={() => {
                      if (selectedTags.includes(tag)) {
                        const filteredTags = selectedTags.filter(
                          (t) => t.id !== tag.id
                        );

                        setSelectedTags(filteredTags);
                      } else {
                        setSelectedTags([...selectedTags, tag]);
                      }
                    }}
                  />
                ))}
              </Flex>
              <Button
                w="full"
                my={6}
                colorScheme="purple"
                isLoading={isSubmitting}
                loadingText="Submitting"
                type="submit"
              >
                Submit
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default Create;

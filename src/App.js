import {
  Box,
  Button,
  Center,
  HStack,
  Input,
  Spacer,
  Text,
  VStack,
  Checkbox
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

const App = () => {
  const [val, setVal] = useState(
    JSON.parse(localStorage.getItem("todos") || "[]")
  );
  console.log(val);
  const [checked, setChecked] = useState({});

  /**
   *
   * {
   *    0: false,
   *    2: true
   *    3: false
   * }
   */

  const inputRef = useRef(null);

  const addTodo = () => {
    let input = inputRef.current.value;

    setVal([...val, input]);
    inputRef.current.value = "";
  };
  const removeItem = (id) => {
    val.splice(id, 1);
    setVal([...val]);
  };
  const reset = () => {
    setVal([]);
  };
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(val));
  }, [val]);
  return (
    <Box>
      <Box
        m="0 auto"
        bgGradient={"linear(to-r ,pink.400,teal.500)"}
        maxW="md"
        p="4"
        rounded="lg"
        mt="6"
      >
        <Center>
          <Text
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontWeight="bold"
            fontSize="4xl"
          >
            ToDo App
          </Text>
        </Center>
        <HStack mt="6" px="4">
          <Box bg="gray.300" w="95px" rounded="md" cursor="pointer">
            <Center>
              <Text textColor="teal.500" fontWeight="bold" fontSize="3xl">
                Todo
              </Text>
            </Center>
          </Box>
          <Center textColor="white">
            <Input w="90%" placeholder="Enter Todo...." ref={inputRef} />
          </Center>
          <Button
            onClick={() => {
              addTodo();
            }}
          >
            Add
          </Button>
        </HStack>
        <Box mt="16" w="full">
          {val.map((v, id) => {
            return (
              <VStack
                textColor="white"
                fontWeight="semibold"
                fontSize="2xl"
                key={id}
                alignItems="flex-start"
                px="12"
              >
                <HStack spacing="8" mt="4">
                  <HStack>
                    <Checkbox
                      onChange={(e) => {
                        setChecked({ ...checked, [id]: e.target.checked });
                      }}
                    />
                    <Text
                      userSelect="none"
                      textDecorationLine={checked[id] ? "line-through" : ""}
                    >
                      {v}
                    </Text>
                  </HStack>
                  <Spacer />
                  <Button
                    colorScheme="red"
                    variant="outline"
                    onClick={() => {
                      removeItem(id);
                    }}
                  >
                    Delete
                  </Button>
                </HStack>
              </VStack>
            );
          })}
        </Box>
        <Center mt="8">
          <Button colorScheme="yellow" onClick={reset}>
            {" "}
            Reset
          </Button>
        </Center>
      </Box>
    </Box>
  );
};
export default App;

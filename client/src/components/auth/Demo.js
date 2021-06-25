import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Box,
  ButtonGroup,
  ChakraProvider,
} from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const Demo = () => {
  const initialFocusRef = React.useRef();
  return (
    <Popover
      initialFocusRef={initialFocusRef}
      placement="bottom"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button
          className="btn btn-primary"
          style={{ height: "38px", backgroundColor: "hsl(210, 10%, 23%)" }}
        >
          Demo
        </Button>
      </PopoverTrigger>

      <PopoverContent
        color="white"
        bg="hsl(210, 10%, 23%)"
        borderColor="hsl(210, 10%, 23%)"
        padding="20px"
        borderRadius="5px"
      >
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          <h4 style={{ marginBottom: "20px", fontWeight: "bold" }}>
            Demo Account Login Info:
          </h4>
        </PopoverHeader>
        <PopoverArrow />

        <PopoverBody>
          <h5>Email : demo@demo.com</h5> <h5>Password: 123456</h5>
        </PopoverBody>
        <PopoverFooter
          border="0"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          pb={4}
        >
          {/* <Box fontSize="sm">Step 2 of 4</Box> */}
          {/* <ButtonGroup size="sm">
            <Button colorScheme="green">Setup Email</Button>
            <Button colorScheme="blue" ref={initialFocusRef}>
              Next
            </Button>
          </ButtonGroup> */}
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default Demo;

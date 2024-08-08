"use client";

import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

const Footer: React.FC = () => {
  return (
    <Box
      as="footer"
      bg="blue.500"
      color="white"
      py={4}
      px={4}
      position="fixed"
      bottom={0}
      width="100%"
    >
      <Flex justifyContent="center" alignItems="center">
        <Text fontSize="sm">©︎2024 lh</Text>
      </Flex>
    </Box>
  );
};

export default Footer;

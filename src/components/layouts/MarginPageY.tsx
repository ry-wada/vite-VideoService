"use client";

import React from "react";
import { Box } from "@chakra-ui/react";

const MarginPageY: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <Box mt={14} mb={14}>
      {children}
    </Box>
  );
};

export default MarginPageY;

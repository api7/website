import { HTMLChakraProps, Box, Image } from "@chakra-ui/react";
import * as React from "react";

export const Logo = () => {
  return (
    <Box as="a" href="/">
      <Image src="/static/images/api7-logo.png" alt="Logo" width="100px" loading="lazy" />
    </Box>
  );
};

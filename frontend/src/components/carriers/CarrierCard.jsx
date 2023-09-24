import React, { forwardRef, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Spacer,
  Text,
  Tag,
  ButtonGroup,
  Button,
  Stack,
  TagLabel,
  Icon,
  useBreakpointValue,
  Tooltip
} from "@chakra-ui/react";

import NextLink from 'next/link';
import { motion } from "framer-motion";

const CarrierCard = React.forwardRef((props, ref) => {
  const { carrier } = props;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerDirection: -1
      }
    }
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
    >
      <Box bgColor="bg.surface" p={3}
        borderWidth={1} borderRadius="md"
        boxShadow="sm"
        borderColor={'brand.300'} ref={ref}>
        <Stack spacing={2}>
        </Stack>
      </Box>
    </motion.div>
  );
});

export default CarrierCard;

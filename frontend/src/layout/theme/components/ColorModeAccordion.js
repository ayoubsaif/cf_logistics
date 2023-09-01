// components/ColorModeAccordion.js
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
  useColorMode,
  Icon,
  Box,
  Menu,
  MenuItem,
  cookieStorageManagerSSR,
  localStorageManager,
} from '@chakra-ui/react';

import { RiSunFill as SunIcon } from "react-icons/ri";

const ColorModeAccordion = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLightMode = () => {
    toggleColorMode('light');
  };

  const handleDarkMode = () => {
    toggleColorMode('dark');
  };

  const handleSystemMode = () => {
    toggleColorMode('system');
  };

  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      <AccordionItem border="none">
        <AccordionButton p={4} pl={6}>
          <Icon as={SunIcon} mr={2} boxSize={5} />
          <Box flex="1" textAlign="left" alignItems="center" fontWeight="bold">
            Tema
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel p={0}>
          <Menu>
            <MenuItem onClick={handleLightMode} 
                p={4}
                pl={8}>
              <Text>Claro</Text>
            </MenuItem>
            <MenuItem onClick={handleDarkMode} 
                p={4}
                pl={8}>
              <Text>Oscuro</Text>
            </MenuItem>
          </Menu>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default ColorModeAccordion;
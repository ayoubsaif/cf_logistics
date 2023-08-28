import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
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
import { format, parseISO, formatDistanceToNow } from "date-fns";
import esLocale from "date-fns/locale/es";

import {
  RiMapPin5Line as TrackIcon,
  RiTruckLine as TruckIcon,
  RiCheckLine as CheckIcon,
  RiCloseLine as CloseIcon,
  RiFileCopyLine as CopyIcon,
} from "react-icons/ri";

import { ORDER_STATUS } from "@/utils/constants/orders";
import { getMarketplaceData } from "@/components/marketplaces/marketplacesData";

const PrintPDFButton = dynamic(() => import('@/components/button/printPDFButton'), {
  loading: () => <p>Loading...</p>,

});
import NextLink from 'next/link';

const OrderCard = ({ order }) => {
  const {
    orderNumber,
    clientName,
    street,
    orderDate,
    orderOrigin,
    customerName,
    orderStatus,
  } = order;
  const parsedDate = parseISO(orderDate);
  const formatedDate = format(parsedDate, "dd MMM yyyy", { locale: esLocale });
  const marketplaceInfo = getMarketplaceData(orderOrigin);

  const [timePassed, setTimePassed] = useState("");
  const [badgeColor, setBadgeColor] = useState("");

  const [isCopied, setIsCopied] = useState(false);

  const updateTimePassed = () => {
    const diffInHours = Math.abs(
      Math.round((new Date() - parsedDate) / (1000 * 60 * 60))
    );
    const diffInMinutes = Math.abs(
      Math.round((new Date() - parsedDate) / (1000 * 60))
    );

    if (diffInHours >= 1 && diffInHours <= 48) {
      setBadgeColor("orange");
      setTimePassed(`${diffInHours} h`);
    } else if (diffInHours > 48) {
      setBadgeColor("red");
      setTimePassed(`${diffInHours} h`);
    } else if (diffInMinutes < 60) {
      setBadgeColor("yellow");
      setTimePassed(`${diffInMinutes} m`);
    }
  };

  useEffect(() => {
    updateTimePassed();
    const interval = setInterval(() => {
      updateTimePassed();
    }, 300000); // Update every 5 min
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(orderNumber);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500); // Reset copied status after 1.5 seconds
  };

  const pdfUrl = order?.shipping?.urlLabel;

  return (
    <Box bgColor="bg.surface" p={3}
      borderWidth={1} borderRadius="md"
      boxShadow="sm"
      borderColor={orderStatus == ORDER_STATUS.open ? 'brand.300' : null}>
      <Stack spacing={2}>
        <Flex spacing={2}>
          <Flex
            flexDirection={["column", "row"]}
            alignItems={["left", "center"]}
            gap="2"
          >
            <Flex gap="2">
              {orderStatus == ORDER_STATUS.open &&
                <Tag
                  variant="solid"
                  borderRadius="full"
                  w={55}
                  colorScheme={badgeColor}
                >
                  <TagLabel textAlign="center" margin="0 auto">
                    {timePassed}
                  </TagLabel>
                </Tag>
              }
              <Box>
                <Box as="span" mr={1}>{useBreakpointValue({ md: 'Pedido', base: '#' })}</Box>
                <Tooltip hasArrow label='Copiar nº pedido' borderRadius="md">
                  <Box as="span"
                    onClick={copyToClipboard}
                    _hover={{ cursor: "pointer" }}
                    transition="all .1s ease-in"
                    color={isCopied ? "green.400" : "brand"}
                  >
                    {isCopied ? 'Copiado' : orderNumber}
                  </Box>
                </Tooltip>
              </Box>
            </Flex>

            <Tooltip label={orderDate} bg="bg.muted" color="fg.muted" borderRadius="md">
              <Text fontSize="sm">{formatedDate}</Text> 
            </Tooltip>
          </Flex>
          <Spacer />
          <Tag colorScheme={marketplaceInfo?.color ? marketplaceInfo.color : "brand"} height="fit-content"
            borderRadius="full">
            {marketplaceInfo?.icon &&
              <Icon
                as={...marketplaceInfo?.icon}
                size="xs"
                mr={1}
              />
            }
            <TagLabel>
              {marketplaceInfo?.label}
            </TagLabel>
          </Tag>
        </Flex>
        <Flex
          justifyContent="space-between"
          flexDirection={{ base: "column", md: "row" }}
        >
          <Box>
            <Text>{clientName}</Text>
            <Text>{customerName}</Text>
          </Box>
          <Box mt={2}>
            {orderStatus == ORDER_STATUS.open ? (
              <ButtonGroup
                variant="outline"
                isAttached
                spacing="2"
                size={"sm"}
                width={{ base: "full", md: "auto" }}
              >
                <Button colorScheme="green" leftIcon={<CheckIcon size={18} />}
                  width={{ base: "full", md: "auto" }}>Confirmar</Button>
                <Button colorScheme="brand" leftIcon={<CloseIcon size={18} />}
                  width={{ base: "full", md: "auto" }}>Cancelar</Button>
              </ButtonGroup>
            ) : (
              <ButtonGroup variant="outline" spacing="1" size={"sm"}>
                <PrintPDFButton pdfUrl={pdfUrl} leftIcon={<TruckIcon size={18} />}>Etiqueta de envío</PrintPDFButton>
                <NextLink href={order?.shipping?.trackingUrl} target="_blank">
                  <Button isExternal leftIcon={<TrackIcon size={18} target="_blank"/>}>Seguimiento</Button>
                </NextLink>
              </ButtonGroup>
            )}
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
};

export default OrderCard;

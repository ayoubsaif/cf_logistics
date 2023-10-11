import { forwardRef, useEffect, useState } from "react";
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
  Tooltip,
  Highlight,
  Link
} from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import esLocale from "date-fns/locale/es";

import {
  RiPrinterFill as PrinterIcon,
  RiCheckLine as CheckIcon,
  RiCloseLine as CloseIcon,
  RiExternalLinkLine as ExternalLinkIcon
} from "react-icons/ri";

import { ORDER_STATUS } from "@/utils/constants/orders";
import { getMarketplaceData } from "@/components/marketplaces/marketplacesData";

const PrintPDFButton = dynamic(() => import('@/components/button/printPDFButton'), {
  loading: () => <p>Loading...</p>,
});

import NextLink from 'next/link';
import { motion } from "framer-motion";

const OrderCard = forwardRef(({ order, filter }, ref) => {
  const {
    orderNumber,
    orderDate,
    orderOrigin,
    customerName,
    orderStatus,
    state,
    postalCode
  } = order;
  const parsedDate = parseISO(orderDate);
  const formatedDate = format(parsedDate, "dd MMM yyyy", { locale: esLocale });
  const formatedDateTime = format(parsedDate, "dd MMM yyyy HH:mm", { locale: esLocale });
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
    }, 2000); // Reset copied status after 1.5 seconds
  };

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
        borderColor={orderStatus == ORDER_STATUS.open ? 'brand.300' : null} ref={ref}>
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
                    w="object-fit"
                    colorScheme={badgeColor}
                  >
                    <TagLabel textAlign="center" margin="0 auto">
                      {timePassed}
                    </TagLabel>
                  </Tag>
                }
                <Box>
                  <Box as="span" mr={1}>{useBreakpointValue({ md: 'Pedido', base: '#' })}</Box>
                  <Tooltip hasArrow closeOnClick={false}
                    label={isCopied ? '✓ Copiado' : 'Copiar'}
                    borderRadius="md"
                    bg={isCopied ? 'bg.success' : null}>
                    <Text onClick={copyToClipboard} fontSize="sm" fontWeight="bold" color="brand" display="inline-block" mr={1}
                      _hover={{ cursor: "pointer" }}
                      transition="all .1s ease-in">
                      <Highlight as="span" query={filter} styles={{ px: 1, bg: 'yellow.200', bgOpacity: '0.2' }}
                        color={isCopied ? "green.400" : "brand"}>
                        {orderNumber}
                      </Highlight>
                    </Text>
                  </Tooltip>
                </Box>
              </Flex>

              <Tooltip label={formatedDateTime} borderRadius="md">
                <Text fontSize="sm">{formatedDate}</Text>
              </Tooltip>
            </Flex>
            <Spacer />
            <Tag colorScheme={marketplaceInfo?.color ? marketplaceInfo.color : "brand"} height="fit-content"
              borderRadius="full">
              {marketplaceInfo?.icon &&
                <Icon
                  as={...marketplaceInfo?.icon}
                  mr={1}
                />
              }
              <TagLabel>
                {marketplaceInfo?.label}
              </TagLabel>
            </Tag>
          </Flex>
          <Flex justifyContent="space-between" flexDirection={{ base: "column", md: "row" }}>
            {order && order.shippingUrl &&
              <Text fontSize="sm" fontWeight="bold" color="fg.accent">
                <Link as={NextLink} href={order.shippingUrl} target="_blank" _hover={{color:"brand.500"}}>
                  <Flex gap={1} alignItems="center"><ExternalLinkIcon size={12} />{order.shippingNumber}</Flex>
                </Link>
              </Text>
            }
          </Flex>
          <Flex
            justifyContent="space-between"
            flexDirection={{ base: "column", md: "row" }}
          >
            <Box color="fg.emphasized">
              <Highlight
                query={filter}
                styles={{ px: 0.5, bg: 'yellow.200', bgOpacity: '0.2' }}
                fontSize="xs"
              >
                {customerName}
              </Highlight>
              <Text fontSize='xs'>{state} {postalCode}</Text>
            </Box>
            {orderStatus == ORDER_STATUS.open ? (
              <Box mt={2}>
                <ButtonGroup
                  isAttached
                  spacing="2"
                  size="sm"
                  width={{ base: "full", md: "auto" }}
                >
                  <Button colorScheme="green" leftIcon={<CheckIcon size={18} />}
                    width={{ base: "full", md: "auto" }}>Confirmar</Button>
                  <Button variant="outline" colorScheme="brand" leftIcon={<CloseIcon size={18} />}
                    width={{ base: "full", md: "auto" }}>Cancelar</Button>
                </ButtonGroup>
              </Box>
            ) : orderStatus === ORDER_STATUS.done || orderStatus === ORDER_STATUS.picking &&
              <Flex mt={2} gap={1}>
                  <PrintPDFButton size="sm" variant="outline" colorScheme="black" order={order} leftIcon={<PrinterIcon size={18} />}>Etiqueta de envío</PrintPDFButton>
                  <Button size="sm" variant="outline" colorScheme="cyan" leftIcon={<CheckIcon size={18} />}>Completado</Button>
              </Flex>
            }
          </Flex>
        </Stack>
      </Box>
    </motion.div>
  );
});

export default OrderCard;

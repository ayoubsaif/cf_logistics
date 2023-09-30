import { CorreosIcon, DHLIcon, GLSIcon, CorreosExpressIcon } from "@/components/icons/carrierIcons";
  
  const carriersData = {
    CORREOS_ES: {
      id: "CORREOS_ES",
      label: "Correos",
      color: "yellow",
      icon: CorreosIcon
    },
    GLS: {
      id: "GLS",
      label: "GLS",
      color: "red",
      icon: GLSIcon
    },
    DHL: {
      id: "DHL",
      label: "DHL",
      color: "blue",
      icon: DHLIcon
    },
    CORREOS_EXPRESS: {
      label: "Correos Express",
      color: "yellow",
      icon: CorreosExpressIcon
    }
  }
  
  export function getCarrierLogo(origin) {
    const carrierLogo = carriersData[origin];
    if (carrierLogo) {
      return carrierLogo;
    }
    return {
      label: origin,
      color: "gray",
      icon: null
    };
  }
  
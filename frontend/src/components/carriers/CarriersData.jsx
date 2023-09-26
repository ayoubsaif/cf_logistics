import { CorreosIcon, DHLIcon, GLSIcon, CorreosExpressIcon } from "@/components/icons/carrierIcons";
  
  const carriersData = {
    correos: {
      label: "Correos",
      color: "yellow",
      icon: CorreosIcon
    },
    gls: {
      label: "GLS",
      color: "red",
      icon: GLSIcon
    },
    dhl: {
      label: "DHL",
      color: "blue",
      icon: DHLIcon
    },
    correosExpress: {
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
  
import { CorreosIcon } from "@/components/icons/carrierIcons";
  
  const carriersData = {
    correos: {
      label: "Correos",
      color: "yellow",
      icon: CorreosIcon
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
  
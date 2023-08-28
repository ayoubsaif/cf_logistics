import {AmazonIcon, HipercalzadoIcon, ZalandoIcon, MiintoIcon, MiraviaIcon} from "@/components/icons/marketIcons";

const marketplaceData = {
  zalando: {
    label: "Zalando",
    color: "orange",
    icon: ZalandoIcon
  },
  amazon: {
    label: "Amazon",
    color: "cyan",
    icon: AmazonIcon
  },
  miinto: {
    label: "Miinto.",
    color: "pink",
    icon: MiintoIcon
  },
  miravia: {
    label: "Miravia",
    color: "purple",
    icon: MiraviaIcon
  },
  hipercalzado: {
    label: "Hipercalzado",
    color: "twitter",
    icon: HipercalzadoIcon
  }
}

export function getMarketplaceData(origin) {
  const marketplace = marketplaceData[origin];
  if (marketplace) {
    return marketplace;
  }
  return false;
}

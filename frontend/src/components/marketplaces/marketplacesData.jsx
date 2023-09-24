import { AmazonIcon,
  HipercalzadoIcon,
  ZalandoIcon,
  MiintoIcon,
  MiraviaIcon,
  ColizeyIcon,
  CarrefourIcon,
  SpartooIcon,
  DecathlonIcon,
  AliexpressIcon,
  ElCorteInglesIcon,
  PCComponentesIcon
} from "@/components/icons/marketIcons";

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
  },
  colizey: {
    label: "Colizey",
    color: "blue",
    icon: ColizeyIcon
  },
  carrefour: {
    label: "Carrefour",
    color: "blue",
    icon: CarrefourIcon
  },
  spartoo: {
    label: "Spartoo",
    color: "pink",
    icon: SpartooIcon
  },
  decathlon: {
    label: "Decathlon",
    color: "twitter",
    icon: DecathlonIcon
  },
  aliexpress: {
    label: "Aliexpress",
    color: "orange",
    icon: AliexpressIcon
  },
  elcorteingles: {
    label: "El Corte Inglés",
    color: "green",
    icon: ElCorteInglesIcon
  },
  pccomponentes: {
    label: "PC Componentes",
    color: "orange",
    icon: PCComponentesIcon
  },
}

export function getMarketplaceData(origin) {
  const marketplace = marketplaceData[origin];
  if (marketplace) {
    return marketplace;
  }
  return {
    label: origin,
    color: "gray",
    icon: null
  };
}

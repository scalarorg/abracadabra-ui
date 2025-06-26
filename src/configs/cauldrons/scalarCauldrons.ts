import poolsAbi from "@/abis/borrowPoolsAbi/index";
import tokensAbi from "@/abis/tokensAbi/index";
import { useImage } from "@/helpers/useImage";

import type { CauldronConfig } from "@/configs/cauldrons/configTypes";
const mimInfo = {
  name: "sUSD",
  icon: useImage(`assets/images/tokens/MIM.png`),
  decimals: 18,
  address: "0xB5065Df90c390a7c5318f822b0Fa96Cde2f33051",
  abi: tokensAbi.sUSD,
};

const config: Array<CauldronConfig> = [
  {
    icon: useImage(`assets/images/tokens/WBTC.png`),
    name: "sBTC",
    chainId: 11155111,
    id: 1,
    liquidationFee: 6,
    mcr: 80,
    borrowFee: 0.5,
    version: 4,
    cauldronSettings: {
      isNew: true,
      is0xSwap: false,
      isSwappersActive: false,
      isDegenBox: true,
      strategyLink: false,
      isDepreciated: false,
      acceptUseDefaultBalance: true,
      healthMultiplier: 1,
      hasAccountBorrowLimit: false,
      hasWithdrawableLimit: false,
      localBorrowAmountLimit: false,
      hasCrvClaimLogic: false,
      isTesting: false,
    },
    contract: {
      name: "CauldronV4",
      address: "0x1e18a44a86c79bEB9153B2A6566f6c4D05D48f12",
      abi: poolsAbi.ScalarCauldronV4,
    },
    collateralInfo: {
      name: "sBTC",
      decimals: 18,
      address: "0xa32e5903815476Aff6E784F5644b1E0e3eE2081B",
      abi: tokensAbi.sBTC,
    },
    mimInfo,
  },
];


export default config;

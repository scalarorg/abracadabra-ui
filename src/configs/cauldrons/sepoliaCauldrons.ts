import { useImage } from "@/helpers/useImage";
import sUSD from "@/abis/tokensAbi/sUSD";
import cauldronV4 from "@/abis/borrowPoolsAbi/CauldronV4";
import sBTC from "@/abis/tokensAbi/sBTC";

import type { CauldronConfig } from "@/configs/cauldrons/configTypes";

import sepoliaConfig from "@/configs/chain/sepolia";

const mimInfo = {
    name: "sUSD",
    icon: useImage(`assets/images/tokens/MIM.png`),
    decimals: 18,
    address: sepoliaConfig.stablecoin,
    abi: sUSD,
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
            address: sepoliaConfig.market,
            abi: cauldronV4,
        },
        collateralInfo: {
            name: "sBTC",
            decimals: 18,
            address: sepoliaConfig.erc20,
            abi: sBTC,
        },
        mimInfo,
    },
];

export default config;
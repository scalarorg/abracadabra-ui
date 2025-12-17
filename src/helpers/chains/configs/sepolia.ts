import { sepolia } from "@wagmi/core/chains";
import { useImage } from "@/helpers/useImage";
import { filterRpcUrls } from "@/helpers/chains/utils";
import { initPublicClient } from "@/helpers/chains/initPublicClient";
import { initStaticJsonRpcProvider } from "@/helpers/connect/initStaticJsonRpcProvider";

const rpcList = filterRpcUrls([
    "https://eth-sepolia.g.alchemy.com/v2/nNbspp-yjKP9GtAcdKi8xcLnBTptR2Zx",
]);

const viemConfig = {
    ...sepolia,
    rpcUrls: {
        public: {
            http: rpcList,
        },
        default: {
            http: rpcList,
        },
    },
};

const publicClient = initPublicClient(viemConfig);

export const sepoliaConfig = {
    viemConfig,
    publicClient,
    chainId: sepolia.id,
    chainName: "Sepolia",
    symbol: "ETH",
    icon: useImage("assets/images/networks/sepolia.png"),
    baseTokenIcon: useImage("assets/images/tokens/ETH.png"),
    baseTokenSymbol: "ETH",
    networkIcon: useImage(`assets/images/networks/sepolia.png`),
    lzChainId: 161,
};

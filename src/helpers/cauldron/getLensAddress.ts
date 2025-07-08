import type { Address } from "viem";
import sepoliaConfig from "@/configs/chain/sepolia";

export const getLensAddress = (chainId: Number): Address => {
  // check type
  switch (Number(chainId)) {
    case 80084:
      return "0x1E217d3cA2a19f2cB0F9f12a65b40f335286758E";
    case 11155111:
      return sepoliaConfig.lens;
    default:
      return "0x1d17009Dde57CAea3dC614962a6c01420776523f";
  }
};

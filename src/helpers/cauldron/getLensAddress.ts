import type { Address } from "viem";

export const getLensAddress = (chainId: Number): Address => {
  // check type
  switch (Number(chainId)) {
    case 80084:
      return "0x1E217d3cA2a19f2cB0F9f12a65b40f335286758E";
    case 11155111:
      return "0xd54C1e02D4Fe4D060A4Cb67EC83166FE689A076F";
    default:
      return "0x1d17009Dde57CAea3dC614962a6c01420776523f";
  }
};

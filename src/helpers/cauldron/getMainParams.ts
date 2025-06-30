import { BigNumber } from "ethers";
import type { Address } from "viem";
import lensAbi from "@/abis/marketLens";
import type { MainParams } from "@/helpers/cauldron/types";
import { getPublicClient } from "@/helpers/chains/getChainsInfo";
import { getLensAddress } from "@/helpers/cauldron/getLensAddress";
import type { CauldronConfig } from "@/configs/cauldrons/configTypes";


interface MarketInfoResponse {
  result: {
    cauldron: Address,
    borrowFee: bigint,
    maximumCollateralRatio: bigint,
    liquidationFee: bigint,
    interestPerYear: bigint,
    marketMaxBorrow: bigint,
    userMaxBorrow: bigint,
    totalBorrow: {
      part: bigint,
      amount: bigint,
    },
    oracleExchangeRate: bigint,
    collateralPrice: bigint,
    totalCollateral: {
      token: Address,
      amount: bigint,
      share: bigint,
      value: bigint,
    },
  };
  status: string;
}

interface CauldronContractConfig {
  name: string;
  address: string;
  abi: any;
}

export const getMainParams = async (
  configs: Array<CauldronConfig>,
  chainId: number,
  cauldron?: CauldronContractConfig | undefined
): Promise<Array<MainParams>> => {
  const lensAddress = getLensAddress(chainId);
  const publicClient = getPublicClient(chainId);
  const contracts = configs.map((config: any) => {
    const methodName =
      config.version === 2
        ? "getMarketInfoCauldronV2"
        : "getMarketInfoCauldronV3";

    return {
      address: lensAddress,
      abi: lensAbi,
      functionName: methodName,
      args: [config.contract.address],
    };
  });
  const marketInfo: MarketInfoResponse[] = await publicClient.multicall({
    contracts,
  });

  const contractExchangeRate: bigint | null = cauldron
    ? await publicClient.readContract({
      ...cauldron,
      functionName: "exchangeRate",
    })
    : null;

  const result = marketInfo
    //.filter(({ status }: MarketInfoResponse) => status === "success")
    .map(({ result, status }: MarketInfoResponse, index: number) => {
      // console.log(`📈 Processing result for index ${index}:`, status);
      //TODO: remove constant market info

      if (status === "failure") {
        result = {
          borrowFee: BigInt(0),
          cauldron: "0x0000000000000000000000000000000000000000" as Address,
          collateralPrice: BigInt(0),
          interestPerYear: BigInt(0),
          liquidationFee: BigInt(0),
          marketMaxBorrow: BigInt(0),
          maximumCollateralRatio: BigInt(0),
          oracleExchangeRate: BigInt(0),
          totalBorrow: {
            part: BigInt(0),
            amount: BigInt(0),
          },
          totalCollateral: {
            token: "0x0000000000000000000000000000000000000000" as Address,
            amount: BigInt(0),
            share: BigInt(0),
            value: BigInt(0),
          },
          userMaxBorrow: BigInt(0),
        };
      }

      const localInterest: number | undefined = configs[index].interest;
      // console.log("localInterest", localInterest);
      const updatePrice = contractExchangeRate
        ? !BigNumber.from(contractExchangeRate).eq(result.oracleExchangeRate)
        : false;

      const interest = localInterest
        ? localInterest
        : Number(result.interestPerYear) / 100;

      const processedResult = {
        borrowFee: Number(result.borrowFee) / 100,
        interest,
        liquidationFee: Number(result.liquidationFee) / 100,
        collateralPrice: BigNumber.from(result.collateralPrice),
        mimLeftToBorrow: BigNumber.from(result.marketMaxBorrow),
        maximumCollateralRatio: BigNumber.from(result.maximumCollateralRatio),
        oracleExchangeRate: BigNumber.from(result.oracleExchangeRate),
        totalBorrowed: BigNumber.from(result.totalBorrow.amount),
        tvl: BigNumber.from(result.totalCollateral.value),
        userMaxBorrow: BigNumber.from(result.userMaxBorrow),
        updatePrice,
        alternativeData: {
          collateralPrice: result.collateralPrice,
          mimLeftToBorrow: result.marketMaxBorrow,
          maximumCollateralRatio: result.maximumCollateralRatio,
          oracleExchangeRate: result.oracleExchangeRate,
          totalBorrowed: result.totalBorrow.amount,
          tvl: result.totalCollateral.value,
          userMaxBorrow: result.userMaxBorrow,
        },
      };

      return processedResult;
    });

  return result;
};

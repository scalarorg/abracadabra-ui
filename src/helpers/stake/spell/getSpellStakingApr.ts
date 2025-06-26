import axios from "axios";

export const getSpellStakingApr = async (): Promise<{
  sSpellApr: string;
  mSpellApr: string;
}> => {
  try {
    let result = {
      sSpellApr: "0",
      mSpellApr: "0",
    };
    if (import.meta.env.VITE_APP_SPELL_APR_URL) {
      const response = await axios.get(import.meta.env.VITE_APP_SPELL_APR_URL);
      result.sSpellApr = response.data.apr;
      result.mSpellApr = response.data.apr;
    }
    return result;
  } catch (error) {
    console.log("Get Spell Staking Apr Error:", error);
    return {
      sSpellApr: "N/A",
      mSpellApr: "N/A",
    };
  }
};

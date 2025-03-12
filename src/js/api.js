const API_BASE_URL = "https://cardano-mainnet.blockfrost.io/api/v0";
const API_KEY = "mainnetRUrPjKhpsagz4aKOCbvfTPHsF0SmwhLc";

export async function getWalletInfo(address) {
  try {
    const response = await fetch(`${API_BASE_URL}/addresses/${address}/total`, {
      headers: { project_id: API_KEY },
    });
    const data = await response.json();

    console.log("API Response:", data);
    return data;
  } catch (error) {
    console.error("Error fetching wallet info:", error);
    return null;
  }
}

export async function getAssets() {
  try {
    const response = await fetch(`${API_BASE_URL}/assets`, {
      headers: { project_id: API_KEY },
    });
    const data = await response.json();

    console.log("Assets API Response:", data);
    return data;
  } catch (error) {
    console.error("Error fetching assets:", error);
    return [];
  }
}

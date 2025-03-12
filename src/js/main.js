import { getWalletInfo } from "./api.js";

// Checking event binding
document.getElementById("fetchData").addEventListener("click", async () => {
  const walletInput = document.getElementById("walletAddress");
  const walletAddress = walletInput ? walletInput.value : null;
  const resultContainer = document.getElementById("result");

  if (!walletAddress) {
    resultContainer.innerHTML = "<p>Please enter a wallet address.</p>";
    return;
  }

  try {
    const walletData = await getWalletInfo(walletAddress);

    // Debug output
    console.log("Wallet Data:", walletData);

    if (walletData && walletData.controlled_amount) {
      const controlledAmounts = walletData.controlled_amount;
      let output = "";

      if (Array.isArray(controlledAmounts) && controlledAmounts.length > 0) {
        controlledAmounts.forEach((item) => {
          // If unit === "lovelace", convert to ADA
          if (item.unit === "lovelace") {
            const ada = (parseInt(item.quantity, 10) / 1000000).toFixed(2);
            output += `<p><strong>ADA:</strong> ${ada} ADA</p>`;
          } else {
            output += `<p><strong>${item.unit}:</strong> ${item.quantity}</p>`;
          }
        });
      } else {
        output = "<p>No data available.</p>";
      }

      resultContainer.innerHTML = `
        <h2>Controlled Amount:</h2>
        ${output}
        <p><strong>Address:</strong> ${walletAddress}</p>
      `;
    } else {
      resultContainer.innerHTML =
        "<p>Error fetching data. Data might be incomplete.</p>";
    }
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    resultContainer.innerHTML =
      "<p>An error occurred. Please check the console for details.</p>";
  }
});

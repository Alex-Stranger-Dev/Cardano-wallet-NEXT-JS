import { useState } from "react";
import { getWalletInfo, getAssets } from "../js/api";

export default function MainPage() {
  const [walletAddress, setWalletAddress] = useState("");
  const [walletData, setWalletData] = useState(null);
  const [assetsData, setAssetsData] = useState([]);
  const [showNFT, setShowNFT] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isViewingReceived, setIsViewingReceived] = useState(true);

  // Function to calculate the current data slice (fixed at 3 cards)
  const getPaginatedData = (data, currentPage) => {
    const pageSize = 3;
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  };

  // Function to calculate the total number of pages
  const getTotalPages = (dataLength) => {
    return Math.ceil(dataLength / 3);
  };

  // Fetch wallet data by address
  const fetchData = async () => {
    if (!walletAddress) {
      alert("Please enter wallet address.");
      return;
    }
    try {
      const data = await getWalletInfo(walletAddress);
      setWalletData(data);
      setAssetsData([]);
      setShowNFT(false);
      setCurrentPage(1);
      setIsViewingReceived(true);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  // Fetch NFT assets data
  const fetchAssets = async () => {
    try {
      const data = await getAssets();
      setAssetsData(data);
      setWalletData(null);
      setShowNFT(true);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error loading assets:", error);
    }
  };

  // Function to render cards
  const renderCards = (data) => (
    <div>
      {data.map((item, index) => (
        <div key={index} style={styles.card}>
          <p style={styles.text}>
            <strong>{showNFT ? "Asset:" : "Unit:"}</strong>{" "}
            {item.asset || item.unit || "Unknown"}
          </p>
          <p style={styles.text}>
            <strong>Quantity:</strong> {item.quantity || "N/A"}
          </p>
        </div>
      ))}
    </div>
  );

  // Function to render pagination buttons (arrows)
  const renderPagination = (data, currentPage, setCurrentPage) => {
    const totalPages = getTotalPages(data.length);
    if (totalPages <= 1) return null;

    return (
      <div style={styles.pagination}>
        <button
          style={{
            ...styles.pageButton,
            backgroundColor: "#FD6F4D",
            color: "#FFFFFF",
          }}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ❮
        </button>
        <span style={styles.pageInfo}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          style={{
            ...styles.pageButton,
            backgroundColor: "#FD6F4D",
            color: "#FFFFFF",
          }}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          ❯
        </button>
      </div>
    );
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <h1 style={styles.headerTitle}>Cardano Wallet Info</h1>

        <div style={styles.inputRow}>
          <input
            type="text"
            placeholder="Enter wallet address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            style={styles.input}
          />
          <button
            onClick={fetchData}
            style={styles.fetchButton}
            className="fetchButton"
          >
            Fetch Data
          </button>
        </div>

        <div style={styles.buttonContainer}>
          <button
            onClick={fetchAssets}
            style={styles.nftButton}
            className="nftButton"
          >
            Assets NFT
          </button>
        </div>

        {walletData && !showNFT && (
          <div style={styles.results}>
            <h2 style={styles.sectionTitle}>Transaction Details:</h2>
            <p style={styles.text}>
              <strong>Address:</strong> {walletData.address}
            </p>
            <p style={styles.text}>
              <strong>Transaction Count:</strong> {walletData.tx_count}
            </p>

            {isViewingReceived ? (
              <>
                <h3 style={styles.sectionTitle}>Received Funds:</h3>
                {renderCards(
                  getPaginatedData(walletData.received_sum, currentPage)
                )}
                {renderPagination(
                  walletData.received_sum,
                  currentPage,
                  setCurrentPage
                )}
                <button
                  style={styles.toggleButton}
                  className="toggleButton"
                  onClick={() => {
                    setIsViewingReceived(false);
                    setCurrentPage(1);
                  }}
                >
                  View Sent Funds
                </button>
              </>
            ) : (
              <>
                <h3 style={styles.sectionTitle}>Sent Funds:</h3>
                {renderCards(
                  getPaginatedData(walletData.sent_sum, currentPage)
                )}
                {renderPagination(
                  walletData.sent_sum,
                  currentPage,
                  setCurrentPage
                )}
                <button
                  style={{ ...styles.toggleButton, marginTop: "1rem" }}
                  className="toggleButton"
                  onClick={() => {
                    setIsViewingReceived(true);
                    setCurrentPage(1);
                  }}
                >
                  View Received Funds
                </button>
              </>
            )}
          </div>
        )}

        {assetsData.length > 0 && showNFT && (
          <div style={styles.results}>
            <h2 style={styles.sectionTitle}>NFT Assets:</h2>
            {renderCards(getPaginatedData(assetsData, currentPage))}
            {renderPagination(assetsData, currentPage, setCurrentPage)}
          </div>
        )}
      </div>
      <style jsx global>{`
        .fetchButton:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px #ad4227; // Thicker shadow on hover
        }
        .nftButton:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(255, 255, 255, 0.5); // Thicker white shadow on hover
        }
        .toggleButton:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px #ad4227; // Thicker shadow on hover
        }
      `}</style>
    </div>
  );
}

const styles = {
  pageContainer: {
    backgroundColor: "#13294A",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
    paddingTop: "1rem",
  },
  container: {
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
    width: "70%",
    backgroundColor: "#13294A",
    borderRadius: "0.625rem",
    boxShadow: "none",
    border: "none",
  },
  inputRow: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "1rem",
    width: "100%",
    gap: "1rem",
  },
  input: {
    flex: 1,
    padding: "0.625rem",
    border: "1px solid #FFFFFF",
    borderRadius: "0.3125rem",
    height: "2.625rem",
    backgroundColor: "#13294A",
    color: "#8C95A6",
  },
  fetchButton: {
    padding: "0.625rem 1.25rem",
    backgroundColor: "#FD6F4D",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "1rem",
    cursor: "pointer",
    height: "2.625rem",
    boxShadow: "0 8px 18px #AD4227",
    transition: "transform 0.3s ease, box-shadow 0.3s ease", // Added shadow transition
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    marginTop: "0.5rem",
  },
  nftButton: {
    padding: "0.625rem 1.25rem",
    backgroundColor: "#13294A",
    color: "#FFFFFF",
    border: "2px solid #FFFFFF",
    borderRadius: "1rem",
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(255, 255, 255, 0.3)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease", // Added shadow transition
  },
  results: {
    marginTop: "1.25rem",
  },
  sectionTitle: {
    borderBottom: "1px solid #FFFFFF",
    paddingBottom: "0.3125rem",
    marginBottom: "0.625rem",
    color: "#FFFFFF",
  },
  card: {
    padding: "0.625rem",
    backgroundColor: "#13294A",
    borderRadius: "0.3125rem",
    border: "1px solid #FFFFFF",
    boxShadow: "none",
    wordWrap: "break-word",
    overflowWrap: "break-word",
  },
  text: {
    marginBottom: "0.3125rem",
    wordWrap: "break-word",
    overflowWrap: "break-word",
    color: "#FFFFFF",
  },
  headerTitle: {
    fontFamily: "'PolySans', 'Helvetica', sans-serif",
    fontSize: "2.5rem",
    textAlign: "center",
    marginBottom: "2rem",
    color: "#FD6F4D",
  },
  pagination: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
  },
  toggleButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#FD6F4D",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "1rem",
    cursor: "pointer",
    marginTop: "1rem",
    boxShadow: "0 8px 18px #AD4227",
    transition: "transform 0.3s ease, box-shadow 0.3s ease", // Added shadow transition
  },
  pageButton: {
    padding: "0.5rem",
    border: "none",
    borderRadius: "50%",
    width: "2rem",
    height: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "1.2rem",
    fontWeight: "bold",
    transition: "opacity 0.3s ease",
  },
  pageInfo: {
    fontSize: "1rem",
    color: "#FFFFFF",
  },
};

import { useState, useEffect } from "react";
import { fetchCryptoPrices } from "../../services/api";
import "./CryptoTracker.css";

function CryptoTracker() {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCryptoPrices();
      setCryptos(data);
    } catch (err) {
      setError("Failed to fetch live crypto prices. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // Poll every 30 seconds for live updates
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && cryptos.length === 0) {
    return (
      <div className="status-container">
        <div className="spinner"></div>
        <p>Fetching real-time cryptocurrency rates...</p>
      </div>
    );
  }

  if (error && cryptos.length === 0) {
    return (
      <div className="status-container error">
        <p className="error-message">{error}</p>
        <button className="btn-retry" onClick={loadData}>Retry</button>
      </div>
    );
  }

  return (
    <div className="crypto-container">
      <div className="section-header">
        <h2>Live Crypto Rates</h2>
        <span className="live-badge">Live Updates (30s)</span>
      </div>

      <div className="crypto-grid">
        {cryptos.map((coin) => {
          const price = parseFloat(coin.priceUsd);
          const change = parseFloat(coin.changePercent24Hr);
          const isPositive = change >= 0;

          return (
            <div key={coin.id} className="crypto-card">
              <div className="crypto-card-header">
                <div>
                  <h3>{coin.name}</h3>
                  <span className="crypto-symbol">{coin.symbol}</span>
                </div>
                <span className={`change-badge ${isPositive ? "positive" : "negative"}`}>
                  {isPositive ? "+" : ""}{change.toFixed(2)}%
                </span>
              </div>
              <div className="crypto-card-body">
                <span className="crypto-price">
                  ${price >= 1 ? price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : price.toFixed(6)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CryptoTracker;

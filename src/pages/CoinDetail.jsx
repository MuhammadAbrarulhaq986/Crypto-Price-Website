import { useNavigate, useParams } from "react-router";
import { fetchCoinData } from "../api/coinGecko.js";
import { useEffect, useState } from "react";
import { formatPrice } from "../utils/formatter.js";

export const CoinDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coin, setCoin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCoinData();
  }, [id]);

  const loadCoinData = async () => {
    try {
      const data = await fetchCoinData(id);
      setCoin(data);
    } catch (err) {
      console.error("Error fetching crypto: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading Coin Data...</p>
        </div>
      </div>
    );
  }

  if (!coin) {
    return (
      <div className="app">
        <div className="no-results">
          <p>Coin Not Found</p>
          <button onClick={() => navigate("/")}>Go Back</button>
        </div>
      </div>
    );
  }
  const priceChange = coin.market_data.price_change_percentage_24h || 0;
  const isPositive = priceChange >= 0;

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <h1>💲Crypto Bazar💲</h1>
            <p>Real-Time CryptoCurrence Price and Market Data</p>
          </div>
          <button onClick={() => navigate("/")}>Go Back to List</button>
        </div>
      </header>
      <div className="coin-detail">
        <div className="coin-header">
          <div className="coin-title">
            <img src={coin.image.large} alt={coin.name} />
            <div>
              <h1>{coin.name}</h1>
              <p className="symbol">{coin.symbol.toUpperCase()}</p>
            </div>
          </div>

          <span className="rank">Rank #{coin.market_data.market_cap_rank}</span>
        </div>
        <div className="coin-price-section">
          <div className="current-price">
            <h2 className="price">
              {formatPrice(coin.market_data.current_price.usd)}
            </h2>
            <span
              className={`change-badge ${isPositive ? "positive" : "negative"}`}
            >
              {isPositive ? "⇡" : "⇣"} {Math.abs(priceChange).toFixed(2)}%
            </span>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

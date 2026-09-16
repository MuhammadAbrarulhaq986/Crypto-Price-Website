import { useEffect, useState } from "react";
import { fetchCryptos } from "../api/coinGecko.js";
import { CryptoCard } from "../components/CryptoCard.jsx";

export const Home = () => {
  const [cryptoList, setCryptoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCryptoData();
  }, []);

  const fetchCryptoData = async () => {
    try {
      const data = await fetchCryptos();
      //console.log(data);
      setCryptoList(data);
    } catch (err) {
      console.error("Error fetching crypto: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      {isLoading ? (
        <div className="loading">
          <div className="spinner" />
          <p>Loading crypto data...</p>
        </div>
      ) : (
        <div className="crypto-container">
          {cryptoList.map((crypto, key) => (
            <CryptoCard crypto={crypto} key={key} />
          ))}
        </div>
      )}
    </div>
  );
};

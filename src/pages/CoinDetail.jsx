import { useNavigate, useParams } from "react-router";
import { fetchCoinData } from "../api/coinGecko.js";
import { useEffect, useState } from "react";

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
      const data = await fetchCoinData();
      //console.log(data);
      setCoin(data);
    } catch (err) {
      console.error("Error fetching crypto: ", err);
    } finally {
      setIsLoading(false);
    }
  };
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
  return (
    <>
      <div>This is the coin page</div>
    </>
  );
};

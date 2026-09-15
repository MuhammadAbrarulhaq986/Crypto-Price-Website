import { useEffect } from "react";
import { fetchCryptos } from "../api/coinGecko.js";

export const Home = () => {
  useEffect(() => {
    fetchCryptoData();
  }, []);
  const fetchCryptoData = async () => {
    const data = await fetchCryptos();
    console.log(data);
  };

  return (
    <>
      <div>This is the home page</div>
    </>
  );
};

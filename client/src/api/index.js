import axios from "axios";
import { myHoldings } from "./myData";

const url = "https://api.coingecko.com/api/v3/coins/";
// const firstTenResult =  "&per_page=10&page=1"
export const fetchData = async () => {
  try {
    const { data } = await axios.get(
      `${url}markets?vs_currency=usd&per_page=150&page=1`
    );

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchCoinData = async (coin) => {
  try {
    const { data } = await axios.get(`${url}${coin}`);

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchCoins = async () => {
  try {
    const { data } = await axios.get(`${url}list`);

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchMyHoldings = async () => {
  try {
    let coins = myHoldings.map((obj) => obj.id);
    let idsParam = coins.join(",");
    const {
      data,
    } = await axios.get(`${url}markets?vs_currency=usd&ids=${idsParam}`, [
      { headers: { "Access-Control-Allow-Origin": "*" } },
    ]);

    return data;
  } catch (err) {
    console.log(err);
  }
};

// Test functions
// (async () => {
//   const entireList = await fetchMyHoldings();
//   console.log(entireList);
// })();

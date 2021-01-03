import axios from "axios";

const url = "https://api.coingecko.com/api/v3/coins/";

export const fetchData = async () => {
  try {
    const { data } = await axios.get(
      `${url}markets?vs_currency=usd&per_page=10&page=1`
    );

    return data;

  } catch (err) {
    console.log(err)
  }
}

export const fetchCoinData = async (coin) => {
  try {
    const { data } = await axios.get(`${url}${coin}`);

    return data;

  } catch (err) {
    console.log(err)
  }
}
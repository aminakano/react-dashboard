import axios from "axios";

const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

export const fetchData = async () => {
  try {
    const { data } = await axios.get(`${url}&per_page=10&page=1`);
    console.log(data)
    return data;

  } catch (err) {
    console.log(err)
  }
}
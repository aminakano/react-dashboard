import axios from "axios";

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

export const fetchAllCoins = async (number = 1) => {
  try {
    // const { data } = await axios({
    //   method: "get",
    //   url: `${url}markets?vs_currency=usd&per_page=150&page=${number}`,
    //   headers: { "Access-Control-Allow-Origin": "*" },
    // });

    let coins = "swissborg%2Cnexo";
    const {
      data,
    } = await axios.get(
      `${url}markets?vs_currency=usd&ids=${coins}&per_page=250&page=${number}`,
      [{ headers: { "Access-Control-Allow-Origin": "*" } }]
    );

    // console.log("Retreiving data from API for page : " + number);
    // console.log(data);
    if (data.length > 0) {
      return data.concat(await fetchAllCoins(number + 1));
    } else {
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};

// (async () => {
//   const entireList = await fetchAllCoins();
//   console.log(entireList);
// })();

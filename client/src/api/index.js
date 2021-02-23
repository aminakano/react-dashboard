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

export const fetchDailyChartData = async () => {
  try {
    const { data } = await axios.get(
      `${url}/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily`
    );

    return data.prices;
  } catch (err) {
    console.error(err);
  }
};

export const calcMyHoldings = async () => {
  try {
    const coins = myHoldings.map((obj) => obj.id);
    const dateAndPrices = [];

    for (let i = 0; i < coins.length; i++) {
      await axios
        .get(
          `${url}${coins[i]}/market_chart?vs_currency=usd&days=30&interval=daily`
        )
        .then((data) => dateAndPrices.push(data.data.prices));
    }
    // create a set of dates
    const timestamps = [];
    dateAndPrices[0].forEach((item) => timestamps.push(item[0]));
    const dateSet = new Set(timestamps);

    const aggr = (myData, [...mySet], [...myHoldings]) => {
      console.log(myHoldings);
      console.log(`dateSet inside loop: ${mySet[0]}`);
      myData.forEach((coin, i) => {
        coin.forEach((data, j) => {
          // console.log(`dateSet inside loop: ${mySet}`);
          if (data[0] === mySet[0]) console.log(data[1]);
        });
      });
    };

    aggr(dateAndPrices, dateSet, myHoldings);

    // const sb = dateAndPrices[0];
    // for (let i = 0; i < sb.length; i++) {
    //   sb[i][0] = sb[i][0] * myHoldings[0].amount;
    // }

    // const newSB = sb.map((item) => {
    //   return item[1] * 51188.15;
    // });
    // console.log(newSB);
    // console.log(myHoldings[0].amount);
    return dateAndPrices;
  } catch (err) {
    console.error(err);
  }
};

// Test functions
(async () => {
  const entireList = await calcMyHoldings();
  // return entireList;
  console.log(entireList);
})();

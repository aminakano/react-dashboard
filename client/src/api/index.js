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
      let count = 0;
      let newArr = [[]];

      myData.forEach((coin, i) => {
        coin.forEach((data, j) => {
          if (data[0] === mySet[0]) console.log(data[1] * myHoldings[i].amount);

          newArr[0][0] = data[1];
        });
        count += 1;
      });
    };

    aggr(dateAndPrices, dateSet, myHoldings);

    const aggr2 = (myData, [...mySet], [...myHoldings]) => {
      console.log(`dateSet inside loop: ${mySet[0]}`);
      let count = 0;
      let newArr = [[]];

      myData.forEach((coin, i) => {
        if (coin[0][0] === mySet[0]) {
          console.log(coin[0][1] * myHoldings[i].amount);
          count += coin[0][1] * myHoldings[i].amount;
          newArr[0][0] = mySet[0];
          newArr[0][1] = count;
        }
      });
      console.log(count);

      // newArr[1] = count;
      console.log(newArr);
    };
    aggr2(dateAndPrices, dateSet, myHoldings);

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

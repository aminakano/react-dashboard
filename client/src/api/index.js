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

const getTimestamps = async (dateAndPrices) => {
  // create a set of dates

  const mydates = [];
  for (let coin in dateAndPrices) {
    if (Object.keys(dateAndPrices[coin]).length === 31)
      mydates.push(dateAndPrices[coin]);
    break;
  }

  const mth = mydates[0];
  const newarr = [];
  for (let day in mth) {
    newarr.push(mth[day][0]);
  }
  const timestamps = new Set(newarr);
  return timestamps;
};

export const calcMyHoldings = async () => {
  try {
    const coins = myHoldings.map((obj) => obj.id);
    const dateAndPrices = {};

    for (let i = 0; i < coins.length; i++) {
      await axios
        .get(
          `${url}${coins[i]}/market_chart?vs_currency=usd&days=30&interval=daily`
        )
        .then(({ data }) => {
          dateAndPrices[coins[i]] = data.prices;
        });
    }

    // const aggr = (myData, [...mySet], [...myHoldings]) => {
    //   let count = 0;
    //   let newArr = [[]];

    //   myData.forEach((coin, i) => {
    //     coin.forEach((data, j) => {
    //       if (data[0] === mySet[0]) console.log(data[1] * myHoldings[i].amount);

    //       newArr[0][0] = data[1];
    //     });
    //     count += 1;
    //   });
    // };

    // aggr(dateAndPrices, dateSet, myHoldings);

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

  // get timestamps
  let timestamps = getTimestamps(entireList);
  console.log(timestamps);
  // iterate over timestamps
  let totals = {};
  (await timestamps).forEach((t, i) => {
    let amount = 0;
    Object.entries(entireList).forEach((arr, i) => {
      // console.log(arr[1]);
      let value = arr[1].find((a) => a[0] === t);
      // console.log(value);
      if (value) {
        let price = value[1];
        let balance = myHoldings.find((balance) => balance.id === arr[0]);
        // console.log(balance);
        amount += price * balance.amount;
      }
    });
    totals[t] = amount;
  });
  console.log(totals);
})();

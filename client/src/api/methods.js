export const filterArr = (array, data) => {
  let filteredArr = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (array[i].symbol === data[j].name) {
        let newObj = array[i];
        newObj.holdings = data[j].amount;
        newObj.holding_price = newObj.current_price * newObj.holdings;
        filteredArr.push(newObj);
      }
    }
  }

  filteredArr.sort((a, b) => b.holding_price - a.holding_price);

  let counter = 0;
  filteredArr.forEach((val) => (counter += val.holding_price));
  counter = counter.toLocaleString().split(".");

  return {
    filteredArr,
    counter,
  };
};

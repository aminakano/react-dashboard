<p align="center">
<img src="./client/public/icon.png" width=300">
</P>

# React Dashboard

This is a dashboard application using React. The purpose of this app is to display and manage your holdings of cryptocurrencies and visualise with charts and tables.

## How to use

- `git clone` or download the project
- `npm install` at the client directory
- Prepare a JavaScript file called `myData.js` under `src/api` directory which contains an array of your cryptocurrency holding data

### Alternatively, you could also use `myDataArray.js` which contains sample data by changing its file name to `myData.js`

#### Example data

```
export const myHoldings = [{
  id: "bitcoin",
  name: "btc",
  amount: 11111,
}]
```

- `npm start`

## References

- react-chartjs-2 <https://www.npmjs.com/package/react-chartjs-2/v/2.7.4>
- Embed Twitter <https://dev.to/heymarkkop/embed-twitter-widget-on-reactjs-1768>
- Multiple class names <https://stackoverflow.com/questions/34521797/how-to-add-multiple-classes-to-a-reactjs-component>
- How to conditionally render a React component that uses hooks <https://stackoverflow.com/questions/60289813/how-to-conditionally-render-a-react-component-that-uses-hooks>
- Returning Multiple Values from a Function <https://www.javascripttutorial.net/javascript-return-multiple-values/>
- How to Create a Search Field in ReactJS <https://stackoverflow.com/questions/51726391/how-to-create-a-search-field-in-reactjs>
- Retrieve entire data from paginated API recursively. <https://dev.to/nirmal_kumar/retrieve-entire-data-from-paginated-api-recursively-3pl4>
- Javascript: How to access the return value of a Promise object <https://dev.to/ramonak/javascript-how-to-access-the-return-value-of-a-promise-object-1bck>
- How To Pass Props to Components Inside React Router <https://medium.com/javascript-in-plain-english/passing-props-to-components-inside-react-router-3d26165662b1>

## References (video)

- Building a Login System for a MERN (MongoDB, Express.js, React.js, Node.js) Web App <https://www.youtube.com/watch?v=s1swJLYxLAA&t=165s>
- React & Express Starter Pack For Full Stack Development <https://www.youtube.com/watch?v=v0t42xBIYIs>
- Learn the MERN Stack - Full Tutorial (MongoDB, Express, React, Node.js) <https://www.youtube.com/watch?v=7CqJlxBYj-M&t=2190s>

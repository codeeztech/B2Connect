import React, { useState, useEffect, useRef } from "react";
import Dashboard from "./components/Dashboard";
import { formatData } from "./utils";
import axios from 'axios'
import "./styles.css";
import { Redirect } from "react-router-dom";
import Navbar from "./components/Router/navbar";

export default function App() {

  //Geo location Task 1
  const userData = async () => {
    const res = await axios.get('http://localhost:3000/users/')
    console.log(res.data)
  }

  useEffect(() => {
    //passing getData method to the lifecycle method
    userData()
  }, [])

  const [data, setIP] = useState('');

  //creating function to load geo location information by ip address from the API
  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    console.log(res.data);
    setIP(res.data)
  }

  useEffect(() => {
    //passing getData method to the lifecycle method
    getData()
  }, [])

  // Data Visualization Task 2

  const [currencies, setcurrencies] = useState([]);
  const [pair, setpair] = useState("");
  const [price, setprice] = useState("0.00");
  const [pastData, setpastData] = useState({});
  const ws = useRef(null);

  let first = useRef(false);
  const url = "https://api.pro.coinbase.com";

  useEffect(() => {
    ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");

    let pairs = [];

    const apiCall = async () => {
      await fetch(url + "/products")
        .then((res) => res.json())
        .then((data) => (pairs = data));

      let filtered = pairs.filter((pair) => {
        if (pair.quote_currency === "USD") {
          return pair;
        }
      });

      filtered = filtered.sort((a, b) => {
        if (a.base_currency < b.base_currency) {
          return -1;
        }
        if (a.base_currency > b.base_currency) {
          return 1;
        }
        return 0;
      });

      setcurrencies(filtered);

      first.current = true;
    };

    apiCall();
  }, []);

  useEffect(() => {
    if (!first.current) {
      return;
    }

    let msg = {
      type: "subscribe",
      product_ids: [pair],
      channels: ["ticker"]
    };
    let jsonMsg = JSON.stringify(msg);
    ws.current.send(jsonMsg);

    let historicalDataURL = `${url}/products/${pair}/candles?granularity=86400`;
    const fetchHistoricalData = async () => {
      let dataArr = [];
      await fetch(historicalDataURL)
        .then((res) => res.json())
        .then((data) => (dataArr = data));

      let formattedData = formatData(dataArr);
      setpastData(formattedData);
    };

    fetchHistoricalData();

    ws.current.onmessage = (e) => {
      let data = JSON.parse(e.data);
      if (data.type !== "ticker") {
        return;
      }

      if (data.product_id === pair) {
        setprice(data.price);
      }
    };
  }, [pair]);

  const handleSelect = (e) => {
    let unsubMsg = {
      type: "unsubscribe",
      product_ids: [pair],
      channels: ["ticker"]
    };
    let unsub = JSON.stringify(unsubMsg);

    ws.current.send(unsub);

    setpair(e.target.value);
  };
  return (

    <div className="container">
<Navbar></Navbar>
      <div className="App">
        <h2>Your current geo location is</h2>

        <div role="list" class="ui list">
          <div role="listitem" class="item">
            <div class="header font" >IP Address</div>{data.IPv4}</div>
          <div role="listitem" class="item">
            <div class="header font">City</div>{data.city}</div>
          <div role="listitem" class="item">
            <div class="header font">Country Code</div>{data.country_code}</div>
          <div role="listitem" class="item">
            <div class="header font">Country Name</div>{data.country_name}
          </div>
          <div role="listitem" class="item">
            <div class="header font">Latitude</div>{data.latitude}
          </div>
          <div role="listitem" class="item">
            <div class="header font">Longitude</div>{data.longitude}
          </div>
          <div role="listitem" class="item">
            <div class="header font">State</div>{data.state}
          </div>
          <div role="listitem" class="item">
            <div class="header font">Postal</div>{data.postal}
          </div>
        </div>

      </div>

      {
        <select name="currency" value={pair} onChange={handleSelect}>
          {currencies.map((cur, idx) => {
            return (
              <option key={idx} value={cur.id}>
                {cur.display_name}
              </option>
            );
          })}
        </select>
      }
      <Dashboard price={price} data={pastData} />
    </div>

  );
}

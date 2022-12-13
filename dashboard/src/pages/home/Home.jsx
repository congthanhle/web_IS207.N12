import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Chart from "../../components/chart/Chart";
import TableProduct from "../../components/table/TableProduct";
import axios from 'axios';
import { URI } from '../../api';
import { useState, useEffect } from "react";

const Home = () => {

  const [orderItems, setOrderItems] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${URI}/getTopSales`);
      setOrderItems(res.data);
    }
    fetch();
    const timerId = setTimeout(fetch, 200);
    return () => clearTimeout(timerId);
  }, []);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="post" />
          <Widget type="revenue" />
        </div>
        <div className="charts">
          <Chart title="Last 12 Months (Revenue)" aspect={4 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Các sản phẩm bán chạy</div>
          <TableProduct item={orderItems}/>
        </div>
      </div>
    </div>
  );
};

export default Home;

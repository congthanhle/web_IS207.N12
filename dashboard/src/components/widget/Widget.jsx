import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import { useState, useEffect, useContext } from "react";
import { Context } from '../../context/Context';
import axios from 'axios';
import { URI } from '../../api';



const Widget = ({ type }) => {
  let data;
  const { user } = useContext(Context);
  const [userAmount, setUserAmount] = useState(0);
  const [orderAmount, setOrderAmount] = useState(0);
  const [postAmount, setPostAmount] = useState(0);
  const [revenue, setRevenue] = useState(0);

  //temporary

  useEffect(() => {
    const fetch = async () => {
      const res1 = await axios.get(`${URI}/getAmountUser`, { headers: { "Authorization": `Bearer ${user.token}` } });
      const res2 = await axios.get(`${URI}/getAmountOrder`, { headers: { "Authorization": `Bearer ${user.token}` } });
      const res3 = await axios.get(`${URI}/postAmount`, { headers: { "Authorization": `Bearer ${user.token}` } });
      setUserAmount(res1.data);
      setOrderAmount(res2.data);
      setPostAmount(res3.data);

    }
    fetch();
    const timerId = setTimeout(fetch, 200);
    return () => clearTimeout(timerId);
  }, []);
  useEffect(() => {
    const fetch = async () => {
      const res4 = await axios.get(`${URI}/getRevenueToday`, { headers: { "Authorization": `Bearer ${user.token}` } });
      setRevenue(res4.data);
    }
    fetch();
    const timerId = setTimeout(fetch, 200);
    return () => clearTimeout(timerId);
  }, []);
 
  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "/users",
        label_link: "See all users",
        amount: userAmount,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "/orders",
        label_link: "View all orders",
        amount: orderAmount,
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "post":
      data = {
        title: "POSTS",
        isMoney: false,
        link: "/posts",
        label_link: "View all posts",
        amount: postAmount,
        icon: (
          <MarkunreadMailboxIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "revenue":
      data = {
        title: "Total Sales Today",
        isMoney: true,
        amount: revenue,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.amount}
        </span>
        <a href={data.link} className="link">{data.label_link}</a>
      </div>
      <div className="right">
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;

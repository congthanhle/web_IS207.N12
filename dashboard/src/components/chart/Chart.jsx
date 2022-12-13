import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import {URI} from '../../api';
import { Context } from '../../context/Context';

const Chart = ({ aspect, title }) => {
  const { user } = useContext(Context);
  const [revenue, setRevenue] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${URI}/getRevenueMonthly`,{ headers: {"Authorization" : `Bearer ${user.token}`} });
      setRevenue(res.data);
    }
    fetch();
    const timerId = setTimeout(fetch, 200);
    return () => clearTimeout(timerId);
  }, []);
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={revenue}
          margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;

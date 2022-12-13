import "./sidebar.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CoffeeIcon from '@mui/icons-material/Coffee';
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import CategoryIcon from '@mui/icons-material/Category';
import FeedbackIcon from '@mui/icons-material/Feedback';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from '../../context/Context';
const Sidebar = () => {
  const {dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.replace('/login');
  };
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">FIVEMEN COFFEE</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">SALES</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>
          <Link to="/feedbacks" style={{ textDecoration: "none" }}>
            <li>
              <FeedbackIcon className="icon" />
              <span>Feedbacks</span>
            </li>
          </Link>
          <p className="title">CATALOG</p>
          <Link to="/categories" style={{ textDecoration: "none" }}>
            <li>
              <CategoryIcon className="icon" />
              <span>Categories</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <CoffeeIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <p className="title">PAGE</p>
          <Link to="/posts" style={{ textDecoration: "none" }}>
            <li>
              <AllInboxIcon className="icon" />
              <span>Posts</span>
            </li>
          </Link>
          <Link to="/slides" style={{ textDecoration: "none" }}>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>Slides</span>
          </li>
          </Link>
          <Link to="" style={{ textDecoration: "none" }}>
          </Link>
          <li onClick={handleLogout} style={{borderTop: '1px dashed rgb(155, 155, 155)', marginTop: '20px'}}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
     
    </div>
  );
};

export default Sidebar;

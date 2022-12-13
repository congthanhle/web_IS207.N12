import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import Home from './pages/home/Home';
import Navbar from './components/navbar/Navbar';
import Collections from './pages/collections/Collections';
import Introduction from './pages/introduction/Introduction';
import Promotion from './pages/promotion/Promotion';
import Blog from './pages/blog/Blog';
import CheckOut from './pages/checkOut/CheckOut';
import SinglePost from './pages/singlePost/SinglePost';
import Register from './pages/register/Register';
import Footer from './components/footer/Footer';
import Contact from './pages/contact/Contact';
import Login from './pages/login/Login';
import GetPassword from './pages/getPassword/GetPassword';
import Cart from './pages/cart/Cart';
import Profile from './pages/profile/Profile';
import SingleProduct from './pages/singleProduct/SingleProduct';
import Search from './pages/search/Search';
import Category from './pages/category/Category';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collections/:category' element={<Category />} /> 
          <Route path='/collections' element={<Collections />} /> 
          <Route path='/promotion' element={<Promotion />} /> 
          <Route path='/blog' element={<Blog />} /> 
          <Route path='/about' element={<Introduction />} /> 
          <Route path='/post' element={<SinglePost />} /> 
          <Route path='/register' element={<Register/>} /> 
          <Route path='/login' element={<Login/>} /> 
          <Route path='/getPassword' element={<GetPassword/>} /> 
          <Route path='/contact' element={<Contact/>} /> 
          <Route path='/cart' element={<Cart/>} /> 
          <Route path='/checkout' element={<CheckOut/>} /> 
          <Route path='/profile' element={<Profile/>} /> 
          <Route path='/product/:productId' element={<SingleProduct/>} /> 
          <Route path='/productSearch/:productName' element={<Search/>} /> 
          <Route path='/blog/:postId' element={<SinglePost/>} /> 
        </Routes>
      </Router>
      <Footer/>
    </div>

  );
}

export default App;

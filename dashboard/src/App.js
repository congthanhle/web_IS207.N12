import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { UserList, ProductList, CategoryList, OrderList, SlideList, ProductCardList, PostList, FeedbackList } from "./pages/list/List";
import SingleProduct from "./pages/single/SingleProduct";
import SingleUser from "./pages/single/SingleUser";
import SingleOrder from "./pages/single/SingleOrder";
import SinglePost from "./pages/single/SinglePost";
import SingleFeedback from "./pages/single/SingleFeedback";
import NewProduct from "./pages/new/NewProduct";
import NewCategory from "./pages/new/NewCategory";
import NewSlide from "./pages/new/NewSlide";
import NewPost from "./pages/new/NewPost";
import EditProduct from "./pages/edit/EditProduct";
import EditCategory from "./pages/edit/EditCategory";
import EditPost from "./pages/edit/EditPost";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs} from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { DarkModeContext } from "./context/darkModeContext";
import { Context } from './context/Context';

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(Context);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
        <Route path="/login" element={<Login />} />
          {
            (!user || !user.user.isAdmin) ? (<Route path="*" element={<Navigate to="/login" replace />}/>) : 
            (<Route path="/">
              <Route index element={<Home />} />
              <Route path="users">
                <Route index element={<UserList />} />
                <Route path=":userId" element={<SingleUser />} />
                <Route
                  path="new"
                // element={<New inputs={userInputs} title="Add New User" />}
                />
              </Route>
              <Route path="products">
                <Route index element={<ProductList />} />
                <Route path=":productId" element={<SingleProduct />} />
                <Route path="update/:productId" element={<EditProduct />} />
                <Route
                  path="new"
                  element={<NewProduct inputs={productInputs} title="Add New Product" />}
                />
              </Route>
              <Route path="categories">
                <Route index element={<CategoryList />} />
                <Route path=":catId" element={< ProductCardList />} />
                <Route path="update/:catId" element={<EditCategory />} />
                <Route
                  path="new"
                  element={<NewCategory title="Add New Category" />}
                />

              </Route>
              <Route path="orders">
                <Route index element={<OrderList />} />
                <Route path=":orderId" element={<SingleOrder />} />
              </Route>
              <Route path="slides">
                <Route index element={<SlideList />} />
                <Route
                  path="new"
                  element={<NewSlide title="Add New Slide" />}
                />
              </Route>
              <Route path="posts">
                <Route index element={<PostList />} />
                <Route path=":postId" element={<SinglePost />} />
                <Route path="update/:postId" element={<EditPost/>} />
                <Route
                  path="new"
                  element={<NewPost title="Add New Category" />}
                />
              </Route>
              <Route path="feedbacks">
                <Route index element={<FeedbackList />} />
                <Route path=":postId" element={<SingleFeedback />} />
              </Route>
            </Route>)
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

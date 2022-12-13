import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DatatableUser from "../../components/datatable/DatatableUser"
import DatatableProduct from "../../components/datatable/DatatableProduct"
import DatatableCategory from "../../components/datatable/DatatableCategory"
import DatatableOrder from "../../components/datatable/DatatableOrder"
import DataSlide from "../../components/datatable/DataSlide"
import DatatablePost from "../../components/datatable/DatatablePost"
import DatatableFeedback from "../../components/datatable/DatatableFeedback"

import SingleCategory from "../single/SingleCategory"

export const UserList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableUser />
      </div>
    </div>
  )
}
export const ProductList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableProduct />
      </div>
    </div>
  )
}
export const CategoryList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableCategory />
      </div>
    </div>
  )
}
export const SlideList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DataSlide />
      </div>
    </div>
  )
}

export const OrderList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableOrder />
      </div>
    </div>
  )
}
export const PostList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatablePost />
      </div>
    </div>
  )
}
export const ProductCardList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <SingleCategory />
      </div>
    </div>
  )
}

export const FeedbackList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableFeedback />
      </div>
    </div>
  )
}



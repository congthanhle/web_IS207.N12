import * as React from "react";
import {Admin, Resource, CustomRoutes} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import {userEdit, userCreate, userList} from './components/User';
import {catEdit, catCreate, catList} from './components/Category';
import {productList, productCreate, productEdit} from './components/Product';
import LayoutPage from "./layout/LayoutPage";
import LoginPage from './pages/LoginPage';
import authProvider from "./authProvider";
import './App.css';

const dataProvider = jsonServerProvider('http://127.0.0.1:8000/api/v1');

function App() {
  return (
    <Admin layout={LayoutPage} dataProvider={dataProvider} loginPage={LoginPage} authProvider={authProvider}>
      <Resource name="user" list={userList} edit={userEdit} create={userCreate}/>
      <Resource name="category" list={catList} edit={catEdit} create={catCreate}/>   
      <Resource name="product" list={productList} create={productCreate} edit={productEdit}/>     
    </Admin>

  );
}

export default App;

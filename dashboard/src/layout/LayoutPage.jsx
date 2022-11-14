import React from 'react';
import { Layout, LayoutProps } from 'react-admin';
import MenuBar from './MenuBar';
import AppBar from './AppBar';

export default function LayoutPage(props) {
  return (
    <Layout {...props} menu={MenuBar} appBar={AppBar}/>
  )
}


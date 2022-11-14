import * as React from "react";
import { List, Datagrid, TextField, EmailField, CreateButton, ExportButton, TopToolbar,EditButton, DeleteButton} from 'react-admin';

const UserListActions = () => (
  <TopToolbar>
      <CreateButton />
      <ExportButton />
  </TopToolbar>
);

export default function UserList(props) {
  return (
    <List actions={<UserListActions />} {...props}>
    <Datagrid rowClick="edit">
        <TextField source="id"/> 
        <TextField source="fullname" label="Họ tên"/>
        <EmailField source="email" />
        <TextField source="phone_number" label="Số điện thoại"/>
        <TextField source="address" label="Địa chỉ"/>
        <EditButton/>;
        <DeleteButton/>;
    </Datagrid>
</List>
  )
}

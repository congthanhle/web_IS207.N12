import * as React from "react";
import { List, Datagrid, TextField, DateField, CreateButton, ExportButton, TopToolbar,EditButton, DeleteButton, RecordContextProvider,useListContext} from 'react-admin';

const CategoryListActions = () => (
  <TopToolbar>
      <CreateButton />
      <ExportButton />
  </TopToolbar>
);

export default function CategoryList(props) {
  return (
    <List actions={<CategoryListActions />} {...props}>
    <Datagrid rowClick="edit">
        <TextField source="id"/> 
        <TextField source="name" label="Tên mục"/>
        <TextField source="cat_code" label="Mã danh mục"/>
        <DateField source="created_at" />
        <DateField source="updated_at" />
        <EditButton/>;
        <DeleteButton/>;
    </Datagrid>
</List>
  )
}

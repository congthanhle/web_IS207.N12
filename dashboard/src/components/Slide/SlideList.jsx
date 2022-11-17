import * as React from "react";
import { List, Datagrid, TextField, ImageField, CreateButton, ExportButton, TopToolbar,EditButton, DeleteButton, BooleanField} from 'react-admin';
import Done from '@mui/icons-material/Done';
import Clear from '@mui/icons-material/Clear';


const SlideListActions = () => (
  <TopToolbar>
      <CreateButton />
      <ExportButton />
  </TopToolbar>
);

export default function SlideList(props) {
  return (
    <List actions={<SlideListActions />} {...props}>
    <Datagrid rowClick="edit">
        <TextField source="id"/> 
        <ImageField source="img_link" src="url" title="desc" label=""/>
        <TextField source="name" label="Tiêu đề"/>
        <BooleanField source="status" label="Trạng thái" looseValue={false}/>
        
        <EditButton/>;
        <DeleteButton/>;
    </Datagrid>
</List>
  )
}

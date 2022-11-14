import * as React from "react";
import { List, Datagrid, TextField,ImageField, ReferenceField, CreateButton, ExportButton, TopToolbar, EditButton, DeleteButton } from 'react-admin';

const ProductListActions = () => (
    <TopToolbar>
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);

export default function ProductList(props) {
    return (
        <List actions={<ProductListActions />} {...props}>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <ImageField source="thumbnail" src="url" title="desc" label=""/>
                <TextField source="name" label="Tên"/>
                <ReferenceField source="cat_id" reference="category" label="Loại">
                    <TextField source="name" />
                </ReferenceField>
                <TextField source="unit_price" label="Đơn giá"/>
                <TextField source="discount_price" label="Khuyến mãi"/>
                <TextField source="quantity" label="Số lượng"/>
                <EditButton />;
                <DeleteButton />;
            </Datagrid>
        </List>
    )
}

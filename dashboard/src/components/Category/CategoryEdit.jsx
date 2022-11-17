import React from 'react';
import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput } from 'react-admin';


export default function CategoryEdit() {
    return (
        <Edit>
            <SimpleForm>
                <TextInput disabled source="id" />
                <TextInput source='name' label="Tên danh mục"/>
                <ReferenceInput source="id" reference="category">
                    <SelectInput optionText="name" optionValue="id" label="Danh mục"/>
                </ReferenceInput>
                <TextInput source='cat_code' />
            </SimpleForm>
        </Edit>
    )
}

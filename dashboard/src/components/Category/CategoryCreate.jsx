import React from 'react';
import { Create, SimpleForm, TextInput, ReferenceInput, SelectInput, FileInput, FileField } from 'react-admin';


export default function CategoryCreate(props) {
  return (
    <Create {...props}>
      <SimpleForm encType="multipart/form-data">
        <TextInput source='name' label="Tên danh mục" />
        <ReferenceInput source="id" reference="category">
          <SelectInput optionText="name" optionValue="id" label="Danh mục" />
        </ReferenceInput>
        <TextInput source='cat_code' label="Cat_code" />
        <FileInput source="thumbnail" label="Related pictures">
          <FileField source="src" title="title" />
        </FileInput>
      </SimpleForm>
    </Create>
  )
}

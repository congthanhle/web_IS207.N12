import React from 'react';
import { Create, SimpleForm, TextInput, ReferenceInput, SelectInput, NumberInput, ImageInput, ImageField } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';

export default function ProductCreate() {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="name" label='Tên sản phẩm' />
        <RichTextInput source="description" label='Mô tả sản phẩm' />
        <ReferenceInput source="cat_id" reference="category">
          <SelectInput optionText="name" optionValue="id" />
        </ReferenceInput>
        <NumberInput min={0} step={1000} source="unit_price" />
        <TextInput source="thumbnail" label='Hình ảnh' />
      </SimpleForm>
    </Create>
  )
}

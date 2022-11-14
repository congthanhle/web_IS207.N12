import React from 'react';
import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, NumberInput, ImageInput, ImageField } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';

export default function ProductEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="name" label='Tên sản phẩm' />
        <RichTextInput source="description" label='Mô tả sản phẩm' />
        <ReferenceInput source="cat_id" reference="category">
          <SelectInput optionText="name" optionValue="id" />
        </ReferenceInput>
        <NumberInput min={0} step={1000} source="unit_price" />
        <NumberInput min={0} step={1000} source="discount_price" />
        <NumberInput min={0} step={1} source="quantity" />
        <TextInput source="thumbnail" label='Hình ảnh' />
      </SimpleForm>
    </Edit>
  )
}



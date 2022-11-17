import React from 'react';
import {Create, SimpleForm, TextInput, BooleanInput } from 'react-admin';

export default function SlideCreate() {
  return (
    <Create>
        <SimpleForm>
            <TextInput source='name' label="Tiêu đề"/>
            <TextInput source='img_link' label="Địa chỉ ảnh"/>
            <BooleanInput label="Trạng thái" source="status" />
        </SimpleForm>
    </Create>
  )
}

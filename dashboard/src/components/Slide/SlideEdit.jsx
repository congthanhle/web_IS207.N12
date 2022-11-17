import React from 'react';
import {Edit, SimpleForm, TextInput, ImageField, BooleanInput} from 'react-admin';

export default function SlideEdit() {
  return (
    <Edit>
        <SimpleForm>
            <TextInput source='name'/>
            <ImageField source="img_link" src="url" title="desc" label=""/>
            <TextInput source='img_link'/>
            <BooleanInput source='status' label="Trạng thái" looseValue={false}/>    
        </SimpleForm>
    </Edit>
  )
}

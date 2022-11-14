import React from 'react';
import {Edit, SimpleForm, TextInput} from 'react-admin';

export default function UserEdit() {
  return (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source='fullname'/>
            <TextInput source='email'/>
            <TextInput source='phone_number'/>
            <TextInput source='address'/>    
        </SimpleForm>
    </Edit>
  )
}

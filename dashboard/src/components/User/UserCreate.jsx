import React from 'react';
import {Create, SimpleForm, TextInput} from 'react-admin';

export default function UserCreate() {
  return (
    <Create>
        <SimpleForm>
            <TextInput source='fullname'/>
            <TextInput source='email'/>
            <TextInput source='phone_number'/>
            <TextInput source='address'/>    
            <TextInput source='password'/>   
            <TextInput source='password_confirmation'/>   
        </SimpleForm>
    </Create>
  )
}

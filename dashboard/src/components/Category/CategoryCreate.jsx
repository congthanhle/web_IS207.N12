import React from 'react';
import {Create, SimpleForm, TextInput, ReferenceInput, SelectInput} from 'react-admin';


export default function CategoryCreate() {
  return (
    <Create>
    <SimpleForm>
        <TextInput source='name'/>
        <ReferenceInput source="id" reference="category">
          <SelectInput  optionValue="id" />
        </ReferenceInput>
        <TextInput source='cat_code'/>
    </SimpleForm>
</Create>
  )
}

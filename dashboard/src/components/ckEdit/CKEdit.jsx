import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
const editorConfiguration = {
    fontSize: {
        options: [12,13,15,16,18,20,21,23, 24,25, 26],
        supportAllValues: true
    },
    toolbar: [  '|', 'fontSize','fontfamily','|','bold', 'italic', 'underline', '|', 'bulletedList', 'numberedList','|','blockQuote' , 'link', '|', 'alignment','|','undo', 'redo' ],
    
};

export default function CKEdit(props) {
    const {setText, text, height, fontSize} = props;
    return (
        <div className="CKEdit">
            <CKEditor
                editor={Editor}
                config={editorConfiguration}
                data={text}               
                onChange={(event, editor) => {
                    const data= editor.getData();
                    setText(data)
                }}
                
                onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    editor.editing.view.change(writer=>{
                        writer.setStyle('height', height, editor.editing.view.document.getRoot());
                        writer.setStyle('font-size', fontSize, editor.editing.view.document.getRoot());
                    });
                }}
            />
        </div>
    )
}

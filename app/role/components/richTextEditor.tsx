'use client';

import FroalaEditor from "react-froala-wysiwyg";
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins/char_counter.min.js'

import React, { useState } from 'react'

interface RichTextEditorProps {
  jobDescription: string,
  setJobDescription: (model: string) => void
}

const RichTextEditor:React.FC<RichTextEditorProps> = ({ jobDescription, setJobDescription }) => {

  const [_, setModel] = useState('');
    
  return (
    <>
        <FroalaEditor 
            tag="textarea"
            model={jobDescription}
            onModelChange={(e: string) => { 
              setModel(e);
              setJobDescription(e);
            }}
            config={{
                placeholderText: "Type your job description",
                charCounterCount: true,
                heightMin: 150,
                heightMax: 150
            }}
        />
    </>
  )
}

export default RichTextEditor
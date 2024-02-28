import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
// import 'froala-editor/js/plugins/char_counter.min.js'
interface RichTextEditorProps {
  jobDescription: string;
  setJobDescription: (model: string) => void;
}
const FroalaEditorComponent = React.lazy(() => import("react-froala-wysiwyg"));

interface RichTextEditorProps {
  jobDescription: string;
  setJobDescription: (model: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ jobDescription, setJobDescription }) => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [_, setModel] = useState('');

  useEffect(() => {
    // Dynamically import the Froala Editor component
    const loadEditorComponent = async () => {
      await import("react-froala-wysiwyg");
      setEditorLoaded(true);
    };
    loadEditorComponent();
  }, []);

  return (
    <React.Suspense fallback={<div>Loading Editor...</div>}>
      {editorLoaded && <FroalaEditorComponent />} {/* Render the editor once it's loaded */}
    </React.Suspense>
  );
}

export default RichTextEditor;

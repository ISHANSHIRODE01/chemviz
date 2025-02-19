import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Editor() {
  const quillRef = useRef(null);

  const handleFocus = () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor(); // Access Quill instance
      console.log(editor.getContents()); // Example usage
    }
  };

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        placeholder="Write something awesome..."
      />
      <button onClick={handleFocus}>Log Editor Content</button>
    </div>
  );
}

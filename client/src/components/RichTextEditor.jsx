import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css"; // Don't forget to import the styles!

const RichTextEditor = ({ input, setInput }) => {
  const handleChange = (content) => {
    setInput((prev) => ({
      ...prev,
      description: content,
    }));
  };

  return (
    <ReactQuill
      theme="snow"
      value={input.description}
      onChange={handleChange}
    />
  );
};

export default RichTextEditor;

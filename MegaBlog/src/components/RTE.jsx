import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-secondary-700 mb-1">
          {label}
        </label>
      )}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="dmx1vz6q3tvbf4kizme60kicojbq5cp8qgmicjnja1owx4fq"
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: false,
              skin: "oxide",
              plugins: [
                "advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor",
                "searchreplace", "visualblocks", "code", "fullscreen",
                "insertdatetime", "media", "table", "code", "help", "wordcount",
                "codesample", "emoticons"
              ],
              toolbar: "formatselect | " +
                "bold italic underline strikethrough | forecolor backcolor | " +
                "link image media | alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | removeformat codesample emoticons | " +
                "table | fullscreen code",
              content_style: `
                body { 
                  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                  font-size: 16px;
                  color: #334155;
                  margin: 15px;
                }
                h1, h2, h3, h4, h5, h6 { 
                  color: #1e293b; 
                  font-weight: 600; 
                  margin-top: 1em;
                  margin-bottom: 0.5em;
                }
                h1 { font-size: 2em; }
                h2 { font-size: 1.5em; }
                h3 { font-size: 1.17em; }
                p { margin: 0 0 1em; line-height: 1.6; }
                a { color: #4f46e5; text-decoration: underline; }
                ul, ol { padding-left: 2em; margin-bottom: 1em; }
                li { margin-bottom: 0.5em; }
                blockquote {
                  border-left: 4px solid #e2e8f0;
                  padding: 0.5em 1em;
                  margin: 1em 0;
                  color: #475569;
                }
                code {
                  background-color: #f1f5f9;
                  border-radius: 0.25em;
                  padding: 0.2em 0.4em;
                  font-family: monospace;
                  font-size: 0.9em;
                }
                pre {
                  background-color: #f8fafc;
                  border-radius: 0.375em;
                  padding: 1em;
                  margin: 1em 0;
                  overflow-x: auto;
                }
                img {
                  max-width: 100%;
                  height: auto;
                  border-radius: 0.375em;
                }
                table {
                  border-collapse: collapse;
                  width: 100%;
                  margin: 1em 0;
                }
                table th, table td {
                  border: 1px solid #e2e8f0;
                  padding: 0.5em;
                }
                table th {
                  background-color: #f8fafc;
                  font-weight: 600;
                }
              `,
              branding: false,
              promotion: false,
              resize: true,
              statusbar: true,
              paste_data_images: true,
              file_picker_types: 'image',
              image_title: true,
              automatic_uploads: true,
              file_picker_callback: (callback, value, meta) => {
                const input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                
                input.addEventListener('change', (e) => {
                  const file = e.target.files[0];
                  
                  const reader = new FileReader();
                  reader.addEventListener('load', () => {
                    const id = 'blobid' + (new Date()).getTime();
                    const blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
                    const base64 = reader.result.split(',')[1];
                    const blobInfo = blobCache.create(id, file, base64);
                    blobCache.add(blobInfo);
                    
                    callback(blobInfo.blobUri(), { title: file.name });
                  });
                  reader.readAsDataURL(file);
                });
                
                input.click();
              }
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

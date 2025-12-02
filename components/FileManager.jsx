import { useState } from "react";
import { FaFolder, FaEllipsisV, FaFilePdf, FaFileWord, FaFileCsv } from "react-icons/fa";
import FileUpload from "./FileUpload";

export default function FileManager() {
  const [recentFiles, setRecentFiles] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  

  return (
    <div className="p-5 w-full">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-bold text-xl">Total Files ({allFiles.length})</h2>
        {/* <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow">
          <AiOutlinePlus size={18} />
          Upload File
        </button> */}
        <FileUpload onUpload={(file) => {
          const newFile = {
            name: file.name,
            size: `${(file.size / 1024).toFixed(2)} KB`,
            type: file.name.split('.').pop().toUpperCase(),
            lastEdit: new Date().toLocaleDateString(),
          };
          setAllFiles([newFile, ...allFiles]);
          setRecentFiles([{ name: file.name, type: newFile.type.toLowerCase(), date: new Date().toISOString().split('T')[0] }, ...recentFiles]);
        }} />
      </div>

      {/* RECENTLY ACCESSED */}
      <h3 className="font-semibold mb-2">Recently Accessed</h3>
      <div className="grid grid-cols-4 gap-3 mb-6">
        {recentFiles.map((file, idx) => (
          <div key={idx} className="border p-3 rounded-md cursor-pointer">
            <div className="font-medium">{file.name}</div>
            <div className="text-xs text-gray-500">Date: {file.date}</div>
          </div>
        ))}
      </div>

    

      {/* ALL FILES TABLE */}
      <h3 className="font-semibold mb-2">All Files</h3>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Size</th>
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-left">Last Edit</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {allFiles.map((file, idx) => (
            <tr key={idx} className="border-b">
              <td className="p-2 flex items-center gap-2">
                {file.type === "Folder" ? <FaFolder className="text-yellow-500" /> : null}
                {file.type === "PDF" ? <FaFilePdf className="text-red-500" /> : null}
                {file.type === "DOC" ? <FaFileWord className="text-blue-600" /> : null}
                {file.type === "CSV" ? <FaFileCsv className="text-green-600" /> : null}
                {file.name}
              </td>

              <td className="p-2">{file.size}</td>
              <td className="p-2">{file.type}</td>
              <td className="p-2">{file.lastEdit}</td>

              <td className="p-2 text-right">
                <FaEllipsisV className="cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

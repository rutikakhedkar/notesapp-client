export default function FileUpload({ onUpload }) {
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) onUpload(file);
  };

  return (
    <>
      <input
        type="file"
        id="filePicker"
        className="hidden"
        onChange={handleUpload}
      />

      <button
        onClick={() => document.getElementById("filePicker").click()}
        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow"
      >
        + Upload File
      </button>
    </>
  );
}

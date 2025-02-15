import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

const EventForm = ({ onClick, onSubmit, initialData = {} }) => {
  const [projectImg, setProjectImg] = useState(null); // Store the file object
  const [projectImgPreview, setProjectImgPreview] = useState(""); // Store the preview URL
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    description: initialData.description || "",
    date: initialData.date || "",
    location: initialData.location || "",
  });

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProjectImgPreview(reader.result); // Set the preview URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
      setProjectImg(file); // Set the file object
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Create a FormData object
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("location", formData.location);
    if (projectImg) {
      formDataToSend.append("image", projectImg); // Append the image file
    }

    // Call the onSubmit prop with the FormData object
    onSubmit(formDataToSend);
  };

  return (
    <div className="w-full fixed pt-4 top-0 left-0 flex items-center justify-center bg-[#000000a9] z-50 ">
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6 w-9/12 relative max-[769px]:w-full">
        <div className="absolute top-4 right-4 cursor-pointer text-4xl text-red-500" onClick={onClick}>
          <MdOutlineCancel />
        </div>
        <h2 className="text-2xl font-bold mb-4">Create Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 max-[769px]:mb-1">
            <label className="block text-gray-700">Event Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 shadow-[2px_3px_10px_#999]"
              required
            />
          </div>
          <div className="mb-4 max-[769px]:mb-0">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 shadow-[2px_3px_10px_#999]"
              required
            />
          </div>
          <div className="flex gap-12 justify-between mb-8 max-[769px]:mb-3">
            <div className="w-1/2">
              <label className="block text-gray-700">Date</label>
              <input
                type="datetime-local"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 shadow-[2px_3px_10px_#999]"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 shadow-[2px_3px_10px_#999]"
                required
              />
            </div>
          </div>
          <div className="mb-4 flex justify-center relative max-[769px]:mb-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-1/4 h-[150px] opacity-0 z-10 cursor-pointer"
              required
            />
            <div className="absolute w-1/4 h-[150px] max-[769px]:w-1/2 max-[769px]:h-[100px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 flex flex-col justify-center items-center shadow-[2px_3px_10px_#999]">
              {projectImgPreview ? (
                <img src={projectImgPreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <>
                  <FaCloudUploadAlt className="text-green-700 text-3xl" />
                  <p className="text-gray-700 text-center">
                    Upload image <br /> or drag and drop
                  </p>
                </>
              )}
            </div>
          </div>
          <button type="submit" className="button">
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
// src/components/CineastModal.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "sonner";
import { handleImageFileDelete, handleImageFileUpload } from "../../utils/fileHandler";
import { MdDeleteForever } from "react-icons/md";

const APIURL = import.meta.env.VITE_API_URL;

const CineastModal = ({ cineast, onClose }) => {
    const [name, setName] = useState("");
    const [imageFile, setImageFile] = useState();
    const [image, setImage] = useState("");
    const [details, setDetails] = useState("");
    const [uploadingImage, setUploadingImage] = useState(false);
    const [deletingImage, setDeletingImage] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (cineast) {
            setName(cineast.name);
            setImage(cineast.image);
            setDetails(cineast.details);
        }
    }, [cineast]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (cineast) {
                await axiosInstance.put(`${APIURL}/cineasts/${cineast._id}`, {
                    name,
                    image,
                    details,
                });
                toast.success("Cineast updated successfully!");
            } else {
                await axiosInstance.post(`${APIURL}/cineasts`, {
                    name,
                    image,
                    details,
                });
                toast.success("Cineast added successfully!");
            }
            onClose();
        } catch (error) {
            console.error("Error saving cineast:", error);
            toast.error("Error saving cineast");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 lg:w-[40%] md:w-[60%] w-full m-4 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-4">
                    {cineast ? "Edit Cineast" : "Add New Cineast"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Image</label>
                        <div className="flex flex-row justify-between gap-4">
                            <input
                                className="w-full px-3 py-2 border rounded"
                                type="file"
                                onChange={(e) =>
                                    setImageFile(e.target.files[0])
                                }
                            />
                            {image && (
                                <>
                                    <img
                                        src={image}
                                        className="h-14 w-14 rounded-full"
                                    />
                                    <MdDeleteForever
                                        className="cursor-pointer"
                                        onClick={() =>
                                            handleImageFileDelete(
                                                image.split("/").pop(),
                                                setImage,
                                                setDeletingImage
                                            )
                                        }
                                    />
                                </>
                            )}
                            <button
                                type="button"
                                onClick={() =>
                                    handleImageFileUpload(
                                        setImage,
                                        setImageFile,
                                        setUploadingImage,
                                        imageFile
                                    )
                                }
                                className={
                                    uploadingImage
                                        ? "cursor-not-allowed"
                                        : "cursor-pointer"
                                }>
                                {uploadingImage ? (
                                    <u>Uploading...</u>
                                ) : (
                                    <u>Upload</u>
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Details</label>
                        <textarea
                            className="w-full px-3 py-2 border rounded"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                            onClick={onClose}
                            type="button">
                            Cancel
                        </button>
                        {loading ? (
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded cursor-not-allowed"
                                type="submit">
                                Saving...
                            </button>
                        ) : (
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded"
                                type="submit">
                                Save
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CineastModal;

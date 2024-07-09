// src/components/ProfileForm.jsx
import React, { useState } from "react";

const ProfileForm = ({ profile, onProfileUpdate }) => {
    const [formData, setFormData] = useState(profile);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onProfileUpdate(formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow-lg max-w-md mx-auto">
            <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded">
                    Update Profile
                </button>
            </div>
        </form>
    );
};

export default ProfileForm;
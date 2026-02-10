import React, { useState } from "react";
import axios from "axios";

const ProfileUpdate = () => {
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("token"); // ✅ Get token from login/signup
      if (!token) {
        alert("Please login first");
        return;
      }

      // Convert image to Base64
      let base64Img = "";
      if (profilePic) {
        const reader = new FileReader();
        reader.readAsDataURL(profilePic);
        await new Promise((resolve) => {
          reader.onloadend = () => {
            base64Img = reader.result;
            resolve();
          };
        });
      }

      const formData = {
        fullName,
        bio,
        profilePic: base64Img,
      };

      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/update-profile`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );


      console.log("✅ Profile updated successfully:", res.data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("❌ Update failed:", error.response?.data || error.message);
      alert("Failed to update profile. Check console for details.");
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <input type="file" onChange={(e) => setProfilePic(e.target.files[0])} />
      <button onClick={handleUpdateProfile}>Update Profile</button>
    </div>
  );
};

export default ProfileUpdate;

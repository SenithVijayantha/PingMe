import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";

const ProfilePage = () => {
  const { authUser, updateProfile } = useAuth();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullName: authUser?.fullName ?? "",
    bio: authUser?.bio ?? "",
  });

  // Create a preview URL for the selected image and revoke it when it changes
  useEffect(() => {
    if (!selectedImage) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedImage) {
      await updateProfile(userData);
      navigate("/");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    reader.onload = async () => {
      const base64Image = reader.result;
      if (typeof base64Image === "string") {
        await updateProfile({ profilePic: base64Image, ...userData });
        navigate("/");
      }
    };
    reader.onerror = () => {
      toast.error("Failed to read the selected image.");
    };
  };

  return (
    <div className="p-4 md:p-8 flex justify-center items-center h-screen">
      <div className=" w-sm">
        <h1 className="text-2xl mb-8">Profile Details</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <>
            <input
              type="file"
              name=""
              id="send-images"
              accept=".png, .jpg, .jpeg"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setSelectedImage(file);
              }}
            />
            <label htmlFor="send-images" className="flex items-center">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <CircleUserRound
                  width={40}
                  height={40}
                  color="gray"
                  className="cursor-pointer"
                />
              )}

              <p className="ml-4 text-gray-400 cursor-pointer">
                Upload profile image
              </p>
            </label>
          </>

          <input
            type="text"
            value={userData.fullName}
            placeholder="Your Name"
            className="input w-full"
            name="fullName"
            required
            autoComplete="name"
            onChange={(e) =>
              setUserData({ ...userData, [e.target.name]: e.target.value })
            }
          />
          <textarea
            name="bio"
            value={userData.bio}
            className="textarea resize-none w-full"
            placeholder="Bio"
            required
            onChange={(e) =>
              setUserData({ ...userData, [e.target.name]: e.target.value })
            }
          ></textarea>
          <button className="btn btn-sm lg:btn-md btn-primary w-max">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;

import React, { useState } from "react";
import { CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router";

const ProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "Alex Taylor",
    bio: "Loving every moment on PingMe",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/");
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
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />
            <label htmlFor="send-images" className="flex items-center">
              {selectedImage ? (
                <img
                  src={URL.createObjectURL(selectedImage)}
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
            value={userData.name}
            placeholder="Your Name"
            className="input w-full"
            name="name"
            required
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

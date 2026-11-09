import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";

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

  const avatarSrc = previewUrl ?? authUser?.profilePic;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 md:p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
          <CardDescription>
            Update your name, bio, and profile picture.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              id="send-images"
              type="file"
              accept=".png, .jpg, .jpeg"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setSelectedImage(file);
              }}
            />

            <div className="flex items-center gap-4">
              <Avatar size="lg" className="size-14">
                {avatarSrc ? (
                  <AvatarImage src={avatarSrc} alt={userData.fullName} />
                ) : null}
                <AvatarFallback>
                  <CircleUserRound className="size-6" />
                </AvatarFallback>
              </Avatar>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById("send-images")?.click()}
              >
                Upload profile image
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Your Name</Label>
              <Input
                id="fullName"
                type="text"
                value={userData.fullName}
                placeholder="Your Name"
                name="fullName"
                autoComplete="name"
                required
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={userData.bio}
                placeholder="Bio"
                required
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
              />
            </div>

            <Button type="submit" className="w-fit">
              Save
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;

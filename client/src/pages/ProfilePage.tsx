import { useState, useEffect, useRef } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { CircleUser } from "lucide-react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import { readFileAsDataUrl } from "@/lib/utils";
import { AvatarViewer } from "../components/AvatarViewer";
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

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | null>(null);

  // Revoke the last object URL when the page unmounts.
  useEffect(
    () => () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    },
    []
  );

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    const objectUrl = URL.createObjectURL(file);
    previewUrlRef.current = objectUrl;

    setSelectedImage(file);
    setPreviewUrl(objectUrl);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!selectedImage) {
        await updateProfile(userData);
      } else {
        const base64Image = await readFileAsDataUrl(selectedImage);
        await updateProfile({ profilePic: base64Image, ...userData });
      }
      navigate("/");
    } catch {
      toast.error("Failed to read the selected image.");
    }
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
              ref={fileInputRef}
              id="send-images"
              type="file"
              accept=".png, .jpg, .jpeg"
              hidden
              onChange={handleImageChange}
            />

            <div className="flex items-center gap-4">
              <AvatarViewer
                src={avatarSrc}
                alt={userData.fullName || "Your profile picture"}
              >
                <Avatar size="lg" className="size-14">
                  {avatarSrc ? (
                    <AvatarImage src={avatarSrc} alt={userData.fullName} />
                  ) : null}
                  <AvatarFallback>
                    <CircleUser className="size-6" />
                  </AvatarFallback>
                </Avatar>
              </AvatarViewer>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
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
                onChange={handleFieldChange}
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
                onChange={handleFieldChange}
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

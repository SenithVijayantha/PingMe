import icon from "./icon.svg";
import user1 from "./user-1.jpeg";
import user2 from "./user-2.jpeg";
import user3 from "./user-3.jpg";
import img1 from "./chocolate.jpg";
import img2 from "./coffee.jpg";
import pic1 from "./pic1.png";
import pic2 from "./pic2.png";
import pic3 from "./pic3.png";
import pic4 from "./pic4.png";
import avatarIcon from "./avatar-icon.svg";

const dummyUserData = [
  {
    _id: "680f50aaf10f3cd28382ecf2",
    email: "test1@greatstack.dev",
    fullName: "Alison Martin",
    profilePic: user1,
    bio: "Hi Everyone, I am Using QuickChat",
  },
  {
    _id: "680f50e4f10f3cd28382ecf9",
    email: "test2@greatstack.dev",
    fullName: "Martin Johnson",
    profilePic: user2,
    bio: "Hi Everyone, I am Using QuickChat",
  },
  {
    _id: "680f510af10f3cd28382ed01",
    email: "test3@greatstack.dev",
    fullName: "Enrique Martinez",
    profilePic: user3,
    bio: "Hi Everyone, I am Using QuickChat",
  },
  {
    _id: "680f5137f10f3cd28382ed10",
    email: "test4@greatstack.dev",
    fullName: "Marco Jones",
    profilePic: user1,
    bio: "Hi Everyone, I am Using QuickChat",
  },
  {
    _id: "680f516cf10f3cd28382ed11",
    email: "test5@greatstack.dev",
    fullName: "Richard Smith",
    profilePic: user3,
    bio: "Hi Everyone, I am Using QuickChat",
  },
  {
    _id: "681a42b7c12f4a5f9d7f23b8",
    email: "emma.johnson@example.com",
    fullName: "Emma Johnson",
    // profilePic: user4,
    bio: "Hey there! Excited to be part of QuickChat 🚀",
  },
];

const dummyMessageData = [
  {
    _id: "680f571ff10f3cd28382f094",
    senderId: "680f5116f10f3cd28382ed02",
    receiverId: "680f50e4f10f3cd28382ecf9",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    seen: true,
    createdAt: "2025-04-28T10:23:27.844Z",
  },
  {
    _id: "680f5726f10f3cd28382f0b1",
    senderId: "680f50e4f10f3cd28382ecf9",
    receiverId: "680f5116f10f3cd28382ed02",
    text: "Lorem ipsum dolor sit amet.",
    seen: true,
    createdAt: "2025-04-28T10:23:34.520Z",
  },
  {
    _id: "680f5729f10f3cd28382f0b6",
    senderId: "680f5116f10f3cd28382ed02",
    receiverId: "680f50e4f10f3cd28382ecf9",
    text: "Lorem elit.",
    seen: true,
    createdAt: "2025-04-28T10:23:37.301Z",
  },
  {
    _id: "680f572cf10f3cd28382f0bb",
    senderId: "680f50e4f10f3cd28382ecf9",
    receiverId: "680f5116f10f3cd28382ed02",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    seen: true,
    createdAt: "2025-04-28T10:23:40.334Z",
  },
  {
    _id: "680f573cf10f3cd28382f0c0",
    senderId: "680f50e4f10f3cd28382ecf9",
    receiverId: "680f5116f10f3cd28382ed02",
    image: img1,
    seen: true,
    createdAt: "2025-04-28T10:23:56.265Z",
  },
  {
    _id: "680f5745f10f3cd28382f0c5",
    senderId: "680f5116f10f3cd28382ed02",
    receiverId: "680f50e4f10f3cd28382ecf9",
    image: img2,
    seen: true,
    createdAt: "2025-04-28T10:24:05.164Z",
  },
  {
    _id: "680f5748f10f3cd28382f0ca",
    senderId: "680f5116f10f3cd28382ed02",
    receiverId: "680f50e4f10f3cd28382ecf9",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    seen: true,
    createdAt: "2025-04-28T10:24:08.523Z",
  },
];

const dummyImagesData = [pic1, pic2, pic3, pic4, pic1, pic2, pic3, pic4, pic1, pic2];

export { icon, avatarIcon, dummyUserData, dummyMessageData, dummyImagesData, user1 };

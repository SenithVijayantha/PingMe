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
    email: "alex.taylor@pingme.dev",
    fullName: "Alex Taylor",
    profilePic: user1,
    bio: "Loving every moment on PingMe",
  },
  {
    _id: "680f50e4f10f3cd28382ecf9",
    email: "sophia.brown@pingme.dev",
    fullName: "Sophia Brown",
    profilePic: user2,
    bio: "Let’s connect and share ideas",
  },
  {
    _id: "680f510af10f3cd28382ed01",
    email: "noah.wilson@pingme.dev",
    fullName: "Noah Wilson",
    profilePic: user3,
    bio: "Exploring new conversations every day",
  },
  {
    _id: "680f5137f10f3cd28382ed10",
    email: "mia.davis@pingme.dev",
    fullName: "Mia Davis",
    profilePic: user1,
    bio: "Chatting is my superpower",
  },
  {
    _id: "680f516cf10f3cd28382ed11",
    email: "liam.jones@pingme.dev",
    fullName: "Liam Jones",
    profilePic: user3,
    bio: "Always online, always ready to talk",
  },
  {
    _id: "681a42b7c12f4a5f9d7f23b8",
    email: "olivia.martin@pingme.dev",
    fullName: "Olivia Martin",
    // profilePic: user4,
    bio: "PingMe makes staying connected so easy",
  },
];

const dummyMessageData = [
  {
    _id: "680f571ff10f3cd28382f094",
    senderId: "680f5116f10f3cd28382ed02",
    receiverId: "680f50e4f10f3cd28382ecf9",
    text: "Hey! How’s everything going today?",
    seen: false,
    createdAt: "2025-05-10T09:15:42.123Z",
  },
  {
    _id: "680f5726f10f3cd28382f0b1",
    senderId: "680f50e4f10f3cd28382ecf9",
    receiverId: "680f5116f10f3cd28382ed02",
    text: "Hey! All good, just been busy with work. You?",
    seen: false,
    createdAt: "2025-05-10T09:16:08.657Z",
  },
  {
    _id: "680f5729f10f3cd28382f0b6",
    senderId: "680f5116f10f3cd28382ed02",
    receiverId: "680f50e4f10f3cd28382ecf9",
    text: "Same here! Finally getting some free time now.",
    seen: true,
    createdAt: "2025-05-10T09:16:25.982Z",
  },
  {
    _id: "680f572cf10f3cd28382f0bb",
    senderId: "680f50e4f10f3cd28382ecf9",
    receiverId: "680f5116f10f3cd28382ed02",
    text: "That’s great to hear! Want to catch up later?",
    seen: true,
    createdAt: "2025-05-10T09:16:44.540Z",
  },
  {
    _id: "680f573cf10f3cd28382f0c0",
    senderId: "680f50e4f10f3cd28382ecf9",
    receiverId: "680f5116f10f3cd28382ed02",
    image: img1,
    seen: true,
    createdAt: "2025-05-10T09:17:02.227Z",
  },
  {
    _id: "680f5745f10f3cd28382f0c5",
    senderId: "680f5116f10f3cd28382ed02",
    receiverId: "680f50e4f10f3cd28382ecf9",
    image: img2,
    seen: false,
    createdAt: "2025-05-10T09:17:19.314Z",
  },
  {
    _id: "680f5748f10f3cd28382f0ca",
    senderId: "680f5116f10f3cd28382ed02",
    receiverId: "680f50e4f10f3cd28382ecf9",
    text: "Sure! Let’s meet up around 6 PM then.",
    seen: true,
    createdAt: "2025-05-10T09:17:37.642Z",
  },
];

const dummyImagesData = [
  pic1,
  pic2,
  pic3,
  pic4,
  pic1,
  pic2,
  pic3,
  pic4,
  pic1,
  pic2,
];

export {
  icon,
  avatarIcon,
  dummyUserData,
  dummyMessageData,
  dummyImagesData,
  user1,
};

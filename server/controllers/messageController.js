import Message from "../models/messageModel";
import User from "../models/userModel";

// Get all users (exclude logged in User)
export const getUsersForSidebar = async (req, res) => {
  try {
    const userId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    // Count unseen messages
    const unseenMessages = {};
    const promises = filteredUsers.map(async (user) => {
      const messages = await Message.find({
        senderId: user._id, // the other user’s ID (who sent the messages)
        receiverId: userId, // the currently logged-in user (the one viewing the sidebar)
        seen: false,
      });

      if (messages.length > 0) {
        unseenMessages[user._id] = messages.length;
      }
    });

    // Wait for all asynchronous message queries to complete before continuing.
    // Using Promise.all allows all database calls to run in parallel instead of sequentially,
    // improving performance and ensuring unseenMessages is fully populated.
    await Promise.all(promises);

    return res
      .status(200)
      .json({ success: true, users: filteredUsers, unseenMessages });
  } catch (error) {
    if (process.env.NODE_ENV === "dev") {
      console.error("Error in getUsersForSidebar:", error);
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all messages for selected user
export const getMessages = async (req, res) => {
  try {
    const { id: selectedUserId } = req.params;
    const myID = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myID, receiverId: selectedUserId },
        { senderId: selectedUserId, receiverId: myID },
      ],
    });

    await Message.updateMany(
      { senderId: selectedUserId, receiverId: myID },
      { seen: true }
    );

    return res.status(200).json({ success: true, messages });
  } catch (error) {
    if (process.env.NODE_ENV === "dev") {
      console.error("Error in getMessages:", error);
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

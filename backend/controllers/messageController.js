import asyncHandler from 'express-async-handler';
import Message from '../models/Message.js';
import User from '../models/User.js';
import cloudinary from '../lib/configCloudinary.js';

//getAllContacts

const getAllContacts = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id;
  const filteredUsers = await User.find({
    _id: { $ne: loggedInUserId },
  }).select('-password');

  res.status(200).json(filteredUsers);
});

//getMessagesByUserId
const getMessagesByUserId = asyncHandler(async (req, res) => {
  const myId = req.user._id;
  const { id: userToChatId } = req.params;

  const messages = await Message.find({
    $or: [
      { senderId: myId, receiverId: userToChatId },
      { senderId: userToChatId, receiverId: myId },
    ],
  });

  res.status(200).json(messages);
});

//sendMessage

const sendMessage = asyncHandler(async (req, res) => {
  const { text, image } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  if (!text && !image) {
    return res.status(400).json({ message: 'Text or image is required.' });
  }

  if (senderId.equals(receiverId)) {
    return res
      .status(400)
      .json({ message: 'Cannot send messages to yourself.' });
  }

  const receiverExists = await User.exists({ _id: receiverId });
  if (!receiverExists) {
    return res.status(404).json({ message: 'Receiver not found.' });
  }

  let imageUrl;
  if (image) {
    const uploadResponse = await cloudinary.uploader.upload(image);
    imageUrl = uploadResponse.secure_url;
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    text,
    image: imageUrl,
  });

  await newMessage.save();

  res.status(201).json(newMessage);
});

//getChatPartners

const getChatPartners = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id;

  const messages = await Message.find({
    $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
  });

  const chatPartnerIds = [
    ...new Set(
      messages.map((msg) =>
        msg.senderId.toString() === loggedInUserId.toString()
          ? msg.receiverId.toString()
          : msg.senderId.toString()
      )
    ),
  ];

  const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select(
    '-password'
  );

  res.status(200).json(chatPartners);
});

export { getAllContacts, getMessagesByUserId, sendMessage, getChatPartners };

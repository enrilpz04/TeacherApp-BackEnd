const { Message, User } = require('../models');
const sequelize = require('../config/db.js');
const { Op, Sequelize } = require('sequelize');

// Método para obtener todos los mensajes entre emisor y receptor (conversación de dos usuarios)
const getAllMessagesBetweenUsers = async (req, res) => {
  const user1Id = req.query.user1Id;
  const user2Id = req.query.user2Id;
  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { recipientId: user1Id, senderId: user2Id },
          { recipientId: user2Id, senderId: user1Id }
        ]},
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'name', 'surname', 'email', 'avatar', 'rol']
        },
        {
          model: User,
          as: 'recipient',
          attributes: ['id', 'name', 'surname', 'email', 'avatar', 'rol']
        }
      ],
      order: [['date', 'DESC']]
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para obtener el último mensaje de cada conversación de un usuario
const getLastMessagesByUser = async (req, res) => {
  const userId = req.query.userId;
  try {
    const latestMessages = await sequelize.query(
      `SELECT * FROM messages
      WHERE messages.id IN (
        SELECT MAX(id) FROM messages
        WHERE recipientId = ${userId}
          OR senderId = ${userId}
        GROUP BY (senderId + recipientId))
        ORDER BY DATE DESC`,
      {
        model: Message,
        mapToModel: true
      });
    res.status(200).json(latestMessages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para crear un nuevo mensaje
const createMessage = async (req, res) => {
  const { text, date, watched, sender, recipient } = req.body;

  try {
    const message = await Message.create({
      text,
      date: new Date(),
      watched,
      senderId: sender.id,
      recipientId: recipient.id,
      
    });

    const fullMessage = await Message.findByPk(message.id, {
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'name', 'surname', 'email', 'avatar', 'rol']
        },
        {
          model: User,
          as: 'recipient',
          attributes: ['id', 'name', 'surname', 'email', 'avatar', 'rol']
        }
      ]
    });

    res.status(201).json(fullMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para eliminar un mensaje
const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Message.findByPk(id);
    if (!message) {
      return res.status(404).json({ message: 'Message no encontrado' });
    }
    await message.destroy();
    res.status(200).json({ message: 'Message eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para recuperar los diferentes chats que tiene una persona
const getChatsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const chats = await sequelize.query(
      `SELECT DISTINCT
        CASE
          WHEN senderId = :userId THEN recipientId
          ELSE senderId
        END AS chatUserId
      FROM messages
      WHERE senderId = :userId OR recipientId = :userId`,
      {
        replacements: { userId },
        type: Sequelize.QueryTypes.SELECT
      }
    );

    const chatUserIds = chats.map(chat => chat.chatUserId);

    const chatUsers = await User.findAll({
      where: {
        id: {
          [Op.in]: chatUserIds
        }
      },
      attributes: ['id', 'name', 'surname', 'email', 'avatar', 'rol']
    });

    res.status(200).json(chatUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMessagesBetweenUsers,
  getLastMessagesByUser,
  createMessage,
  deleteMessage,
  getChatsByUser
};
const { Message, User } = require('../models');
const sequelize = require('../config/db.js');
const { Op, Sequelize } = require('sequelize');

// Método para obtener todos los mensajes entre dos usuarios
const getAllMessagesBetweenUsers = async (req, res) => {
  const { userId1, userId2 } = req.query;

  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: userId1, recipientId: userId2 },
          { senderId: userId2, recipientId: userId1 }
        ]
      },
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
      order: [['date', 'ASC']]
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para obtener los últimos mensajes de un usuario
const getLastMessagesByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: userId },
          { recipientId: userId }
        ]
      },
      order: [['date', 'DESC']],
      limit: 1
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para crear un nuevo mensaje
const createMessage = async (req, res) => {
  const { text, senderId, recipientId } = req.body;

  try {
    const message = await Message.create({
      text,
      senderId,
      recipientId,
      date: new Date()
    });

    res.status(201).json(message);
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
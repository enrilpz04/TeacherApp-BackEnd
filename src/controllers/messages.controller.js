const { Message, User } = require('../models');

// Método para obtener todos los mensajes entre emisor y receptor (conversación)
const getAllMessagesBetweenSenderAndRecipient = async (req, res) => {
  const { senderId } = req.query.senderId;
  const { recipientId } = req.query.recipientId;
  try {
    const messages = await Message.findAll({
      where: { senderId, recipientId },
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'name', 'surname', 'email', 'rol']
        }
      ]
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para obtener el último mensaje de cada conversación de un usuario
const getLastMessagesByRecipient = async (req, res) => {
  const { recipientId } = req.query.recipientId;
  try {
    const latestMessages = await Message.findAll({      
      where: { 
        [Op.or]: [
          { senderId: recipientId },
          { recipientId: recipientId }
        ]
       },
      attributes: [
        'text', 'senderId', 'recipientId'
        [Sequelize.fn('MAX', Sequelize.col('date')), 'latestDate']
      ],
      order: [['latestDate', 'DESC']],
      group: ['senderId', 'recipientId'],
      raw: true
    });
    res.status(200).json(latestMessages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createMessage = async (req, res) => {
  const { text, date, senderId, recipientId } = req.body;
  try {
    const message = await Message.create({
      text,
      date,
      senderId,
      recipientId
    });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

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
}

module.exports = {
  getAllMessagesBetweenSenderAndRecipient,
  getLastMessagesByRecipient,
  createMessage,
  deleteMessage
};

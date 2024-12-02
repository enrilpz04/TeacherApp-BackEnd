const { Notification, User } = require('../models');
const sequelize = require('../config/db.js');
const { Op } = require('sequelize');

// Obtener todas las notificaciones
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      include: [{ model: User, as: 'user' }]
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todas las notificaciones de un usuario específico
const getNotificationsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.findAll({
      where: { userId },
      include: [{ model: User, as: 'user' }]
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una notificación por su ID
const getNotificationById = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notification.findByPk(id, {
      include: [{ model: User, as: 'user' }]
    });
    if (notification) {
      res.json(notification);
    } else {
      res.status(404).json({ message: 'Notificación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva notificación
const createNotification = async (req, res) => {
  const { type, message, date, read, userId } = req.body;
  try {
    const newNotification = await Notification.create({
      type,
      message,
      date,
      read,
      userId
    });
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una notificación existente
const updateNotification = async (req, res) => {
  const { id } = req.params;
  const { type, message, date, read, userId } = req.body;
  try {
    const notification = await Notification.findByPk(id);
    if (notification) {
      notification.type = type !== undefined ? type : notification.type;
      notification.message = message !== undefined ? message : notification.message;
      notification.date = date !== undefined ? date : notification.date;
      notification.read = read !== undefined ? read : notification.read;
      notification.userId = userId !== undefined ? userId : notification.userId;
      
      await notification.save();
      res.json(notification);
    } else {
      res.status(404).json({ message: 'Notificación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una notificación
const deleteNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notification.findByPk(id);
    if (notification) {
      await notification.destroy();
      res.json({ message: 'Notificación eliminada correctamente' });
    } else {
      res.status(404).json({ message: 'Notificación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllNotifications,
  getNotificationsByUser,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification
};
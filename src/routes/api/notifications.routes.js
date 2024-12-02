const router = require('express').Router();
const {
  getAllNotifications,
  getNotificationsByUser,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification
} = require('../../controllers/notifications.controller');

// Obtener todas las notificaciones
router.get('/', getAllNotifications);

// Obtener todas las notificaciones de un usuario específico
router.get('/user/:userId', getNotificationsByUser);

// Obtener una notificación por su ID
router.get('/:id', getNotificationById);

// Crear una nueva notificación
router.post('/', createNotification);

// Actualizar una notificación existente
router.put('/:id', updateNotification);

// Eliminar una notificación
router.delete('/:id', deleteNotification);

module.exports = router;
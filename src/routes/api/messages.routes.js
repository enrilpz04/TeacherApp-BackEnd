const router = require('express').Router();
const {
  getAllMessagesBetweenUsers,
  getLastMessagesByUser,
  getChatsByUser,
  createMessage,
  deleteMessage
} = require('../../controllers/messages.controller');

router.get('/between/', getAllMessagesBetweenUsers);
router.get('/latests/', getLastMessagesByUser);
router.get('/chats/:userId', getChatsByUser);
router.post('/', createMessage);
router.delete('/:id', deleteMessage);

module.exports = router;
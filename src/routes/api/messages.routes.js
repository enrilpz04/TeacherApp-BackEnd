const router = require('express').Router();
const {
  getAllMessagesBetweenUsers,
  getLastMessagesByUser,
  createMessage,
  deleteMessage
} = require('../../controllers/messages.controller');

router.get('/between/', getAllMessagesBetweenUsers);

router.get('/latests/', getLastMessagesByUser);

router.post('/', createMessage);

router.delete('/:id', deleteMessage);


module.exports = router;

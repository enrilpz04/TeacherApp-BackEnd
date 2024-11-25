const router = require('express').Router();
const {
  getAllMessagesBetweenSenderAndRecipient: getAllMessagesBetweenUsers,
  getLastMessagesByRecipient: getLastMessagesByUser,
  createMessage,
  deleteMessage
} = require('../../controllers/messages.controller');

router.get('/between/', getAllMessagesBetweenUsers);

router.get('/to/', getLastMessagesByUser);

router.post('/', createMessage);

router.delete('/:id', deleteMessage);


module.exports = router;

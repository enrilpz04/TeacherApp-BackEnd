const router = require('express').Router();
const {
  getAllMessagesBetweenSenderAndRecipient,
  getLastMessagesByRecipient,
  createMessage,
  deleteMessage
} = require('../../controllers/messages.controller');

router.get('/between/', getAllMessagesBetweenSenderAndRecipient);

router.get('/to/', getLastMessagesByRecipient);

router.post('/', createMessage);

router.delete('/:id', deleteMessage);


module.exports = router;
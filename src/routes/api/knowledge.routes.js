const router = require('express').Router();
const {
  getAllKnowledges,
  getKnowledgeById,
  createKnowledge,
  updateKnowledge,
  deleteKnowledge
} = require('../../controllers/knowledge.controller');

// Obtener todos los conocimientos
router.get('/', getAllKnowledges);

// Obtener un conocimiento por ID
router.get('/:id', getKnowledgeById);

// Crear un nuevo conocimiento
router.post('/', createKnowledge);

// Actualizar un conocimiento existente
router.put('/:id', updateKnowledge);

// Eliminar un conocimiento
router.delete('/:id', deleteKnowledge);

module.exports = router;
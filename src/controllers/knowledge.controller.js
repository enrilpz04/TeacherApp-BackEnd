const { Booking, Teacher, User, Knowledge } = require('../models');
const sequelize = require('../config/db.js');
const { Op } = require('sequelize');

// Obtener todos los conocimientos
const getAllKnowledges = async (req, res) => {
  try {
    const knowledges = await Knowledge.findAll();
    res.json(knowledges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un conocimiento por ID
const getKnowledgeById = async (req, res) => {
  const { id } = req.params;
  try {
    const knowledge = await Knowledge.findByPk(id);
    if (knowledge) {
      res.json(knowledge);
    } else {
      res.status(404).json({ message: 'Conocimiento no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo conocimiento
const createKnowledge = async (req, res) => {
  const { name } = req.body;
  try {
    const newKnowledge = await Knowledge.create({ name });
    res.status(201).json(newKnowledge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un conocimiento existente
const updateKnowledge = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const knowledge = await Knowledge.findByPk(id);
    if (knowledge) {
      knowledge.name = name !== undefined ? name : knowledge.name;
      await knowledge.save();
      res.json(knowledge);
    } else {
      res.status(404).json({ message: 'Conocimiento no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un conocimiento
const deleteKnowledge = async (req, res) => {
  const { id } = req.params;
  try {
    const knowledge = await Knowledge.findByPk(id);
    if (knowledge) {
      await knowledge.destroy();
      res.json({ message: 'Conocimiento eliminado correctamente' });
    } else {
      res.status(404).json({ message: 'Conocimiento no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllKnowledges,
  getKnowledgeById,
  createKnowledge,
  updateKnowledge,
  deleteKnowledge
};

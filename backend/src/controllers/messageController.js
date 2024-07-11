const Message = require('../models/messageModel'); 

// Crear un mensaje
exports.createMessage = async (req, res) => {
  try {
    const { content, senderId, receiverId } = req.body;
    
    const newMessage = await Message.create({ content, senderId, receiverId });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error al crear el mensaje:', error);
    res.status(500).json({ error: 'Hubo un problema al crear el mensaje.' });
  }
};

// Actualizar un mensaje
exports.updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    
    const updatedMessage = await Message.findByPk(id);
    if (!updatedMessage) {
      return res.status(404).json({ error: 'Mensaje no encontrado.' });
    }
    
    updatedMessage.content = content; 
    await updatedMessage.save(); 

    res.json(updatedMessage); 
  } catch (error) {
    console.error('Error al actualizar el mensaje:', error);
    res.status(500).json({ error: 'Hubo un problema al actualizar el mensaje.' });
  }
};

// Eliminar lógicamente un mensaje (marcar como eliminado)
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedMessage = await Message.findByPk(id);
    if (!deletedMessage) {
      return res.status(404).json({ error: 'Mensaje no encontrado.' });
    }
    
    deletedMessage.deletedAt = new Date(); 
    await deletedMessage.save(); 

    res.json({ message: 'Mensaje eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar el mensaje:', error);
    res.status(500).json({ error: 'Hubo un problema al eliminar el mensaje.' });
  }
};

// Obtener mensajes por receiverId
exports.getMessagesByReceiverId = async (req, res) => {
  try {
    const { receiverId } = req.params; 
    
    const messages = await Message.findAll({ where: { receiverId, deletedAt: null } });

    res.json(messages);
  } catch (error) {
    console.error('Error al obtener los mensajes:', error);
    res.status(500).json({ error: 'Hubo un problema al obtener los mensajes.' });
  }
};

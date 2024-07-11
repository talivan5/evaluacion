const { Post, Comment, Like, Share } = require('../models/postModel');

// Crear un post
exports.createPost = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    const userId = req.user.id;

    const newPost = await Post.create({ title, content, imageUrl, userId });

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error al crear el post:', error);
    res.status(500).json({ error: 'Hubo un problema al crear el post.' });
  }
};

// Obtener todos los posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    console.error('Error al obtener los posts:', error);
    res.status(500).json({ error: 'Hubo un problema al obtener los posts.' });
  }
};

// Obtener posts de un usuario específico
exports.getUserPosts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const posts = await Post.findAll({ where: { userId } });
    res.json(posts);
  } catch (error) {
    console.error('Error al obtener los posts del usuario:', error);
    res.status(500).json({ error: 'Hubo un problema al obtener los posts del usuario.' });
  }
};

// Actualizar un post
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, imageUrl } = req.body;

    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado.' });
    }

    post.title = title;
    post.content = content;
    post.imageUrl = imageUrl;
    await post.save();

    res.json(post);
  } catch (error) {
    console.error('Error al actualizar el post:', error);
    res.status(500).json({ error: 'Hubo un problema al actualizar el post.' });
  }
};

// Eliminar un post
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado.' });
    }

    post.deletedAt = new Date();
    await post.save();

    res.json({ message: 'Post eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar el post:', error);
    res.status(500).json({ error: 'Hubo un problema al eliminar el post.' });
  }
};

// Crear un comentario en un post
exports.createComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const userId = req.user.id;

    const newComment = await Comment.create({ postId, userId, content });

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error al crear el comentario:', error);
    res.status(500).json({ error: 'Hubo un problema al crear el comentario.' });
  }
};

// Dar me gusta a un post
exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const like = await Like.create({ postId, userId });

    res.status(201).json(like);
  } catch (error) {
    console.error('Error al dar me gusta al post:', error);
    res.status(500).json({ error: 'Hubo un problema al dar me gusta al post.' });
  }
};

// Compartir un post
exports.sharePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const share = await Share.create({ postId, userId });

    res.status(201).json(share);
  } catch (error) {
    console.error('Error al compartir el post:', error);
    res.status(500).json({ error: 'Hubo un problema al compartir el post.' });
  }
};

// Obtener todos los comentarios de un post
exports.getPostComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.findAll({ where: { postId } });

    res.json(comments);
  } catch (error) {
    console.error('Error al obtener los comentarios del post:', error);
    res.status(500).json({ error: 'Hubo un problema al obtener los comentarios del post.' });
  }
};

// Obtener todos los me gusta de un post
exports.getPostLikes = async (req, res) => {
  try {
    const { postId } = req.params;

    const likes = await Like.findAll({ where: { postId } });

    res.json(likes);
  } catch (error) {
    console.error('Error al obtener los me gusta del post:', error);
    res.status(500).json({ error: 'Hubo un problema al obtener los me gusta del post.' });
  }
};

// Obtener todos los compartidos de un post
exports.getPostShares = async (req, res) => {
  try {
    const { postId } = req.params;

    const shares = await Share.findAll({ where: { postId } });

    res.json(shares);
  } catch (error) {
    console.error('Error al obtener los compartidos del post:', error);
    res.status(500).json({ error: 'Hubo un problema al obtener los compartidos del post.' });
  }
};

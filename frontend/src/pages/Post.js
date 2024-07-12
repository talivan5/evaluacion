import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostsCard from './PostsCard';
import { getAllPost } from '../api/post';

const PostComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await getAllPost();
        setComments(commentsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  });

  const handleLike = (userId) => {
    console.log(`Me gusta por el usuario: ${userId}`);
  };

  const handleShare = (userId) => {
    console.log(`Compartido por el usuario: ${userId}`);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Comentarios del Post</h2>
      {comments.length > 0 ? (
        <div className="card-container">
          {comments.map((comment) => (
            <PostsCard
              key={comment.id}
              title={comment.title}
              content={comment.content}
              imageUrl={comment.imageUrl}
              userId={comment.userId}
              onLike={handleLike}
              onShare={handleShare}
            />
          ))}
        </div>
      ) : (
        <p>No hay comentarios para este post.</p>
      )}
    </div>
  );
};

export default PostComments;

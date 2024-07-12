import React from 'react';
import { FaThumbsUp, FaShare } from 'react-icons/fa';

const PostsCard = ({ title, content, imageUrl, userId, onLike, onShare }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt={title} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{content}</p>
        <div className="card-actions">
          <button onClick={() => onLike(userId)} className="btn btn-primary">
            <FaThumbsUp /> Me gusta
          </button>
          <button onClick={() => onShare(userId)} className="btn btn-secondary">
            <FaShare /> Compartir
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostsCard;

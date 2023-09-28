import React, { useState } from "react";
import { Button, Input } from "antd";

const CommentList = ({ comments, handleAddChildComment }) => {
  const [childCommentText, setChildCommentText] = useState({});
  const [showChildCommentForm, setShowChildCommentForm] = useState({});

  const handleShowChildCommentForm = (commentId) => {
    setShowChildCommentForm({
      ...showChildCommentForm,
      [commentId]: true,
    });
    setChildCommentText((childCommentText) => ({
      ...childCommentText,
      [commentId]: "",
    }));
  };

  const handleAddChildCommentClick = (parentComment, commentId) => {
    if (childCommentText[commentId].trim()) {
      handleAddChildComment(parentComment, childCommentText[commentId]);
      setChildCommentText((childCommentText) => ({
        ...childCommentText,
        [commentId]: "",
      }));
      setShowChildCommentForm({
        ...showChildCommentForm,
        [commentId]: false,
      });
    }
  };

  return (
    <ul>
      {comments.map((comment, index) => (
        <li key={index}>
          {comment.text}
          {!showChildCommentForm[index] ? (
            <Button
              type="link"
              onClick={() => handleShowChildCommentForm(index)}
            >
              Добавить дочерний комментарий
            </Button>
          ) : (
            <div>
              <Input
                placeholder="Введите текст дочернего комментария"
                value={childCommentText[index]}
                onChange={(e) =>
                  setChildCommentText((childCommentText) => ({
                    ...childCommentText,
                    [index]: e.target.value,
                  }))
                }
              />
              <Button
                type="primary"
                onClick={() => handleAddChildCommentClick(comment, index)}
              >
                Добавить
              </Button>
            </div>
          )}
          {comment.children && comment.children.length > 0 && (
            <CommentList
              comments={comment.children}
              handleAddChildComment={handleAddChildComment}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export { CommentList };

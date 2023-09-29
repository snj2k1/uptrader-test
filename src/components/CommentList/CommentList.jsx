import React, { useState } from "react";
import { Button, Input } from "antd";
import styles from "./CommentList.module.css";

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
    <ul className={styles.list}>
      {comments.map((comment, index) => (
        <li key={index}>
          {comment.text}
          {!showChildCommentForm[index] ? (
            <Button
              type="link"
              onClick={() => handleShowChildCommentForm(index)}
              style={{ display: "block" }}
            >
              Ответить
            </Button>
          ) : (
            <div>
              <Input
                placeholder="Введите сообщение"
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
                style={{ marginTop: "5px" }}
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

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import style from "./Todo.module.css";

const Tasks = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const list = useSelector((state) => state.list);

  const addTodo = (e) => {
    e.preventDefault();

    if (list.find((item) => item.text === text)) {
      return false;
    }

    if (text.trim()) {
      dispatch({
        type: "addTask",
        payload: {
          text: text,
          favorite: false,
        },
      });
    }

    setText("");
  };

  const handleRemove = (id) => {
    dispatch({
      type: "deleteTask",
      payload: id,
    });
  };

  const makeFavorite = (id) => {
    dispatch({
      type: "patchTask",
      payload: id,
    });
  };

  return (
    <div className={style.container}>
      <form onSubmit={(e) => addTodo(e)} className={style.form}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={style.input}
          type="text"
        />
        <button className={style.btn}>add</button>
      </form>
      <div className={style.list}>
        {list.map((item, index) => {
          return (
            <div
              className={`${style.item} ${item.favorite ? style.selected : ""}`}
            >
              <button
                className={style.favorite}
                onClick={() => makeFavorite(index)}
              >
                ★
              </button>
              <p>{item.text}</p>
              <button
                onClick={() => handleRemove(index)}
                className={style.remove}
              >
                ❌
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tasks;

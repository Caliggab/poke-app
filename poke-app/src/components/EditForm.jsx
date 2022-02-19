import { useRef, useState } from "react";
import styles from './EditForm.module.css'

const EditForm = (props) => {
  const [isInvalid, setIsInvalid] = useState(false);

  let enteredNickname = useRef("");

  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + " " + time;

  const onSaveHandler = (event) => {
    event.preventDefault();

    let newName = enteredNickname.current.value;
    if (newName.length < 2) {
      setIsInvalid(true);
      return;
    }

    let editTime = dateTime;

    props.onEdit(
      newName,
      props.url,
      props.nickname,
      props.addTime,
      props.id,
      editTime
    );
    props.setEdit();
  };
  return (
    <form >
      <input
        type="text"
        placeholder="New Nickname!"
        ref={enteredNickname}
      ></input>
      {isInvalid ? (
        <div className={styles.error}>Please enter a valid/longer nickname</div>
      ) : (
        ""
      )}
      <div>
        <button onClick={onSaveHandler}>Save</button>
        <button onClick={props.setEdit}>Close</button>
      </div>
    </form>
  );
};

export default EditForm;

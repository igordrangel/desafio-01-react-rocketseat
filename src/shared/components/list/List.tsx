import { FormList } from "./FormList";
import { useState, ChangeEvent } from 'react';
import { TaskProps } from './List.interface';
import { Trash } from "phosphor-react";

import ClipboardIcon from '../../../assets/clipboard.svg';
import styles from './List.module.css';
import { Checkbox } from "../checkbox/Checkbox";

export function List() {
  const [taskList, setTaskList] = useState<TaskProps[]>([]);
  const [checkedTaskList, setCheckedTaskList] = useState<TaskProps[]>([]);

  function saveTaskOnList(task: TaskProps) {
    setTaskList([...taskList, task]);
  }

  function checkTask(event: ChangeEvent<HTMLInputElement>, task: TaskProps) {
    task.checked = event.target.checked;
    if (event.target.checked) {
      setCheckedTaskList([...checkedTaskList, task]);
    } else {
      setCheckedTaskList(checkedTaskList.filter(checkedTask => checkedTask.content !== task.content));
    }
  }

  function deleteTask(deletedTask: TaskProps) {
    setTaskList(taskList.filter(task => task.content !== deletedTask.content));
    setCheckedTaskList(checkedTaskList.filter(checkedTask => checkedTask.content !== deletedTask.content));
  }

  function renderList(isEmpty: boolean) {
    if (isEmpty) {
      return (
        <div className={styles.emptyList}>
          <img src={ClipboardIcon} />
          <p>Você ainda não tem tarefas cadastradas</p>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
      );
    } else {
      return taskList.map(task =>
        <div
          key={task.content}
          className={styles.taskContent + ' ' + (task.checked
            ? styles.taskContentChecked
            : ''
          )}>
          <Checkbox
            checked={task.checked}
            onChange={(event) => checkTask(event, task)} />

          <p>{task.content}</p>

          <button onClick={() => deleteTask(task)}>
            <Trash size={24} />
          </button>
        </div>
      );
    }
  }

  const isEmptyList = taskList.length === 0;

  return (
    <section className={styles.list}>
      <div className={styles.content}>
        <FormList onCreate={saveTaskOnList} />

        <div className={styles.listContent}>

          <div className={styles.listInfo}>

            <div className={styles.listInfoItem}>
              <strong>Tarefas criadas</strong>
              <span>{taskList.length}</span>
            </div>

            <div className={styles.listInfoItem}>
              <strong>Concluídas</strong>
              <span>{checkedTaskList.length}</span>
            </div>
          </div>

          <div className={styles.listTasks}>
            {renderList(isEmptyList)}
          </div>
        </div>
      </div>
    </section>
  );
}
import { PlusCircle } from "phosphor-react";

import styles from './FormList.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import { TaskProps } from "./List.interface";

interface FormListProps {
  onCreate: (task: TaskProps) => void;
}

export function FormList({ onCreate }: FormListProps) {
  const [newTaskText, setNewTaskText] = useState('');

  function createTask(event: FormEvent) {
    event.preventDefault();
    onCreate({
      checked: false,
      content: newTaskText,
    });
    setNewTaskText('');
  }

  function handleNewTaskText(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value);
  }

  const noHasTextOnFieldTask = !newTaskText;

  return (
    <form onSubmit={createTask} className={styles.formList}>
      <input
        type='text'
        value={newTaskText}
        onChange={handleNewTaskText}
        placeholder="Adicione uma nova tarefa"
      />

      <button
        type='submit'
        disabled={noHasTextOnFieldTask}>
        Criar
        <PlusCircle size={20} />
      </button>
    </form>
  );
}
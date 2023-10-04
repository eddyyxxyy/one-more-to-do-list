import { ChangeEvent, FormEvent, useState } from 'react';

import { Header } from './components/Header';
import { Input } from './components/Input';
import { ButtonPlus } from './components/ButtonPlus';

import styles from './App.module.css';

export function App() {
  const [newTask, setNewTask] = useState('');

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function handleCreateTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log('Create task');
  }

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <form className={styles.newTask} onSubmit={handleCreateTask}>
          <label className="srOnly" htmlFor="newTask">
            Adicione uma nova tarefa
          </label>
          <Input
            type="text"
            id="newTask"
            name="newTask"
            value={newTask}
            onChange={handleInputChange}
            aria-label="Adicione uma nova tarefa"
            placeholder="Adicione uma nova tarefa"
            required
          />
          <ButtonPlus
            type="submit"
            text="Criar"
            title="Criar tarefa"
            aria-label="Criar tarefa"
            disabled={!newTask}
          />
        </form>
      </main>
    </div>
  );
}

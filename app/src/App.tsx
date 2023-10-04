import { useState } from 'react';

import { Header } from './components/Header';
import { Input } from './components/Input';

import styles from './App.module.css';

export function App() {
  const [newTask, setNewTask] = useState('');

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <form className={styles.newTask}>
          <label className="srOnly" htmlFor="newTask">
            Adicione uma nova tarefa
          </label>
          <Input
            type="text"
            name="newTask"
            value={newTask}
            aria-label="Adicione uma nova tarefa"
            placeholder="Adicione uma nova tarefa"
            onChange={(e) => setNewTask(e.target.value)}
            required
          />
        </form>
      </main>
    </div>
  );
}

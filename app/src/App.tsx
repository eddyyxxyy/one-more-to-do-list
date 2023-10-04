import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { Header } from './components/Header';
import { Input } from './components/Input';
import { Button } from './components/Button';

import styles from './App.module.css';
import { ClipboardText, PlusCircle } from '@phosphor-icons/react';

export function App() {
  const [tasks, setTasks] = useState<object[]>([]);
  const [createdTasks, setCreatedTasks] = useState(0);
  // const [finishedTasks, setFinishedTasks] = useState(0); -> Contains the sum of all finished tasks
  const [newTaskDescription, setNewTaskDescription] = useState('');

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskDescription(event.target.value);
  }

  function handleCreateTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setCreatedTasks((prevState) => prevState + 1);
  }

  useEffect(() => {
    const savedTasks = localStorage.getItem('@todo-list-tasks:') ?? 0;

    if (savedTasks) {
      const tasksToBeInserted = JSON.parse(savedTasks) as object[];

      setCreatedTasks(tasksToBeInserted.length);
      setTasks([...tasksToBeInserted]);

      return;
    }

    setTasks([]);
  }, [createdTasks]);

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
            value={newTaskDescription}
            onChange={handleInputChange}
            aria-label="Adicione uma nova tarefa"
            placeholder="Adicione uma nova tarefa"
            required
          />
          <Button
            type="submit"
            text="Criar"
            title="Criar tarefa"
            icon={PlusCircle}
            iconSize={18}
            iconWeight="regular"
            aria-label="Criar tarefa"
            disabled={!newTaskDescription}
          />
        </form>
        <section className={styles.tasks}>
          <header className={styles.tasksHeader}>
            <h2 className="srOnly">Tarefas</h2>
            <h4>
              Tarefas criadas <span>{createdTasks}</span>
            </h4>
            <h4>
              Concluídas <span>0</span>
            </h4>
          </header>
          {!tasks.length ? (
            <div className={styles.noTasksCreated}>
              <ClipboardText
                size={56}
                weight="regular"
                color="var(--gray-400)"
              />
              <div>
                <h3>Você ainda não tem tarefas cadastradas</h3>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
            </div>
          ) : (
            <ul className={styles.tasksList}></ul>
          )}
        </section>
      </main>
    </div>
  );
}

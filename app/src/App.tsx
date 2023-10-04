import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Header } from './components/Header';
import { Input } from './components/Input';
import { Button } from './components/Button';
import { ConfirmationModal } from './components/ConfirmationModal';

import {
  CheckCircle,
  Circle,
  ClipboardText,
  PlusCircle,
} from '@phosphor-icons/react';

import { ITask } from './types';

import styles from './App.module.css';

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [createdTasks, setCreatedTasks] = useState(0);
  const [finishedTasks, setFinishedTasks] = useState(0);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskDescription(event.target.value);
  }

  function handleCreateTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const task: ITask = {
      id: uuidv4(),
      description: newTaskDescription,
      isFinished: false,
    };

    setTasks((prevState) => {
      const newTasks = [...prevState, task];
      localStorage.setItem('@todo-list-tasks:', JSON.stringify(newTasks));
      return newTasks;
    });

    setCreatedTasks((prevState) => prevState + 1);
  }

  useEffect(() => {
    const savedTasks = localStorage.getItem('@todo-list-tasks:');

    if (savedTasks) {
      try {
        const tasksToBeInserted = JSON.parse(savedTasks) as ITask[];
        const finishedTasks = tasksToBeInserted.filter(
          (task) => task.isFinished === true,
        );

        setCreatedTasks(tasksToBeInserted.length);
        setFinishedTasks(finishedTasks.length);
        setTasks([...tasksToBeInserted]);
      } catch {
        setModalIsOpen(true);
        setTasks([]);
        localStorage.setItem('@todo-list-tasks:', JSON.stringify(tasks));
      }
    } else {
      setTasks([]);
    }
  }, []);

  return (
    <>
      <ConfirmationModal
        title="Problemas com as tarefas cadastradas"
        text="Encontramos problemas nos dados armazenados no navegador, provavelmente devido a uma alteração manual. Suas tarefas serão perdidas."
        isOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
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
                Concluídas <span>{finishedTasks}</span>
              </h4>
            </header>
            {tasks.length === 0 ? (
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
              <ul className={styles.tasksList}>
                {tasks.map((task) => (
                  <li key={task.id} className={styles.task}>
                    <div className={styles.taskInfo}>
                      {task.isFinished ? (
                        <button
                          type="button"
                          title="Marcar como concluída"
                          aria-label="Marcar como concluída"
                        >
                          <CheckCircle
                            size={18}
                            weight="fill"
                            color="var(--purple-100)"
                          />
                        </button>
                      ) : (
                        <Circle
                          size={18}
                          weight="regular"
                          color="var(--blue-300)"
                        />
                      )}
                      {task.description}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </main>
      </div>
    </>
  );
}

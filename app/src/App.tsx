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
  Trash,
} from '@phosphor-icons/react';

import { ITask } from './types';

import styles from './App.module.css';

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [createdTasks, setCreatedTasks] = useState<number>(0);
  const [finishedTasks, setFinishedTasks] = useState<number>(0);
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
    setNewTaskDescription('');
  }

  function handleMarkAsComplete(id: string) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isFinished: !task.isFinished };
      }
      return task;
    });

    setTasks([...newTasks]);

    const finishedCount = newTasks.filter(
      (task) => task.isFinished === true,
    ).length;
    setFinishedTasks(finishedCount);
    localStorage.setItem('@todo-list-tasks:', JSON.stringify(newTasks));
  }

  function handleRemoveTask(id: string) {
    const newTasks = tasks.filter((task) => task.id !== id);

    const finishedCount = newTasks.filter(
      (task) => task.isFinished === true,
    ).length;

    setTasks([...newTasks]);
    setCreatedTasks(newTasks.length);
    setFinishedTasks(finishedCount);
    localStorage.setItem('@todo-list-tasks:', JSON.stringify(newTasks));
  }

  useEffect(() => {
    const savedTasks = localStorage.getItem('@todo-list-tasks:');

    if (savedTasks) {
      try {
        const tasksToBeInserted = JSON.parse(savedTasks) as ITask[];

        const finishedCount = tasksToBeInserted.filter(
          (task) => task.isFinished === true,
        ).length;

        setCreatedTasks(tasksToBeInserted.length);
        setFinishedTasks(finishedCount);
        setTasks([...tasksToBeInserted]);
      } catch {
        setModalIsOpen(true);
        setTasks([]);
        localStorage.setItem('@todo-list-tasks:', JSON.stringify([]));
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
                    {task.isFinished ? (
                      <button
                        type="button"
                        title="Desmarcar como concluída"
                        aria-label="Desmarcar como concluída"
                        onClick={() => handleMarkAsComplete(task.id)}
                      >
                        <CheckCircle
                          className={styles.checked}
                          size={18}
                          weight="fill"
                          color="var(--purple-100)"
                        />
                      </button>
                    ) : (
                      <button
                        type="button"
                        title="Marcar como concluída"
                        aria-label="Marcar como concluída"
                        onClick={() => handleMarkAsComplete(task.id)}
                      >
                        <Circle
                          size={18}
                          weight="regular"
                          color="var(--blue-300)"
                        />
                      </button>
                    )}
                    <div className={styles.taskInfo}>
                      <p>{task.description}</p>
                    </div>
                    <button
                      className={styles.deleteTask}
                      type="button"
                      title="Remover tarefa"
                      aria-label="Remover tarefa"
                      onClick={() => handleRemoveTask(task.id)}
                    >
                      <Trash size={20} />
                    </button>
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

import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";

import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";
import Searchbar from "./components/Searchbar";
import FilterToggle from "./components/FilterToggle";
import AddTaskModal from "./components/AddTaskModal";
import TaskList from "./components/TaskList";

const App = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme === 'dark' ? 'dark' : 'light';
  });

  const [filter, setFilter] = useState<"all" | "completed" | "non-completed">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    document.body.className = theme;
  },[theme]);

  useEffect(() => {
    localStorage.setItem('theme',theme);
  },[theme]);

  //save tasks to LS whenever they change
  useEffect(() => {
    localStorage.setItem('tasks',JSON.stringify(tasks));
  },[tasks]);

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed" && !task.completed) return false;
    if (filter === "non-completed" && task.completed) return false;

    if(searchTerm && !task.name.toLowerCase().includes(searchTerm.toLowerCase())){
      return false;
    }
    return true; // All tasks when the filter is "all"
  });

  // Toggle task completion (checkbox)
  const toggleTaskCompletion = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Add a new task
  const addTask = (taskName: string) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now().toString(), name: taskName, completed: false },
    ]);
  };

  // Deletes task
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="container">
      <Header />
      <div className="innerContainer">
        <div className="search-bar">
          <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className="filter-toggle">
          <FilterToggle filter={filter} setFilter={setFilter} />
        </div>
        <div className="theme-toggle">
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </div>

      {(showAddModal || editingTask) && (
        <AddTaskModal
          onAdd={(name) => {
            if (editingTask) {
              setTasks((prev) =>
                prev.map((task) =>
                  task.id === editingTask.id ? { ...task, name } : task
                )
              );
              setEditingTask(null);
            } else {
              addTask(name);
            }
            setShowAddModal(false);
          }}
          onCancel={() => {
            setShowAddModal(false);
            setEditingTask(null);
          }}
          defaultValue={editingTask?.name || ""}
        />
      )}

      {filteredTasks.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="No tasks"
            style={{ width: "150px", height: "150px", opacity: 0.7, marginBottom: "10px" }}
          />
          <p style={{ fontStyle: "italic", color: "#888" }}>No tasks found.</p>
        </div>
      ) : (
        <TaskList 
          tasks={filteredTasks} 
          onToggle={toggleTaskCompletion} 
          onDelete={deleteTask}
          onEdit={(task) => setEditingTask(task)}
        />
      )}

      <button
        onClick={() => setShowAddModal(true)}
        className="add-task-button"
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default App;
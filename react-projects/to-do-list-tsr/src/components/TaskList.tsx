import { FaEdit, FaTrash } from "react-icons/fa";

interface Task {
  id: string;
  name: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete, onEdit }) => {
  if(tasks.length === 0){
    /* This is taken from App.tsx, probable reason for error */
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="No tasks"
            style={{ width: "150px", height: "150px", opacity: 0.7, marginBottom: "10px" }}
          />
          <p style={{ fontStyle: "italic", color: "#888" }}>No tasks found.</p>
      </div>
    );
  }

  return (
    <ul style={{ width: "100%", maxWidth: "600px" }}>
      {tasks.map((task) => (
        <li key={task.id} style={{ marginBottom: "12px" }}>
          <label
            style={{
              fontSize: "1.2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              borderBottom: "1px solid blue",
              padding: "10px",
              borderRadius: "8px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                style={{ transform: "scale(1.5)", cursor: "pointer" }}
              />
              <span className={`task-text ${task.completed ? 'completed' : ' '}`}>
                {task.name}
              </span>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => onEdit(task)} style={{ background: "none", border: "none" }}>
                <FaEdit style={{ fontSize: "1.2rem", color: "#4b89e7", cursor: "pointer" }} />
              </button>
              <button onClick={() => onDelete(task.id)} style={{ background: "none", border: "none" }}>
                <FaTrash style={{ fontSize: "1.2rem", color: "#d9534f", cursor: "pointer" }} />
              </button>
            </div>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;

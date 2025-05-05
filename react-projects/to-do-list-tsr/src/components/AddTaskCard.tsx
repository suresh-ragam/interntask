import { useState } from "react";

interface Props {
  onAdd: (name: string) => void;
}

const AddTaskCard = ({ onAdd }: Props) => {
  const [taskName, setTaskName] = useState("");

  const handleAdd = () => {
    if (taskName.trim()) {
      onAdd(taskName);
      setTaskName("");
    }
  };

  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "1rem",
      marginBottom: "1rem",
      borderRadius: "8px"
    }}>
      <input
        type="text"
        placeholder="Enter task name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        style={{ padding: "0.5rem", width: "70%", marginRight: "0.5rem" }}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default AddTaskCard;

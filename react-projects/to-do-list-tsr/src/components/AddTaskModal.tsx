import { useState } from "react";

interface AddTaskModalProps {
  onAdd: (name: string) => void;
  onCancel: () => void;
  defaultValue?: string;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  onAdd,
  onCancel,
  defaultValue = ""
}) => {
  const [input, setInput] = useState(defaultValue);

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 style = {{ color: 'purple'}}>{defaultValue ? "Edit Task" : "New Note"}</h2>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task name"
        />
        <div>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={() => onAdd(input)} disabled={!input.trim()}>
            {defaultValue ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;

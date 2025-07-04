import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaCheck, FaFilter, FaSort } from "react-icons/fa";

const Tasks = ({ isOpen, onClose }) => {
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      title: "Complete project proposal", 
      description: "Finish the proposal for the new client project",
      deadline: "2025-04-15",
      priority: "high",
      status: "pending",
      progress: 25
    },
    { 
      id: 2, 
      title: "Review code changes", 
      description: "Review pull requests from the development team",
      deadline: "2025-04-10",
      priority: "medium",
      status: "in-progress",
      progress: 50
    },
    { 
      id: 3, 
      title: "Update documentation", 
      description: "Update the API documentation with new endpoints",
      deadline: "2025-04-05",
      priority: "low",
      status: "completed",
      progress: 100
    }
  ]);

  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("deadline");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "medium",
    status: "pending",
    progress: 0
  });

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  // Sort tasks based on current sort settings
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "deadline") {
      const dateA = new Date(a.deadline);
      const dateB = new Date(b.deadline);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    } else if (sortBy === "priority") {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return sortOrder === "asc" 
        ? priorityOrder[a.priority] - priorityOrder[b.priority]
        : priorityOrder[b.priority] - priorityOrder[a.priority];
    } else if (sortBy === "progress") {
      return sortOrder === "asc" ? a.progress - b.progress : b.progress - a.progress;
    }
    return 0;
  });

  const handleAddTask = () => {
    if (!newTask.title || !newTask.deadline) return;
    
    const task = {
      id: Date.now(),
      ...newTask
    };
    
    setTasks([...tasks, task]);
    setNewTask({
      title: "",
      description: "",
      deadline: "",
      priority: "medium",
      status: "pending",
      progress: 0
    });
    setIsAddingTask(false);
  };

  const handleEditTask = (task: React.SetStateAction<{ title: string; description: string; deadline: string; priority: string; status: string; progress: number; }>) => {
    setIsEditingTask(task.id);
    setNewTask({...task});
  };

  const handleUpdateTask = () => {
    if (!newTask.title || !newTask.deadline) return;
    
    setTasks(tasks.map(task => 
      task.id === isEditingTask ? {...newTask} : task
    ));
    
    setIsEditingTask(null);
    setNewTask({
      title: "",
      description: "",
      deadline: "",
      priority: "medium",
      status: "pending",
      progress: 0
    });
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleStatus = (id: number) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const newStatus = task.status === "completed" ? "pending" : "completed";
        const newProgress = newStatus === "completed" ? 100 : 0;
        return {...task, status: newStatus, progress: newProgress};
      }
      return task;
    }));
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-orange-100 text-orange-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Task Management</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="p-6">
          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <button 
              onClick={() => setIsAddingTask(true)}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              <FaPlus /> Add New Task
            </button>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-500" />
                <select 
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Tasks</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <FaSort className="text-gray-500" />
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="deadline">Deadline</option>
                  <option value="priority">Priority</option>
                  <option value="progress">Progress</option>
                </select>
                <button 
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  className="p-2 border rounded hover:bg-gray-100"
                >
                  {sortOrder === "asc" ? "↑" : "↓"}
                </button>
              </div>
            </div>
          </div>
          
          {/* Add/Edit Task Form */}
          {(isAddingTask || isEditingTask) && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-4">
                {isEditingTask ? "Edit Task" : "Add New Task"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-500 mb-1">Title</label>
                  <input 
                    type="text" 
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-500 mb-1">Deadline</label>
                  <input 
                    type="date" 
                    value={newTask.deadline}
                    onChange={(e) => setNewTask({...newTask, deadline: e.target.value})}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-500 mb-1">Priority</label>
                  <select 
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-500 mb-1">Status</label>
                  <select 
                    value={newTask.status}
                    onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-500 mb-1">Description</label>
                  <textarea 
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    rows="3"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-500 mb-1">Progress ({newTask.progress}%)</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={newTask.progress}
                    onChange={(e) => setNewTask({...newTask, progress: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button 
                  onClick={() => {
                    setIsAddingTask(false);
                    setIsEditingTask(null);
                    setNewTask({
                      title: "",
                      description: "",
                      deadline: "",
                      priority: "medium",
                      status: "pending",
                      progress: 0
                    });
                  }}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button 
                  onClick={isEditingTask ? handleUpdateTask : handleAddTask}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {isEditingTask ? "Update Task" : "Add Task"}
                </button>
              </div>
            </div>
          )}
          
          {/* Tasks List */}
          {sortedTasks.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Task</th>
                    <th className="py-3 px-6 text-left">Deadline</th>
                    <th className="py-3 px-6 text-center">Priority</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Progress</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                  {sortedTasks.map(task => (
                    <tr key={task.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-6 text-left">
                        <div className="font-medium">{task.title}</div>
                        <div className="text-xs text-gray-500">{task.description}</div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        {new Date(task.deadline).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
                          {task.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs">{task.progress}%</span>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center gap-2">
                          <button 
                            onClick={() => handleToggleStatus(task.id)}
                            className="transform hover:text-green-500 hover:scale-110"
                            title={task.status === "completed" ? "Mark as Pending" : "Mark as Completed"}
                          >
                            <FaCheck />
                          </button>
                          <button 
                            onClick={() => handleEditTask(task)}
                            className="transform hover:text-blue-500 hover:scale-110"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            onClick={() => handleDeleteTask(task.id)}
                            className="transform hover:text-red-500 hover:scale-110"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No tasks found. Add a new task to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
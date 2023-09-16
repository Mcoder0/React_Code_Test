import React, { useEffect, useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

const Kanban = () => {
  const [tasks, setTasks] = useState([
    { name: "task 0", stage: 0 },
    { name: "task 1", stage: 0 },
  ]);
  const [stagesNames, setStagesNames] = useState([
    "Backlog",
    "To Do",
    "Ongoing",
    "Done",
  ]);
  const [stagesTasks, setStagesTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < stagesNames.length; ++i) {
      arr.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      arr[stageId].push(task);
    }
    setStagesTasks(arr);
  }, [tasks]);

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const createTaskHandler = () => {
    if (!inputValue.trim()) return;
    setTasks([...tasks, { name: inputValue, stage: 0 }]);
    setInputValue("");
  };

  //back arrow - find the task with the same taskName and decrease 1 to the task's stage
  const backHandler = (taskName) => {
    const newTasks = [...tasks];
    for (let newTask of newTasks) {
      if (newTask.name === taskName) {
        newTask.stage = newTask.stage - 1;
        break;
      }
    }
    setTasks(newTasks);
  };

  //forward arrow - find the task with the same taskName and increase 1 to the task's stage
  const forwardHandler = (taskName) => {
    const newTasks = [...tasks];
    for (let newTask of newTasks) {
      if (newTask.name === taskName) {
        newTask.stage = newTask.stage + 1;
        break;
      }
    }
    setTasks(newTasks);
  };

  const deleteHandler = (taskName) => {
    const newTasks = tasks.filter((task) => task.name !== taskName);
    setTasks(newTasks);
  };

  return (
    <div className="flex flex-col justify-around items-center mx-20 my-20">
      <div>
        <input
          type="text"
          className="w-80 h-10 border rounded mr-10 pl-4 outline-0"
          value={inputValue}
          onChange={inputChangeHandler}
        />
        <button
          className="w-32 h-10 rounded text-white bg-green-600 hover:bg-green-700"
          onClick={createTaskHandler}
        >
          Create A Task
        </button>
      </div>

      <div className="flex justify-center mt-10">
        {stagesTasks.map((tasks, index) => {
          return (
            <div
              key={index}
              className="mx-5 min-w-[300px] min-h-[400px] border rounded bg-gray-100"
            >
              <div>
                <h2 className="text-center font-bold mt-2 mb-8">
                  {stagesNames[index]}
                </h2>
                <ul>
                  {tasks.map((task, index) => {
                    const { name, stage } = task;
                    return (
                      <li key={index}>
                        <div className="flex justify-between items-center mx-5 my-2 text-sm">
                          <span>{name}</span>
                          <div>
                            <button
                              className="hover:bg-green-100"
                              onClick={() => backHandler(name)}
                              disabled={stage === 0 ? true : false}
                            >
                              <ArrowLeftIcon className="h-4 w-7 text-green-600" />
                            </button>
                            <button
                              className="hover:bg-green-100"
                              onClick={() => forwardHandler(name)}
                              disabled={
                                stage === stagesNames.length - 1 ? true : false
                              }
                            >
                              <ArrowRightIcon className="h-4 w-7 text-green-600" />
                            </button>
                            <button
                              className="hover:bg-red-100"
                              onClick={() => deleteHandler(name)}
                            >
                              <TrashIcon className="h-4 w-7 text-red-800" />
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Kanban;

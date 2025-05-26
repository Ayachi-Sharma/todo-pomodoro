let totalTime = 25 * 60;
    let remainingTime = totalTime;
    let timerInterval = null;

    function updateDisplay() {
      const minutes = String(Math.floor(remainingTime / 60)).padStart(2, '0');
      const seconds = String(remainingTime % 60).padStart(2, '0');
      document.getElementById('timer').innerText = `${minutes}:${seconds}`;
    }

    function startTimer() {
      if (timerInterval) return;

      const inputMinutes = parseInt(document.getElementById('customTime').value) || 25;
      if (remainingTime === totalTime || remainingTime === 0) {
        totalTime = inputMinutes * 60;
        remainingTime = totalTime;
      }

      updateDisplay();

      timerInterval = setInterval(() => {
        if (remainingTime > 0) {
          remainingTime--;
          updateDisplay();
        } else {
          clearInterval(timerInterval);
          timerInterval = null;
          alert('Pomodoro complete! Take a break.');
        }
      }, 1000);
    }

    function pauseTimer() {
      console.log("time paused at");      
      clearInterval(timerInterval);
      timerInterval = null;
    }

    function resetTimer() {
      clearInterval(timerInterval);
      timerInterval = null;
      const inputMinutes = parseInt(document.getElementById('customTime').value) || 25;
      totalTime = inputMinutes * 60;
      remainingTime = totalTime;
      updateDisplay();
    }

function addTask(taskName = null) {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  const value = taskName || taskInput.value.trim();
  if (value === "") return;

  const li = document.createElement("li");
  li.className =
    "task-item flex items-center justify-between bg-white px-4 py-3 rounded-xl shadow transition-all duration-200 hover:-translate-y-[1px] hover:shadow-lg";

  const leftSide = document.createElement("div");
  leftSide.className = "flex items-center gap-3";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "form-checkbox h-5 w-5 text-green-600 cursor-pointer";

  const span = document.createElement("span");
  span.textContent = value;
  span.className = "text-lg text-gray-800";

  checkbox.onchange = function () {
    span.classList.toggle("line-through", this.checked);
    span.classList.toggle("text-gray-500", this.checked);
  };

  leftSide.appendChild(checkbox);
  leftSide.appendChild(span);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-icon";
  deleteBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>`;
  deleteBtn.onclick = () => {
    li.classList.add("removing");
    setTimeout(() => li.remove(), 200);
  };

  li.appendChild(leftSide);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  if (!taskName) taskInput.value = "";
}

window.onload = function () {
  const defaultTasks = ["Coffee", "Walk", "Nap"];
  defaultTasks.forEach((task) => addTask(task));
};

    updateDisplay();

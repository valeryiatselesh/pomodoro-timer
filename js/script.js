'use strict';
window.addEventListener('DOMContentLoaded', function () {
   // Tabs
   let tabs = document.querySelectorAll('.tabheader__item'),
       tabsContent = document.querySelectorAll('.tabcontent'),
       tabsParent = document.querySelector('.tabheader__items');

   function hideTabContent() {
      tabsContent.forEach(item => {
         item.classList.add('hide');
         item.classList.remove('show', 'fade');
      });
      tabs.forEach(item => {
         item.classList.remove('tabheader__item_active');
      });
   }

   function showTabContent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('tabheader__item_active');
   }

   hideTabContent();
   showTabContent();

   tabsParent.addEventListener('click', function (event) {
      const target = event.target;
      if (target && target.classList.contains('tabheader__item')) {
         tabs.forEach((item, i) => {
            if (target == item) {
               hideTabContent();
               showTabContent(i);
            }
         });
      }
   });
   
   // Timer
   const buttonPlay = document.getElementById('buttonPlay');
   const buttonBreak = document.getElementById('buttonBreak');
   const buttonBreakLong = document.getElementById('buttonBreakLong');

   const buttonSkip = document.querySelector('.skip__timer');
   const buttonSkipBreak = document.querySelector('.skip__break');
   const buttonSkipBreakLong = document.getElementById('buttonSkipBreakLong');

   const timeLeftDOM = document.getElementById('timeLeft');
   const timeLeftBreakDOM = document.getElementById('timeLeftBreak');
   const timeLeftBreakLongDOM = document.getElementById('timeLeftBreakLong');

   const buttonReload = document.getElementById('buttonReload');

   const pomodoroIncrement = document.getElementById('pomodoroIncrement');
   const pomodoroDecrement = document.getElementById('pomodoroDecrement');
   const breakIncrement = document.getElementById('breakIncrement');
   const breakDecrement = document.getElementById('breakDecrement');
   const breakLongIncrement = document.getElementById('breakLongIncrement');
   const breakLongDecrement = document.getElementById('breakLongDecrement');
   const pomodoroValue = document.getElementById('pomodoroValue');
   const shortBreakValue = document.getElementById('shortBreakValue');
   const longBreakValue = document.getElementById('longBreakValue');

   const arrayTime = timeLeftDOM.innerText.split(":");
   let timeLeft = parseInt(arrayTime[0] * 60) + parseInt(arrayTime[1]);
   const arrayTimeBreak = timeLeftBreakDOM.innerText.split(":");
   let timeLeftBreak = parseInt(arrayTimeBreak[0] * 60) + parseInt(arrayTimeBreak[1]);
   const arrayTimeBreakLong = timeLeftBreakLongDOM.innerText.split(":");
   let timeLeftBreakLong = parseInt(arrayTimeBreakLong[0] * 60) + parseInt(arrayTimeBreakLong[1]);

   let timeLength = 25 * 60;
   let breakLength = 5 * 60;
   let breakLongLength = 15 * 60;

   let playIsClicked = true;
   let interval;

   function fromSeconds(seconds) {
      return {
         minutes: Math.floor(seconds / 60),
         seconds: seconds % 60
      }
   }

   function timer() {
      if (playIsClicked) {
         if (interval) {
            clearInterval(interval)
         }
         interval = setInterval(handleTime, 1000);

         function handleTime() {
            if (timeLeft <= 0) {
               timeLeft = timeLength;
               timeLeftDOM.innerText = ('0' + result).slice(-2) + ":00";
               if (!playIsClicked) {
                  buttonPlay.click();
               }
               hideTabContent(0);
               showTabContent(1);
            } else if (playIsClicked) {
               clearInterval(interval);
            } else {
               timeLeft--;
               const minutesAndSeconds = fromSeconds(timeLeft);
               timeLeftDOM.innerText = `${('0' + minutesAndSeconds.minutes).slice(-2)}:${('0' + minutesAndSeconds.seconds).slice(-2)}`;
               buttonPlay.textContent = "Pause";
               buttonPlay.classList.add("pomodoro__stop");
               buttonSkip.classList.add('show');
               buttonSkip.classList.remove('hide');
            }
         }
      } else {
         buttonPlay.textContent = "Start";
         buttonPlay.classList.remove("pomodoro__stop");
         buttonSkip.classList.add('hide');
         buttonSkip.classList.remove('show');
      }

      playIsClicked = !playIsClicked;
   };
   function timerBreak() {
      if (playIsClicked) {
         if (interval) {
            clearInterval(interval)
         }
         interval = setInterval(handleTime, 1000);

         function handleTime() {
            if (timeLeftBreak <= 0) {
               timeLeftBreak = breakLength;
               timeLeftBreakDOM.innerText = ('0' + resultBreak).slice(-2) + ":00";
               if (!playIsClicked) {
                  buttonBreak.click();
               }
               hideTabContent(0);
               showTabContent(1);
            } else if (playIsClicked) {
               clearInterval(interval);
            } else {
               timeLeftBreak--;
               const minutesAndSeconds = fromSeconds(timeLeftBreak);
               timeLeftBreakDOM.innerText = `${('0' + minutesAndSeconds.minutes).slice(-2)}:${('0' + minutesAndSeconds.seconds).slice(-2)}`;
               buttonBreak.textContent = "Pause";
               buttonBreak.classList.add("short__stop");
               buttonSkipBreak.classList.add('show');
               buttonSkipBreak.classList.remove('hide');
            }
         }
      } else {
         buttonBreak.textContent = "Start";
         buttonBreak.classList.remove("short__stop");
         buttonSkipBreak.classList.add('hide');
         buttonSkipBreak.classList.remove('show');
      }
      playIsClicked = !playIsClicked;
   };
   function timerBreakLong() {
      if (playIsClicked) {
         if (interval) {
            clearInterval(interval)
         }
         interval = setInterval(handleTime, 1000);

         function handleTime() {
            if (timeLeftBreakLong <= 0) {
               timeLeftBreakLong = breakLongLength;
               timeLeftBreakLongDOM.innerText = ('0' + resultBreakLong).slice(-2) + ":00";
               if (!playIsClicked) {
                  buttonBreakLong.click();
               }
               hideTabContent(2);
               showTabContent(0);
            } else if (playIsClicked) {
               clearInterval(interval);
            } else {
               timeLeftBreakLong--;
               const minutesAndSeconds = fromSeconds(timeLeftBreakLong);
               timeLeftBreakLongDOM.innerText = `${('0' + minutesAndSeconds.minutes).slice(-2)}:${('0' + minutesAndSeconds.seconds).slice(-2)}`;
               buttonBreakLong.textContent = "Pause";
               buttonBreakLong.classList.add("long__stop");
               buttonSkipBreakLong.classList.add('show');
               buttonSkipBreakLong.classList.remove('hide');
            }
         }
      } else {
         buttonBreakLong.textContent = "Start";
         buttonBreakLong.classList.remove("long__stop");
         buttonSkipBreakLong.classList.add('hide');
         buttonSkipBreakLong.classList.remove('show');
      }
      playIsClicked = !playIsClicked;
   };

   buttonPlay.addEventListener('click', timer);
   buttonBreak.addEventListener('click', timerBreak);
   buttonBreakLong.addEventListener('click', timerBreakLong);

   let result = 1;
   function setLengthTimer(lengthValue, modalValue, element, elementModal, isIncr) {
      if (isIncr) {
         result = ++lengthValue;
         result = ++modalValue;
         element.innerText = result;
         elementModal.innerText = result;
      } else {
         if (lengthValue != 1) {
            result = --lengthValue;
            result = --modalValue;
            element.innerText = result;
            elementModal.innerText = result;
         }
      }
      if (!playIsClicked) {
         buttonPlay.click();
      }
      let resultSeconds = result * 60;
      timeLength = resultSeconds;
      timeLeftDOM.innerText = ('0' + result).slice(-2) + ":00";
      timeLeft = resultSeconds;

      return resultSeconds;
   }
   pomodoroDecrement.addEventListener('click', () => {
      setLengthTimer(parseInt(timeLeftDOM.innerText), parseInt(pomodoroValue.innerText), timeLeftDOM, pomodoroValue, false);
   });
   pomodoroIncrement.addEventListener('click', () => {
      setLengthTimer(parseInt(timeLeftDOM.innerText), parseInt(pomodoroValue.innerText), timeLeftDOM, pomodoroValue, true);
   });

   let resultBreak = 1;
   function setLengthBreak(lengthValue, modalValue, element, elementModal, isIncr) {
      if (isIncr) {
         resultBreak = ++lengthValue;
         resultBreak = ++modalValue;
         element.innerText = resultBreak;
         elementModal.innerText = resultBreak;
      } else {
         if (lengthValue != 1) {
            resultBreak = --lengthValue;
            resultBreak = --modalValue;
            element.innerText = resultBreak;
            elementModal.innerText = resultBreak;
         }
      }
      if (!playIsClicked) {
         buttonBreak.click();
      }
      let resultSeconds = resultBreak * 60;
      breakLength = resultSeconds;
      timeLeftBreakDOM.innerText = ('0' + resultBreak).slice(-2) + ":00";
      timeLeftBreak = resultSeconds;
      
      return resultSeconds;
   }
   breakDecrement.addEventListener('click', () => {
      setLengthBreak(parseInt(timeLeftBreakDOM.innerText), parseInt(shortBreakValue.innerText), timeLeftBreakDOM, shortBreakValue, false);
   });
   breakIncrement.addEventListener('click', () => {
      setLengthBreak(parseInt(timeLeftBreakDOM.innerText), parseInt(shortBreakValue.innerText), timeLeftBreakDOM, shortBreakValue, true);
   });

   let resultBreakLong = 1;
   function setLengthBreakLong(lengthValue, modalValue, element, elementModal, isIncr) {
      if (isIncr) {
         resultBreakLong = ++lengthValue;
         resultBreakLong = ++modalValue;
         element.innerText = resultBreakLong;
         elementModal.innerText = resultBreakLong;
      } else {
         if (lengthValue != 1) {
            resultBreakLong = --lengthValue;
            resultBreakLong = --modalValue;
            element.innerText = resultBreakLong;
            elementModal.innerText = resultBreakLong;
         }
      }
      if (!playIsClicked) {
         buttonBreakLong.click();
      }
      let resultSeconds = resultBreakLong * 60;
      breakLongLength = resultSeconds;
      timeLeftBreakLongDOM.innerText = ('0' + resultBreakLong).slice(-2) + ":00";
      timeLeftBreakLong = resultSeconds;
      
      return resultSeconds;
   }
   breakLongDecrement.addEventListener('click', () => {
      setLengthBreakLong(parseInt(timeLeftBreakLongDOM.innerText), parseInt(longBreakValue.innerText), timeLeftBreakLongDOM, longBreakValue, false);
   });
   breakLongIncrement.addEventListener('click', () => {
      setLengthBreakLong(parseInt(timeLeftBreakLongDOM.innerText), parseInt(longBreakValue.innerText), timeLeftBreakLongDOM, longBreakValue, true);
   });

   buttonReload.addEventListener('click', () => {
      let timeLength = 25 * 60;
      let breakLength = 5 * 60;
      let breakLongLength = 15 * 60;
      timeLeft = timeLength;
      timeLeftBreak = breakLength;
      timeLeftBreakLong = breakLongLength;
      timeLeftDOM.innerText = "25:00";
      timeLeftBreakDOM.innerText = "05:00";
      timeLeftBreakLongDOM.innerText = "15:00";
      if (!playIsClicked) {
         buttonPlay.click();
         buttonBreak.click();
         buttonBreakLong.click();
      }
   });
   function timerNext() {
      if (!playIsClicked) {
         buttonPlay.click();
      }
      clearInterval(interval);
      hideTabContent(0);
      showTabContent(1);
   }
   function timerNextBreak() {
      if (!playIsClicked) {
         buttonBreak.click();
      }
      clearInterval(interval);
      hideTabContent(1);
      showTabContent(0);
      location.reload();
   }
   function timerNextBreakLong() {
      if (!playIsClicked) {
         buttonBreakLong.click();
      }
      clearInterval(interval);
      hideTabContent(2);
      showTabContent(0);
      location.reload();
   }

   buttonSkip.addEventListener('click', timerNext);
   buttonSkipBreak.addEventListener('click', timerNextBreak);
   buttonSkipBreakLong.addEventListener('click', timerNextBreakLong);

   // Modal
   const buttonModalOpen = document.getElementById('buttonModal'),
         modal = document.getElementById('modal'),
         buttonModalClose = document.getElementById('buttonModalClose'),
         buttonModalSave = document.getElementById('buttonModalSave');

   function openModal() {
      modal.classList.add('open__modal');
      modal.classList.remove('close__modal');
      document.body.style.overflow = 'hidden';
   }
   function closeModal() {
      modal.classList.add('close__modal');
      modal.classList.remove('open__modal');
      document.body.style.overflow = '';
   }

   buttonModalOpen.addEventListener('click', openModal);
   buttonModalClose.addEventListener('click', closeModal);
   buttonModalSave.addEventListener('click', closeModal);

   // Tasks
   const input = document.querySelector("input[type='text']"),
         taskList = document.getElementById("tasksList"),
         saveButton = document.getElementById("saveAllTasks"),
         clearButton = document.getElementById("clearAllTasks"),
         addButton = document.getElementById('addTask');

   function createTask() {
      const li = document.createElement("li");

      const taskContent = document.createElement("span");
      taskContent.classList.add("task__content");
      
      const taskCheckbox = document.createElement("input");
      taskCheckbox.classList.add("task__checkbox");
      taskCheckbox.type = "checkbox";

      const textSpan = document.createElement("span");
      textSpan.classList.add("task__text");
      const newTodo = input.value;
      textSpan.append(newTodo);

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete__task");
      const icon = document.createElement("img");
      icon.src="img/icons/delete_task.svg";
      icon.classList.add("task__icon");
      deleteBtn.appendChild(icon);

      li.appendChild(taskContent).append(taskCheckbox, textSpan);
      taskList.appendChild(li).append(taskContent, deleteBtn);
      input.value = "";
      listenDeleteTask(deleteBtn);
   }
   function listenDeleteTask(element) {
      element.addEventListener("click", (event) => {
         element.parentElement.remove();
         event.stopPropagation();
      });
   }
   function loadTasks() {
      const data = localStorage.getItem("tasks__list");
      if (data) {
         taskList.innerHTML = data;
      }
      const deleteButtons = document.querySelectorAll(".delete__task");
      for (const button of deleteButtons) {
         listenDeleteTask(button);
      }
   }
   
   input.addEventListener("keypress", (keyPressed) => {
      const keyEnter = 13;
      if (keyPressed.which == keyEnter) {
         createTask();
      }
   });
   
   addButton.addEventListener('click', createTask);

   saveButton.addEventListener("click", () => {
      localStorage.setItem("tasks__list", taskList.innerHTML);
   });
   clearButton.addEventListener("click", () => {
      taskList.innerHTML = "";
      localStorage.removeItem('tasks__list', taskList.innerHTML);
   });

   loadTasks();
})


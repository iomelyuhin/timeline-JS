document.addEventListener("DOMContentLoaded", function() {
  // Аналог $(document).ready(function(){
  var timeline = document.querySelector(".timeline-scr"); //Шкаола времени
  var timelineHover = document.querySelector(".timeline-scr__current-time"); //Шкаола времени
  var timeStampsArray = [
    //Массив временных отметок
    ["2020-03-18 07:57:48", "2020-03-18 08:45:28"],
    ["2020-03-18 09:35:48", "2020-03-18 11:02:28"],
    ["2020-03-18 13:05:48", "2020-03-18 16:58:28"],
    ["2020-03-18 17:00:48", "2020-03-18 18:00:28"],
    ["2020-03-18 19:30:48", "2020-03-18 22:00:28"],
    ["2020-03-18 22:20:48", "2020-03-18 23:58:28"]
  ];

  timeline.addEventListener("click", function(e) {
    //
    let targetPoints = e.offsetX;
    let timelineWidth = timeline.offsetWidth;
    let getClickPercents = (targetPoints / timelineWidth) * 100;
    let timepoints = (1440 * getClickPercents) / 100;
    let getTargetHours = Math.floor(timepoints / 60);
    let getTargetMinutes = (timepoints % 60).toFixed(0);
    let currentTime = getTargetHours + ":" + getTargetMinutes;

    console.log(currentTime);
  });
  timeline.addEventListener("mousemove", function(e) {
    //

    let targetPoints = e.offsetX;
    let timelineWidth = timeline.offsetWidth;
    let getClickPercents = (targetPoints / timelineWidth) * 100;
    let timepoints = (1440 * getClickPercents) / 100;
    let getTargetHours = Math.floor(timepoints / 60);
    let getTargetMinutes = (timepoints % 60).toFixed(0);
    let currentTime = getTargetHours + ":" + getTargetMinutes;
    timelineHover.style.left = targetPoints + "px";
    timelineHover.textContent = currentTime;
    timelineHover.classList.add("active");
  });

  timeline.addEventListener("mouseleave", function(e) {
    timelineHover.classList.remove("active");
  });

  function addTimeStamps() {
    let startPassiveContainer = 0; //Начало пассивного контейнера

    for (let i = 0; i < timeStampsArray.length; i++) {
      const timeStamp = timeStampsArray[i];
      let timeStampFromHours = parseInt(timeStamp[0][11] + timeStamp[0][12]); //значение начала диапазона часы

      let timeStampFromMinutes = parseInt(timeStamp[0][14] + timeStamp[0][15]); //значение начала диапазона минуты

      let timeStampToHours = parseInt(timeStamp[1][11] + timeStamp[1][12]); //значение конца диапазона часы

      let timeStampToMinutes = parseInt(timeStamp[1][14] + timeStamp[1][15]); //значение конца диапазона минуты

      let timeStampFromPoints = timeStampFromHours * 60 + timeStampFromMinutes; //значение начала диапазона в пунктах
      let timeStampToPoints = timeStampToHours * 60 + timeStampToMinutes; //значение конца диапазона в пунктах

      //создаём пассивный контейнер
      let passiveContainer = document.createElement("div");

      let passiveClassWidth =
        ((timeStampFromPoints - startPassiveContainer) / 1440) * 100 + "%";

      passiveContainer.classList.add("timeline-scr__item--false");
      passiveContainer.style.width = passiveClassWidth;

      timeline.appendChild(passiveContainer); //добавляем в timeline

      //создаём активный контейнер
      let activeContainer = document.createElement("div");

      let activeContainerWidth =
        ((timeStampToPoints - timeStampFromPoints) / 1440) * 100 + "%";

      activeContainer.classList.add("timeline-scr__item--true");
      activeContainer.style.width = activeContainerWidth;

      timeline.appendChild(activeContainer); //добавляем в timeline

      startPassiveContainer = timeStampToPoints; // меняем значение для пассивного контейнера
    }
  }

  addTimeStamps();
});

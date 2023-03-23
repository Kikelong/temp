var totalSeconds;
var intervalId;
var sound = new Audio("alarm.mp3");
// Solicitar permiso para enviar notificaciones
Notification.requestPermission().then(function(permission) {
  console.log('Permiso de notificación:', permission);
});

function startTimer() {
  var now = moment().utcOffset("-0500"); // hora actual en -0500 UTC
  var target = moment().utcOffset("-0500").startOf("day").add(1, "day"); // mañana a las 12 am en -0500 UTC
  var remaining = target.diff(now, "seconds");
  totalSeconds = remaining + (5 * 60); // 5 minutos
  intervalId = setInterval(tick, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
  document.getElementById("countdown").innerHTML = "";
}

function tick() {
  if (totalSeconds > 0) {
    totalSeconds--;
    var hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60).toString().padStart(2, '0');
    var remainingSeconds = (totalSeconds % 60).toString().padStart(2, '0');
    countdown.innerHTML = "" + hours + ":" + minutes + ":" + remainingSeconds + "";
    
    if (totalSeconds % 300 <= 30) { // suena la alarma cada 4.55 minutos
      sound.play();
    }
  } else {
    sound.play();
    stopTimer();
    alert("¡Tiempo completado!");
  }

  if (totalSeconds % 300 <= 5) { // notificacion 
  // Mostrar notificación
  if (Notification.permission === "granted") {
    var notification = new Notification("Temporizador", {
      body: "¡Han pasado 5 minutos!",
      icon: "luz.png"
    });
  }
}


}


window.addEventListener('load', function() {
    startTimer();
});

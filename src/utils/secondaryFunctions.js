// функция для преобразования минут в часы и минуты
export function getTimeFromMins(mins) {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  return hours + "ч " + minutes + "м";
}


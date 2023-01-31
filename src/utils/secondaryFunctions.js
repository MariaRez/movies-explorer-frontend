// функция для преобразования минут в часы и минуты
export function getTimeFromMins(mins) {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  return hours + "ч " + minutes + "м";
}

// функция для определение количества карточек на странице и сколько дополнительно добавлется при разной величине экрана
export function defineListDisplay(width) {
  // если ширина экрана больше 768, то отрисовываем первоначально 12 карточек, затем добавляем по 3 штуки
  if (width > 768) {
    return { original: 12, extra: 3 };
    // если ширина экрана  меньше или равна 786 и больше 480, то отрисовываем перваначально 8 карточек, затем добавляем по 2 штуки
  } else if ((768 >= width) && (width > 480)) {
    return { original: 8, extra: 2 };
  } else {
    // для ширины экрана меньше 480
    return { original: 5, extra: 2 };
  }
}

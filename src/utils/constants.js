// ошибки
export const CONFLICT_ERROR = 409;
export const INTERNAL_SERVER_ERROR = 500;
// текстовые сообшения
export const CONFLICT_MESSAGE = "Пользователь с таким email уже существует";
export const CONFLICT_MESSAGE_LIKE = "Нет прав для проставления лайка понравившемуся фильму";
export const INTERNAL_SERVER_MESSAGE =
  "Внутренняя ошибка сервера, попробуйте позднее";
export const FAILED_SEARCH_MESSAGE =
  "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";
export const NOT_FOUND_SEARCH_MESSAGE = "Ничего не найдено";

export const DEFAULT_MESSAGE_REGISTER =
  "Очень жаль, произошла ошибка при регистрации пользователя";
export const DEFAULT_MESSAGE_LOGIN =
  "Очень жаль, произошла ошибка при авторизации пользователя";
export const DEFAULT_MESSAGE_UPDATE =
  "Очень жаль, произошла ошибка при изменении данных пользователя";

export const NOT_FOUND_SHORT_SEARCH_MESSAGE =
  "Короткометражные фильмы не найдены";

export const WELCOME_MESSAGE = "Добро пожаловать!";
export const SUCCESSFUL_UPDATE_MESSAGE = "Данные профиля успешно обновлены!";
export const START_SEARCH = "Введите поисковый запрос";
export const NEED_SEARCH_MESSAGE = "Нужно ввести ключевое слово";

//числовые константы
export const SHORT_MOVIES_DURATION = 40;

export const LARGE_WIDTH = 1280;
export const MEDIUM_WIDTH = 768;

export const LARGE_ORIGINAL_AMOUNT = 12;
export const MEDIUM_ORIGINAL_AMOUNT = 8;
export const SMALL_ORIGINAL_AMOUNT = 5;

export const LARGE_EXTRA_AMOUNT = 3;
export const SMALL_EXTRA_AMOUNT = 2;

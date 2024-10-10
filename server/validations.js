import { body } from "express-validator";

export const postCreateValidation = [
  body("title","Введите заголовок статьи").isLength({ min: 3 }).isString(),
  body("text","Введите текст статьи").isLength({ min: 3 }).isString(),
  body("tags", "Неверный формат тэгов").optional().isArray(),
  body("imageUrl", "Неверная ссылка на изображение").optional().isString(),
];

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть больше 8 символов").isLength({ min: 8 }),
  body("fullName", "Имя должно быть больше 3 символов").isLength({ min: 3 }),
  body("avatarUrl", "Неверная ссылка на аватарку").optional().isURL(),
];

export const loginValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть больше 8 символов").isLength({ min: 8 }),
];

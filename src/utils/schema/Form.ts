import { object, string } from "yup";

const RegisterSchema = object({
  name: string()
    .required("Este campo é obrigatório")
    .min(6, "deve ter  pelo menos 6 caracteres")
    .max(20, "maximo de 15 caracteres"),
  email: string()
    .email()
    .required("Este campo é obrigatório")
    .max(60, "maximo de 60 caracteres"),
  password: string()
    .required("Este campo é obrigatório")
    .min(6, "minimo de 6 caracteres")
    .max(20, "maximo de 20 caracteres")
    .test(
      (value, ctx) => value !== null && value == ctx.parent.confirmPassword
    ),
  confirmPassword: string()
    .required("Este campo é obrigatório")
    .min(6, "minimo de 6 caracteres")
    .max(20, "maximo de 20 caracteres"),
});

const LoginSchema = object({
  email: string()
    .email("Este email não é valido")
    .required("Este campo é obrigatório")
    .max(60, "maximo de 60 caracteres"),
  password: string()
    .required("Este campo é obrigatório")
    .min(6, "minimo de 6 caracteres")
    .max(20, "maximo de 20 caracteres"),
});

export { RegisterSchema, LoginSchema };

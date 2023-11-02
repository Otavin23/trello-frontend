import { object, string } from 'yup'

const BoardCreate = object({
  title: string()
    .required('Este campo é obrigatório')
    .min(6, 'minimo de 6 caracteres')
    .max(40, 'maximo de 20 caracteres'),
})

export { BoardCreate }

interface ISingup {
  type: string
  placeholder: string
  register: 'name' | 'email' | 'confirmPassword' | 'password'
  id: 'name' | 'email' | 'confirmPassowrd' | 'password'
}

interface ISingIn {
  type: string
  placeholder: string
  register: 'email' | 'password'
  id: 'email' | 'password'
}

const formSignup: ISingup[] = [
  {
    type: 'text',
    placeholder: 'insira seu nome',
    register: 'name',
    id: 'name',
  },
  {
    type: 'email',
    placeholder: 'insira seu e-mail',
    register: 'email',
    id: 'email',
  },
  {
    type: 'password',
    placeholder: 'insira sua senha',
    register: 'password',
    id: 'password',
  },
  {
    type: 'password',
    placeholder: 'confirme sua senha',
    register: 'confirmPassword',
    id: 'confirmPassowrd',
  },
]

const formSignIn: ISingIn[] = [
  {
    type: 'email',
    placeholder: 'insira seu e-mail',
    register: 'email',
    id: 'email',
  },
  {
    type: 'password',
    placeholder: 'insira sua senha',
    register: 'password',
    id: 'password',
  },
]

export { formSignup, formSignIn }

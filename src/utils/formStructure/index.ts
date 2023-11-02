interface ISingup {
  type: string
  placeholder: string
  register: 'name' | 'email' | 'confirmPassword' | 'password'
}

interface ISingIn {
  type: string
  placeholder: string
  register: 'email' | 'password'
}

const formSignup: ISingup[] = [
  {
    type: 'text',
    placeholder: 'insira seu nome',
    register: 'name',
  },
  {
    type: 'email',
    placeholder: 'insira seu e-mail',
    register: 'email',
  },
  {
    type: 'password',
    placeholder: 'insira sua senha',
    register: 'password',
  },
  {
    type: 'password',
    placeholder: 'confirme sua senha',
    register: 'confirmPassword',
  },
]

const formSignIn: ISingIn[] = [
  {
    type: 'email',
    placeholder: 'insira seu e-mail',
    register: 'email',
  },
  {
    type: 'password',
    placeholder: 'insira sua senha',
    register: 'password',
  },
]

export { formSignup, formSignIn }

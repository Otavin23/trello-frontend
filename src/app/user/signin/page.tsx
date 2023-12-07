'use client'
import React, { useState } from 'react'
import { Flex, Image, FormControl, Text, Input, Button, Spinner } from '@chakra-ui/react'
import { formSignIn } from '../../../utils/formStructure'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginSchema } from '../../../utils/schema/Form'
import { api } from '../../../service/api'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface IForm {
  email: string
  password: string
}

const MyPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(LoginSchema),
  })

  const [loading, setLoading] = useState(false)
  const Router = useRouter()

  const handleSubmitForm: SubmitHandler<IForm> = async (user) => {
    setLoading(!loading)

    try {
      const token = await api.post('/user/signin', user)

      localStorage.setItem('token', token.data)

      toast.success('Welcome')

      return Router.replace('/')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false)
      toast.error(`${error.response.data.message}`)
    }
  }

  return (
    <FormControl as="form" role="form" onSubmit={handleSubmit(handleSubmitForm)}>
      <Flex as="div" justify="center">
        <Image
          src="../assets/Logo.svg"
          alt="2 blue squares with the name trullo written"
          w="120px"
        />
      </Flex>

      <Text display="flex" justifyContent="center" my="1.5rem" fontWeight="600">
        Login para continuar
      </Text>

      {formSignIn.map((form) => (
        <React.Fragment key={form.register}>
          <Input
            type={form.type}
            id={form.id}
            placeholder={form.placeholder}
            {...register(form.register)}
            py="1.4rem"
            my="0.4rem"
            fontWeight="500"
            fontSize="14px"
            bg={errors[form.register] ? '#fff0f0' : '#FAFBFC'}
            border={errors[form.register] ? '2px solid red' : '2px solid #DFE1E6'}
            _placeholder={{
              color: '#6B778C',
            }}
          />
          <Text fontWeight="500" color="#fc3535" fontSize="13px">
            {errors[form.register]?.message}
          </Text>
        </React.Fragment>
      ))}

      <Button
        type="submit"
        w="100%"
        my="1rem"
        bg={loading ? '#4d4d4d' : '#0052CC'}
        color="#fff"
        fontSize="15px"
      >
        Registre-se
        {loading && (
          <Spinner
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#303030"
            w="20px"
            h="20px"
            ml="1rem"
          />
        )}
      </Button>

      <Link href="/user/signup">
        <Text
          as="span"
          display="flex"
          justifyContent="center"
          w="100%"
          fontSize="15px"
          textDecor="underline"
          cursor="pointer"
        >
          Não possui uma conta ainda? Clique aqui
        </Text>
      </Link>
    </FormControl>
  )
}

export default MyPage

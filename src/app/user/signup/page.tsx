'use client'
import React from 'react'

import { Flex, Image, FormControl, Text, Input, Button } from '@chakra-ui/react'
import { formSignup } from '../../../utils/formStructure'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterSchema } from '../../../utils/schema/Form'
import { api } from '../../../service/api'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface IForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const MyPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(RegisterSchema),
  })

  const handleSubmitForm: SubmitHandler<IForm> = async (data) => {
    try {
      await api.post('/user/signup', data)
      toast.success('User created successfully. Take advantage of our services')
    } catch (error) {
      toast.error(`${error.response.data.message}`)
    }
  }

  return (
    <FormControl as="form" onSubmit={handleSubmit(handleSubmitForm)}>
      <Flex as="div" justify="center">
        <Image
          src="../assets/Logo.svg"
          alt="2 blue squares with the name trullo written"
          w="120px"
        />
      </Flex>

      <Text display="flex" justifyContent="center" my="1.5rem" fontWeight="600">
        Registre-se para continuar
      </Text>

      {formSignup.map((form) => (
        <React.Fragment key={form.register}>
          <Input
            type={form.type}
            placeholder={form.placeholder}
            {...register(form.register)}
            py="1.3rem"
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

      <Button type="submit" w="100%" my="1rem" bg="#0052CC" color="#fff" fontSize="15px">
        Registre-se
      </Button>

      <Link href="/user/signin">
        <Text
          as="span"
          display="flex"
          justifyContent="center"
          w="100%"
          fontSize="15px"
          textDecor="underline"
          cursor="pointer"
        >
          Já tem uma conta Thullo? Entrar
        </Text>
      </Link>
    </FormControl>
  )
}

export default MyPage

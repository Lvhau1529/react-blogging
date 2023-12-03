import styled from 'styled-components'
import { Label } from '../components/label'
import Input from '../components/input/Input'
import { useForm } from 'react-hook-form'
import { IconEyeClose, IconEyeOpen } from '../components/icons'
import { Field } from '../components/field'
import { useEffect, useState } from 'react'
import { Button } from '../components/button'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '../firebase-app/firebase-config'
import { addDoc, collection } from 'firebase/firestore/lite'

const SignUpPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
`

const schema = yup.object({
  fullname: yup.string().required('Please enter your fullname'),
  email: yup.string().email('Please enter valid email address').required('Please enter your email address'),
  password: yup
    .string()
    .min(8, 'Your password must be at least 8 characters or greater')
    .required('Please enter your password')
})

const SignUpPage = () => {
  const colRef = collection(db, 'users')
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const [togglePassword, setTogglePassword] = useState(false)

  useEffect(() => {
    const arrErrors = Object.values(errors)
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 100
      })
    }
  }, [errors])

  const handleSignUp = async (values) => {
    if (!isValid) return
    await createUserWithEmailAndPassword(auth, values.email, values.password)
    await updateProfile(auth.currentUser, {
      displayName: values.fullname
    })
    await addDoc(colRef, {
      name: values.fullname,
      email: values.email,
      password: values.password
    })
    toast.success('Create user successfully')
  }
  return (
    <div>
      <SignUpPageStyles>
        <div className='page-container'>
          <img className='mx-auto w-20 md:w-auto' srcSet='/logo.png 2x' alt='monkey-blogging' />
          <h1 className='text-center text-primary font-semibold text-[30px] md:text-[40px] mb-4'>Monkey Blogging</h1>
          <form action='' className='max-w-[800px] mx-auto' onSubmit={handleSubmit(handleSignUp)}>
            <Field>
              <Label htmlFor='fullname'>Fullname</Label>
              <Input name='fullname' type='text' placeholder='Enter your name' control={control} />
            </Field>
            <Field>
              <Label htmlFor='email'>Email</Label>
              <Input name='email' type='email' placeholder='Enter your email' control={control} />
            </Field>
            <Field>
              <Label htmlFor='password'>Password</Label>
              <Input
                name='password'
                type={togglePassword ? 'text' : 'password'}
                placeholder='Enter your password'
                control={control}
              >
                {togglePassword ? (
                  <IconEyeOpen onClick={() => setTogglePassword(false)} />
                ) : (
                  <IconEyeClose onClick={() => setTogglePassword(true)} />
                )}
              </Input>
            </Field>
            <Button
              type='submit'
              className='mx-auto max-w-[300px] w-full'
              height='55px'
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Sign up
            </Button>
          </form>
        </div>
      </SignUpPageStyles>
    </div>
  )
}

export default SignUpPage

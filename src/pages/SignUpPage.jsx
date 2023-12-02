import styled from 'styled-components'
import { Label } from '../components/label'
import Input from '../components/input/Input'
import { useForm } from 'react-hook-form'
import { IconEyeClose, IconEyeOpen } from '../components/icons'
import { Field } from '../components/field'
import { useState } from 'react'
import { Button } from '../components/button'

const SignUpPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
`
const SignUpPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch
  } = useForm()
  const [togglePassword, setTogglePassword] = useState(false)

  const handleSignUp = (values) => {
    console.log(values)
  }
  return (
    <div>
      <SignUpPageStyles>
        <div className='page-container'>
          <img className='mx-auto' srcSet='/logo.png 2x' alt='monkey-blogging' />
          <h1 className='text-center text-primary font-semibold text-[40px] mb-16'>Monkey Blogging</h1>
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
            <Button type='submit' className='mx-auto max-w-[300px] w-full' height="55px">
              Sign up
            </Button>
          </form>
        </div>
      </SignUpPageStyles>
    </div>
  )
}

export default SignUpPage

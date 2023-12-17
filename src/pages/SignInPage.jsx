import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "react-toastify"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase-app/firebase-config"
import { Button } from "../components/button"
import Input from "../components/input/Input"
import { Label } from "../components/label"
import { Field } from "../components/field"
import { useAuth } from "../contexts/auth-context"
import AuthenticationPage from "./AuthenticationPage"
import { IconEyeClose, IconEyeOpen } from "@/components/icons"

const schema = yup.object({
  email: yup.string().email("Please enter valid email address").required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password")
})
const SignInPage = () => {
  const navigate = useNavigate()
  const { userInfo } = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }
  } = useForm({
    mode: "onChange",
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

  useEffect(() => {
    document.title = "Login Page"
    if (userInfo?.email) navigate("/")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo])

  const handleSignIn = async (values) => {
    if (!isValid) return
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password)
      toast.success("Login successfully", {
        pauseOnHover: false,
        delay: 100
      })
      navigate("/")
    } catch (error) {
      if (error.message.includes("wrong-password")) toast.error("It seems your password was wrong")
    }
  }

  return (
    <>
      <AuthenticationPage>
        <form className='max-w-[800px] mx-auto' onSubmit={handleSubmit(handleSignIn)} autoComplete='off'>
          <Field>
            <Label htmlFor='email'>Email</Label>
            <Input name='email' type='email' placeholder='Enter your email' control={control} />
          </Field>
          <Field>
            <Label htmlFor='password'>Password</Label>
            <Input
              name='password'
              type={togglePassword ? "text" : "password"}
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
          <div className='have-account'>
            You have not had an account? <NavLink to={"/sign-up"}>Register an account</NavLink>{" "}
          </div>
          <Button
            type='submit'
            className='mx-auto max-w-[300px] w-full'
            height='55px'
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Sign in
          </Button>
        </form>
      </AuthenticationPage>
    </>
  )
}

export default SignInPage

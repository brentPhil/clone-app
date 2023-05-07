"use client"

import { signIn } from "next-auth/react"
import { useCallback, useState } from "react"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Heading from "../Heading"
import Modal from "./Modal"
import Input from "../inputs/Input"
import toast from "react-hot-toast"
import Button from "../Button"
import useLoginModal from "@/app/hooks/useLoginModal"
import { redirect } from "next/dist/server/api-utils"
import { useRouter } from "next/navigation"
import useRegisterModal from "@/app/hooks/useRegisterModal"

const LoginModal = () => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false)

      if (callback?.ok) {
        toast.success("Login successful")
        router.refresh()
        loginModal.onClose()
      }

      if (callback?.error) {
        toast.error(callback.error)
      }
    })
  }

  const toggle = useCallback(() => {
    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4 text-black">
      <Heading center title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="mt-4 font-light text-center text-neutral-500">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>First time using Airbnb?</div>
          <div
            onClick={toggle}
            className="cursor-pointer hover:underline text-neutral-800">
            Create an account!
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      actionLabel="Continue"
      footer={footerContent}
    />
  )
}

export default LoginModal

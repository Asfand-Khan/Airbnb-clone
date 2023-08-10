"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import {signIn} from 'next-auth/react';
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {toast} from "react-hot-toast";

import { useRegisterModal } from "@/app/hooks/useRegisterModal";
import { useLoginModal } from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import { useRouter } from "next/navigation";

const LoginModal = () => {
    const router = useRouter();

  const registerModal = useRegisterModal();
  const LoginModal = useLoginModal();

  const [isLoading, setIsLaoding] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLaoding(true);

    signIn('credentials',{
        ...data,
        redirect:false
    })
    .then(callback =>{
        setIsLaoding(false);

        if(callback?.ok){
            toast.success("Logged in...");
            router.refresh();
            LoginModal.onClose(); 
        }

        if(callback?.error){
            toast.error(callback.error);
        }
    })
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome Back" subtitle="Login to your account" />
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
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr/>
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={()=>{}}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={()=>{}}
      />
      <div className="
        text-neutral-500
        font-light
        text-center
        mt-4
      ">
        <div className="flex flex-row items-center gap-2 justify-center">
          <div>
            Already have an account?
          </div>
          <div
          onClick={registerModal.onClose} 
          className="
            hover:underline
            text-neutral-800
            cursor-pointer
          ">
            Log in.
          </div>
        </div>
      </div>
    </div>
  )
  return (
    <Modal
      disabled={isLoading}
      isOpen={LoginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={LoginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;

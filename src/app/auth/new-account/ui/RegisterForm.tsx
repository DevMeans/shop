'use client'

import { SubmitHandler, useForm } from "react-hook-form";
type FormInputs = {
    name: string;
    email: string;
    password: string;
}
import Link from "next/link"
import clsx from "clsx";
import { login, registerForm } from "@/actions";
import { useState } from "react";


export const RegisterForm = () => {

    const [errorMessage, setErrorMessage] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()
    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        const { name, email, password } = data
       const resp= await  registerForm(name, email, password )
       console.log(resp)
       if(!resp.ok){
        setErrorMessage(resp.message!)
        return;
       }
       await login(email.toLowerCase(),password);
       window.location.replace('/')
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            {
                errors.name?.type === 'required' && (
                    <span className="text-red-600 font-bold">* El nombre es obligatorio</span>
                )

            }
            <label htmlFor="nombre">Nombre</label>
            <input
                {...register('name', { required: true })}
                className={
                    clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
                        'border-red-500': !!errors.name
                    })
                }
                type="text" />

            {
                errors.email?.type === 'required' && (
                    <span className="text-red-600 font-bold">* El Email es obligatorio</span>
                )

            }
            <label htmlFor="email">Correo electrónico</label>
            <input
                {...register('email', { required: true })}
                className={
                    clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
                        'border-red-500': !!errors.email
                    })
                }
                type="email" />

            {
                errors.password?.type === 'required' && (
                    <span className="text-red-600 font-bold">* El Password es obligatorio</span>
                )

            }
            
            {
                errors.password?.type === 'minLength' && (
                    <span className="text-red-600 font-bold">* Password minimo 8 caracteres</span>
                )

            }
            <label htmlFor="email">Contraseña</label>
            <input
                {...register('password', { required: true, minLength: 6 })}
                className={
                    clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
                        'border-red-500': !!errors.password
                    })
                }
                type="password" />
            {
                <span className="text-red-600 font-bold">{errorMessage}</span>
            }
            <button

                className="btn-primary">
                Crear cuenta
            </button>


            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/new-account"
                className="btn-secondary text-center">
                Login
            </Link>

        </form>
    )
}

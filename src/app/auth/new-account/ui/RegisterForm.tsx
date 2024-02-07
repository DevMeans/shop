'use client'

import { SubmitHandler, useForm } from "react-hook-form";
type FormInputs = {
    name: string;
    email: string;
    password: string;
}
import Link from "next/link"


export const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()
    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        const { name, email, password } = data
        console.log({ name, email, password })
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
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="text" />


            <label htmlFor="email">Correo electrónico</label>
            <input
                {...register('email', { required: true })}
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="email" />


            <label htmlFor="email">Contraseña</label>
            <input
                {...register('password', { required: true })}
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password" />

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

'use client'

import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation';
import { createUpdateColors } from "@/actions";
import { useEffect } from "react";

interface Props {
    id: string,
    colors: any
}
interface FormInputs {
    id?: string
    name: string
    hexa: string
    estado: number
}
export default function ColorForm({ id, colors }: Props) {
    let defaultValues;
    if (id === 'new') {
        defaultValues = {
            name: '',
            hexa: '',
            estado: 0
        }
    } else {
        defaultValues = { ...colors }
    }

    const router = useRouter()

    const { handleSubmit,
        register,
        getValues,
        setValue,
        watch,
        formState: { isValid } } = useForm<FormInputs>({
            defaultValues: {
                ...defaultValues,
                //TODO:FALTA DEFAULT VALUES

            }
        })
    const onSubmit = async (data: FormInputs) => {
        console.log(data)
        const formData = new FormData();
        formData.append('name', data.name ?? "")
        formData.append('hexa', data.hexa.trim() ?? "")
        formData.append('estado', data.estado.toString() ?? "")
        console.log(formData)
        const color = await createUpdateColors(formData, id)
        router.replace(`/admin/colors/${color?.color.id}`)
    }
    return (
        <>
            <div className="flex justify-center">
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Nombre</span>
                        </div>
                        <input type="text" placeholder="Nombre de color" className="input input-bordered w-full max-w-xs bg-white" {...register('name', { required: true })} />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">hexadecimal</span>
                        </div>
                        <input type="text" placeholder="Codigo de color" className="input input-bordered w-full max-w-xs bg-white" {...register('hexa', { required: true })} />
                    </label>
                    {
                        (id !== 'new') ? <div className="w-full h-5 mt-5" style={{ backgroundColor: `${defaultValues.hexa}` }}></div> : <div></div>
                    }

                    <div className="h-5">

                    </div>
                    <div className="border p-3">
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">Inactivo</span>
                                <input type="radio" className="radio checked:bg-red-500" value={0} defaultChecked={defaultValues.estado === 0} {...register('estado', { required: true })}

                                />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">Activo</span>
                                <input type="radio" className="radio checked:bg-blue-500" value={1} defaultChecked={defaultValues.estado === 1} {...register('estado', { required: true })} />
                            </label>
                        </div>
                    </div>
                    <div className="h-5">

                    </div>
                    <button className="btn btn-sm" type="submit"> Guardar</button>
                </form>
            </div>
            <div className="h-10">
            </div>
        </>

    );
}
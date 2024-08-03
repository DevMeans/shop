'use client'
import { deleteById } from "@/actions"

interface Props {
    id: string
}
export const BtnEliminar = ({ id }: Props) => {
    console.log('btn=', id)
    return (
        <button className="btn btn-sm" onClick={() => deleteById(id)}>eliminar</button>
    )
}
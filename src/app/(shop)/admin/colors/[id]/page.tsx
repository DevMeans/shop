'use client'
interface Props {
    params: {
        id: string
    }
}
export default function ColorById({ params }: Props) {

    const { id } = params
    console.log(id)
    return (
        <>
            <div className="flex justify-center">
                <form action="">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Nombre</span>
                        </div>
                        <input type="text" placeholder="Nombre de color" className="input input-bordered w-full max-w-xs bg-white" />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">hexadecimal</span>
                        </div>
                        <input type="text" placeholder="Codigo de color" className="input input-bordered w-full max-w-xs bg-white" />
                    </label>
                    <div className="h-5">

                    </div>
                    <div className="border p-3">
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">Inactivo</span>
                                <input type="radio" name="radio-10" className="radio checked:bg-red-500" defaultChecked />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">Activo</span>
                                <input type="radio" name="radio-10" className="radio checked:bg-blue-500" defaultChecked />
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
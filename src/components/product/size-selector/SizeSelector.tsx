import { Size } from "@/interfaces"
import clsx from "clsx";

interface Props {
    selectorSize?: Size;
    availableSizes: Size[];
    onsizeChanged: (size: Size) => void
}

export const SizeSelector = ({ selectorSize, availableSizes, onsizeChanged }: Props) => {
    return (
        <div className="my-5">
            <h3 className="font-bold m-4">
                Tallas disponibles
            </h3>
            {
                availableSizes.map(
                    size => (
                        <button
                            onClick={() => onsizeChanged(size)}
                            className={
                                clsx("mx-2  text-lg font-bold p-1",
                                    {
                                        "bg-blue-600 text-white": size == selectorSize
                                    }
                                )
                            } key={size}>{size}</button>
                    )
                )
            }
        </div>
    )
}

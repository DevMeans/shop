import { Size } from "@/interfaces"
import clsx from "clsx";

interface Props {
    selectorSize: Size;
    availableSizes: Size[];
}

export const SizeSelector = ({ selectorSize, availableSizes }: Props) => {
    return (
        <div className="my-5">
            <h3 className="font-bold m-4">
                Tallas disponibles
            </h3>
            {
                availableSizes.map(
                    size => (
                        <button className={
                            clsx("mx-2 hover:underline text-lg font-bold",
                            {
                                "underline":size==selectorSize
                            }
                            )
                        } key={size}>{size}</button>
                    )
                )
            }
        </div>
    )
}

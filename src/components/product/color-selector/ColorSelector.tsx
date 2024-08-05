import { CreateColorForProduct } from "@/actions/colors/ColorForProduct";
import { useEffect, useState } from "react";

interface Color {
    id: string;
    name: string;
    hexa: string;
}

interface Props {
    colors: Color[];
    productId: string,
    colorsSelected: any[]
}
export const ColorSelector = ({ colors, productId, colorsSelected }: Props) => {
    const [selectedColors, setSelectedColors] = useState<string[]>(colorsSelected);
    const [SetButton, setSetButton] = useState(true)
    const handleCheckboxChange = (id: string) => {
        setSelectedColors(prevSelectedColors =>
            prevSelectedColors.includes(id)
                ? prevSelectedColors.filter(colorId => colorId !== id)
                : [...prevSelectedColors, id]
        );
    };
    const guardarColor = async () => {
        setSetButton(false)
        console.log(selectedColors)
        await CreateColorForProduct(selectedColors, productId)
        setSetButton(true)
    }
    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 p-3 border-2 border-x-cyan-500 gap-2">
                {colors.map((color) => (
                    <label
                        key={color.id}
                        className="custom-checkbox"
                        style={{ '--checkbox-color': color.hexa } as React.CSSProperties}
                    >
                        <input
                            type="checkbox"
                            defaultChecked={colorsSelected.includes(color.id)}
                            onChange={() => handleCheckboxChange(color.id)}
                        />
                        <span className="checkmark"></span>
                        <span className="text-md font-bold" style={{ color: `${color.hexa}` }}> {color.name}</span>
                    </label>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <button className= {`btn btn-primary uppercase ${SetButton? '':'btn-disabled text-white' }`} onClick={() => guardarColor()} >Guardar Tallas</button>
            </div>
        </>

    );
};

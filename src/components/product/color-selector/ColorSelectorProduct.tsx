
import { useState } from "react";

interface Color {
    id: string;
    name: string;
    hexa: string;
}

interface Props {
    colors: any[];
    productId: string,
}
export const ColorSelectorProducts = ({ colors, productId, }: Props) => {
    console.log(colors)
    const colorsMaps = colors.map((color) => color.Color)
    console.log(colorsMaps)
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const handleCheckboxChange = (id: string) => {
        setSelectedColors(prevSelectedColors =>
            prevSelectedColors.includes(id)
                ? prevSelectedColors.filter(colorId => colorId !== id)
                : [...prevSelectedColors, id]
        );
    };
    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 p-3 border-2 border-x-cyan-500 gap-2">
                {colorsMaps.map((color) => (
                    <label
                        key={color.id}
                        className="custom-checkbox"
                        style={{ '--checkbox-color': color.hexa } as React.CSSProperties}
                    >
                        <input
                            type="checkbox"
                            //    defaultChecked={colorsSelected.includes(color.id)}
                            onChange={() => handleCheckboxChange(color.id)}
                        />
                        <span className="checkmark"></span>
                        <span className="text-md font-bold" style={{ color: `${color.hexa}` }}> {color.name}</span>
                    </label>
                ))}
            </div>
        </>
    );
};



interface Props {
    selectorColor?: any;
    availableColors: any[]
    onColorChange: (color: any) => void

}
export const ColorSelectorProducts = ({ selectorColor, onColorChange, availableColors }: Props) => {
    const colorsDetails = availableColors.map((color: any) => {
        return color.Color
    })
    return (
        <div className="mb-5 ml-2 flex gap-3">

            {
                colorsDetails.map((boxColor) => {
                    return <button
                    onClick={()=>onColorChange(boxColor)}
                    key={boxColor.id} className="size-12 bg-cyan-500 font-extrabold text-xl text-white" style={{ backgroundColor: `${boxColor.hexa}` }}>
                        {(boxColor == selectorColor) ? '✓' : ''}
                    </button>
                })
            }

        </div>
    );
};

import { Title } from "@/components";
import ColorForm from './ui/ColorForm';
import { getColor } from "@/actions/colors/get-colors";
interface Props {
    params: {
        id: string
    }
}
export default async function NamePage({ params }: Props) {
    const { id } = params
    const getColors = await getColor(id)
    console.log(getColor)
    return (
        <>
            <Title title="Editar/guardar"></Title>
            <ColorForm id={id} colors={getColors}></ColorForm>
        </>
    );
}
import { titlefont } from "@/config/fonts";
import { Title } from '../../components/ui/titlle/Title';
import { initialData } from "@/seed/seed";

const producto = initialData.products;

export default function Home() {
  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />
    </>
  );
}

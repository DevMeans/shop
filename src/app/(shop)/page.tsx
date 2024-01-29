import { titlefont } from "@/config/fonts";
import { Title } from '../../components/ui/titlle/Title';
import { initialData } from "@/seed/seed";
import { ProducGrid } from "@/components";

const products = initialData.products;

export default function Home() {
  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />
      <ProducGrid products={products}></ProducGrid>
    </>
  );
}

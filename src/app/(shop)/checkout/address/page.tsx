
import { Title } from '@/components';
import { AdressForm } from '../ui/AdressForm';

const countries = async () => {
  const restCountries = await fetch('https://restcountries.com/v3.1/all').then(
    res => res.json()
  )
  const mapCountries = restCountries.map((pais: any) => ({
    nombre: pais.name.common,
    id: pais.cca2
  }))
  return mapCountries
}
export default async function AddressPage() {
  const repuestacountries = await countries()
  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subtitle="Dirección de entrega" />
        <AdressForm paises={repuestacountries} ></AdressForm>
      </div>
    </div>
  );
}
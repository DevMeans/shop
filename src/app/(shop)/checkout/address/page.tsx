
import { Title } from '@/components';
import { AdressForm } from '../ui/AddressForm';
import { auth } from '@/auth.config';
import { getUserAddress } from '@/actions';

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
  const session =await auth()
  if(!session?.user){
    return (
      <h3 className='text-5xl'>500 -no hay sesion de usuario </h3>
    )
  }
  const userAddress = await getUserAddress(session.user.id)

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subtitle="Dirección de entrega" />
        <AdressForm paises={repuestacountries} userStoreAddress={userAddress} ></AdressForm>
      </div>
    </div>
  );
}
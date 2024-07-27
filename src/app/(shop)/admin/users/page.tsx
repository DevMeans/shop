// https://tailwindcomponents.com/component/hoverable-table
export const revalidate = 0;
import { getOrders, getPaginatedUser } from '@/actions';
import { Title } from '@/components';
import { redirect } from 'next/navigation';
import UsersTable from './ui/users-table';
import { Pagination } from '../../../../components/ui/pagination/Pagination';

export default async function orders() {
  const { ok, users = [] } = await getPaginatedUser();
  //TODO : CUANDO VUELVES DEL PEDIDO NO SE VEN LOS PEDIDOS HECHOS A MENOS QUE REFRESQUES LA PAGINA
  if (!ok) {
    redirect('/auth/login')
  }
  return (
    <>
      <Title title="Mantenimiento de usuarios" />

      <div className="mb-10">
        <UsersTable users={users}></UsersTable>
        <Pagination totalPages={3}></Pagination>
      </div>
    </>
  );
}
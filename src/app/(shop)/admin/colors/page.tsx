
import Link from 'next/link';
import { Title } from '../../../../components/ui/titlle/Title';
import { getColors } from '@/actions/colors/get-colors';
import { BtnEliminar } from './BtnEliminar';

export default async function NamePage() {
  const getcolors = await getColors()

  console.log(getcolors)
  return (
    <>
      <Title title='Colores'></Title>
      <div className="h-10">
      </div>
      <div className='flex justify-end'>
        <Link className='btn' href={`/admin/colors/new`}>nuevo</Link>
      </div>
      <div className="overflow-x-auto max-w-[1200px] m-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Color</th>
              <th>estado</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {
              getcolors?.map((color, i) => (
                <tr>
                  <th>{i + 1}</th>
                  <td>{color.name}</td>
                  <td><div className='size-5' style={{ backgroundColor: `${color.hexa}` }}>
                  </div></td>
                  <td>
                    {color.estado}
                  </td>
                  <td><Link className="btn btn-sm" href={`/admin/colors/${color.id}`}> Editar</Link></td>
                  <td>
                    <BtnEliminar id={color.id}></BtnEliminar>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}
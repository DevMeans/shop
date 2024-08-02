'use client'
import { Title } from '../../../../components/ui/titlle/Title';

export default function NamePage() {
  return (
    <>
      <Title title='Colores'></Title>
      <div className="h-10">
      </div>
      <div className="overflow-x-auto max-w-[1200px] m-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Color</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Rojo</td>
              <td><div className="size-5 bg-red-500">
              </div></td>
              <td><button className="btn btn-sm "> Editar</button></td>
            </tr>
            <tr>
              <th>1</th>
              <td>Rojo</td>
              <td><div className="size-5 bg-red-500">
              </div></td>
              <td><button className="btn btn-sm "> Editar</button></td>
            </tr>          <tr>
              <th>1</th>
              <td>Rojo</td>
              <td><div className="size-5 bg-red-500">
              </div></td>
              <td><button className="btn btn-sm "> Editar</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
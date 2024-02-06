import { TopMenu } from '../../components/ui/top-menu/TopMenu';
import { Sidebar } from '../../components/ui/sidebar/Sidebar';
import { Footer, Provider } from '@/components';

export default function ShopLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>


      <main className="min-h-screen">
        <TopMenu></TopMenu>
        <Sidebar />
        <div className='px-0 sm:px-10'>
          {children}
        </div>
        <Footer />
      </main>
    </Provider> //TODO:aca le puesto un provider no que tanto sera bueno añadirle pero esta bueno preguntar
  );
}
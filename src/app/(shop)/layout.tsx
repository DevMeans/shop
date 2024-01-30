import { TopMenu } from '../../components/ui/top-menu/TopMenu';
import { Sidebar } from '../../components/ui/sidebar/Sidebar';
import { Footer } from '@/components';

export default function ShopLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <TopMenu></TopMenu>
      <Sidebar />
      <div className='px-0 sm:px-10'>
        {children}
      </div>
      <Footer />
    </main>
  );
}
import dynamic from 'next/dynamic';

export const runtime = 'nodejs';

const AdminPage = dynamic(() => import('./AdminPage'), { ssr: false, loading: () => (
  <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[#E79923] border-t-transparent rounded-full animate-spin" />
  </div>
)});

export default function Page() {
  return <AdminPage />;
}

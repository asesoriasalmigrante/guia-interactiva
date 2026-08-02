'use client';

import dynamic from 'next/dynamic';

const UpdatePasswordClient = dynamic(() => import('./UpdatePasswordClient'), { ssr: false, loading: () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[#E79923] border-t-transparent rounded-full animate-spin" />
  </div>
)});

export default function Page() {
  return <UpdatePasswordClient />;
}

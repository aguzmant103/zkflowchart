'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const DynamicHomeContent = dynamic(() => import('@/components/HomeContent'), {
  ssr: false,
});

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DynamicHomeContent />
    </Suspense>
  );
}

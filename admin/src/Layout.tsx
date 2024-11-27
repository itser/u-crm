import type { ReactNode } from "react";
import { Layout as RALayout, CheckForApplicationUpdate } from "react-admin";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const Layout = ({ children }: { children: ReactNode }) => (
  <RALayout>
    {children}
    <CheckForApplicationUpdate />
      <ReactQueryDevtools initialIsOpen={false} />
  </RALayout>
);

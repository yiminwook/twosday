/* eslint-disable react/display-name */
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "@/components/config/App";
import { Toaster } from "sonner";
import Hotkeys from "@/components/config/Hotkeys";
import ModalContainer from "@/components/common/modal/ModalContainer";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

interface InitialProps {
  session: Session | null;
}

export function renderWithClient(ui: React.ReactElement, initialProps: InitialProps) {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <App>
      <Hotkeys>
        <QueryClientProvider client={testQueryClient}>
          {ui}
          <ModalContainer />
          <Toaster />
        </QueryClientProvider>
      </Hotkeys>
    </App>,
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(<QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>),
  };
}

export function createWrapper() {
  const testQueryClient = createTestQueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
  );
}

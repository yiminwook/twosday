import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";
import { Toaster } from "sonner";
import App from "@/components/config/App";
import Devtools from "@/components/config/Devtools";
import Hotkeys from "@/components/config/Hotkeys";
import ReactQuery from "./ReactQuery";
import { getServerSession } from "@/apis/getServerSession";
import MantineProvider from "./MantainProvider";

const ModalContainer = dynamic(() => import("@/components/common/modal/ModalContainer"), {
  ssr: false,
});

interface ConfigsProps {
  defaultColorScheme: "light" | "dark";
  children: React.ReactNode;
}

export default async function Configs({ children, defaultColorScheme }: ConfigsProps) {
  const session = await getServerSession();

  return (
    <App session={session}>
      <Hotkeys>
        <ReactQuery>
          <MantineProvider defaultColorScheme={defaultColorScheme}>
            {children}
            <Devtools />
            <ModalContainer />
            <Toaster />
          </MantineProvider>
        </ReactQuery>
      </Hotkeys>
    </App>
  );
}

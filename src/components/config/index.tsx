import { Toaster } from "sonner";
import Devtools from "@/components/config/devtools";
import Hotkeys from "@/components/config/hotkeys";
import ReactQuery from "./react-query";
import MantineProvider from "./mantain-provider";
import AsyncModalContainer from "../common/modal/async-modal-container";
import PortalModalContainer from "../common/modal/portal-modal-container";

interface ConfigsProps {
  children: React.ReactNode;
}

export default async function Configs({ children }: ConfigsProps) {
  return (
    <Hotkeys>
      <ReactQuery>
        <MantineProvider>
          {children}
          <Devtools />
          <PortalModalContainer />
          <AsyncModalContainer />
          <Toaster />
        </MantineProvider>
      </ReactQuery>
    </Hotkeys>
  );
}

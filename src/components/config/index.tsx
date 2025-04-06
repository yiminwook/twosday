import { Toaster } from "sonner";
import Devtools from "@/components/config/Devtools";
import Hotkeys from "@/components/config/Hotkeys";
import ReactQuery from "./ReactQuery";
import MantineProvider from "./MantainProvider";
import AsyncModalContainer from "../common/modal/AsyncModalContainer";
import PortalModalContainer from "../common/modal/PortalModalContainer";

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

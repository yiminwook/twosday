import { Toaster } from "sonner";
import App from "@/components/config/App";
import Devtools from "@/components/config/Devtools";
import Hotkeys from "@/components/config/Hotkeys";
import ReactQuery from "./ReactQuery";
import MantineProvider from "./MantainProvider";
import ModalContainer from "../common/modal/ModalContainer";

interface ConfigsProps {
  children: React.ReactNode;
}

export default async function Configs({ children }: ConfigsProps) {
  return (
    <App>
      <Hotkeys>
        <ReactQuery>
          <MantineProvider>
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

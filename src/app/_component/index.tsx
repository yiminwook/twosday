import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";
import { Toaster } from "sonner";
import App from "./App";
import Devtools from "./Devtools";
import Hotkeys from "./Hotkeys";
import ReactQuery from "./ReactQuery";
import { getServerSession } from "../_lib/getServerSession";

const ModalContainer = dynamic(() => import("./modal/ModalContainer"), { ssr: false });

export default async function Configs({ children }: PropsWithChildren) {
  const session = await getServerSession();

  return (
    <App session={session}>
      <Hotkeys>
        <ReactQuery>
          {children}
          <Devtools />
          <ModalContainer />
          <Toaster />
        </ReactQuery>
      </Hotkeys>
    </App>
  );
}

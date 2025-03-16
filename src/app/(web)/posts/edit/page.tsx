import Home from "@/components/editor/Home";
import { Authorized } from "@/libraries/auth/Authorized";

export default async function Page() {
  return (
    <Authorized fallback={null}>
      <Home />
    </Authorized>
  );
}

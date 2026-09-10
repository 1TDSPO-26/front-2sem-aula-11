import { Outlet } from "react-router";
import Cabecalho from "./components/Cabecalho";
import Rodape from "./components/Rodape";
>>>>>>> 095b976b02e6ee914217c2e7c3d04ffb7c12ea94

export default function App() {
  return (
    <div>
      <Cabecalho />
      <Outlet />
      <Rodape />
    </div>
  )
}

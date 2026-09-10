<<<<<<< HEAD
import { Outlet } from "react-router";
import Cabecalho from "./components/Cabecalho";
import Conteudo from "./components/Conteudo";
import Rodape from "./components/Rodape";


export default function App() {
  return (
    <main>
      <Cabecalho/>
      <Outlet/>
      <Rodape/>
    </main>
  );
}
=======
import Cabecalho from './components/Cabecalho'
import Conteudo from './components/Conteudo'
import Rodape from './components/Rodape'

export default function App() {
  return (
    <>
      <Cabecalho />
      <Conteudo />
      <Rodape />
    </>
  )
}
>>>>>>> 6297e0eb8938deb46580367324062d7af745b4f4

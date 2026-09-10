import Conteudo from "../../components/Conteudo";
import Lampada from "../../components/Lampada";
export default function Home() {
    document.title = "Home"
    return (
        <main>
            <Conteudo/>
            <Lampada />
        </main>
    );
}
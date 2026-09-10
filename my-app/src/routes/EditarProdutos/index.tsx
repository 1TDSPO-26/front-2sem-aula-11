import { useParams } from "react-router"
export default function EditarProdutos(){

    document.title = "Editar Produtos"
    const { id } = useParams<{ id: string }>();

    

    return(
        <main>
            <h2>Editar Produtos</h2>
            <p>ID: {id}</p>

        </main>
    )
}
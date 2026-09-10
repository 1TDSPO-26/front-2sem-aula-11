import { useParams } from "react-router";

const listaProdutos = [
    { id: 1, nome: "Produto 1", preco: 10.0 },
    { id: 2, nome: "Produto 2", preco: 20.0 },
    { id: 3, nome: "Produto 3", preco: 30.0 },
];

export default function EditarProdutos() {
    document.title = "Editar Produtos";

    const { id } = useParams<string>();

    const produto = listaProdutos.find((p) => p.id === Number(id));

    return (
        <main>
            <h2>Editar produtos</h2>
            <div>
                {produto ? (
                    <div>
                        <p>Nome do Produto: {produto.nome}</p>
                        <p> R$: {produto.preco}</p>
                    </div>
                ) : (
                    <p>Produto não encontrado!</p>
                )}
            </div>
        </main>
    );
}
import { useParams } from "react-router";

const listaProdutos = [
    { id: 1, nome: "Produto 1", preco: 10.0 },
    { id: 2, nome: "Produto 2", preco: 20.0 },
    { id: 3, nome: "Produto 3", preco: 30.0 },
];

export default function EditarProdutos() {

    // Modificar o título da página
    document.title = "Editar Produtos";

    const { id } = useParams<string>();

    const produto = listaProdutos.find((p) => p.id === Number(id));

    return (
        <main>
            <h2>Editar Produtos</h2>

            <div>
                {produto ? (
                    <div>
                        <p>Nome do Produto: {produto.nome}</p>
                        <p>R$: {produto.preco}</p>
                    </div>
                ) : (
                    <p>Produto não encontrado</p>
                )
                }
            </div>

        </main>
    );
}


/*
    // Processo de Destructuring
    const estojo = {
        lapis: "preto",
        caneta: "azul",
        borracha: "branca"
    }

    // Quando vamos utilizar os membros do objeto, sempre chamamos o objeto.atributo
    console.log(estojo.lapis);
    console.log(estojo.caneta);
    // Aplicando o destructuring, podemos utilizar os atributos como se fossem variáveis
    const { lapis, caneta } = estojo; // Chaves representam um objeto

    // Destructuring um array
    const jogos = ["Sonic", "Mario", "Zelda"];
    // Quando vamos utilizar os membros do array, sempre chamamos o array[indice]
    console.log(jogos[1]);
    console.log(jogos[0]);
    // Aplicando o destructuring, podemos utilizar os itens separadamente em variáveis criadas de qualquer nome, em qualquer ordem!!!
    const [sonic, mario] = jogos; // Conchetes representam um objeto
    // No array a posição importa, a pimeira variável vai receber o valor no primeiro índice do array
*/
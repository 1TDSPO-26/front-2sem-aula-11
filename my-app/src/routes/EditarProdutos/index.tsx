import { useParams } from "react-router";

const listaProdutos = [
    { id: 1, nome: "Produto 1", preco: 10.0 },
    { id: 2, nome: "Produto 2", preco: 20.0 },
    { id: 3, nome: "Produto 3", preco: 30.0 },
];

export default function EditarProdutos() {
  const { id } = useParams<{ id: string }>();

  const produto = listaProdutos.find( ( produto ) => produto.id === Number(id) ); //

  //aplicando o destructuring
  const estojo = {
    caneta : "azul",
    lapis  : "preto",
    regua  : "transparente"
  }

  const {lapis, caneta} = estojo;

  const jogos = ["Sonic", "Zelda"]

  const [sonic, mario] = jogos;


  return (
    <main>
      <h1>Editar Produtos</h1>
      <p>ID: {id ?? "não informado"}</p>
      <p>{lapis}</p>
      <p>{mario}</p>

      {/*criar estrutura que usa o ternario*/}
      <div>
        {produto ? 
        (
          <div>
            <p>Nome do produto: {produto.nome} </p>
            <p>R$: {produto.preco} </p>
          </div>
        ) : (
          <p>Produto não encontrado</p>
        )
      
        }
      </div>
    </main>
  );
}

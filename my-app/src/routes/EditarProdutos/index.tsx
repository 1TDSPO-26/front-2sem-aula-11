import { useParams } from "react-router";
const listaProdutos[
  
]

export default function EditarProdutos() {
  document.title = "Editar Produtos";

  const { id } = useParams<string>();

  const produto = listaProdutos.find(( p )=> p.id === Number(id) );
  

  return (
    <main>
          <h2>Editar Produtos</h2>

          <div>
            {produto ?(
              <div>
                <p>Nome do Produto:{produto.nome}</p>
                <p>R$ :{produto.preco}</p>
              </div>
            ):
            (
              <p>Produto não encontrado!</p>
            )
          }

          </div>
          
    </main>
  )
}

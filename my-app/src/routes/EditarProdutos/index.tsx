
import { useParams } from "react-router"


const listaProdutos = [
  { id: 1, nome: "Produto 1", preco: 10.0 },
  { id: 2, nome: "Produto 2", preco: 20.0 },
  { id: 3, nome: "Produto 3", preco: 30.0 },
];

export default function EditarProdutos() {



  document.title = "Editar Produtos"
  const { id } = useParams<string>()
  /*
  //Uso do destructuring 
  const estojo = {lapis: "Preto", caneta: "Azul", borracha: "Branca"}
  
  // aplicado o mesmo, para utilizar os atributos dos objetos.
  const {lapis, caneta} = estojo;
  
  const jogos = ["Sonic", "Mario", "Zelda"]
  
  const [sonic, mario] = jogos  // ele pega posição do vetor, sendo assim [0] = sonic, [1] = mario, [2] = zelda
  
  */

  const produto = listaProdutos.find((p) => p.id === Number(id));
  return (
    <main>
      <div>



        {produto ? (
          <div>
            <p>Nome: {produto.nome}</p>
            <p>Preço: {produto.preco}</p>
          </div>
        ) :
          (<p>Produto não encontrado</p>)
        }

      </div>

    </main>
  )
}

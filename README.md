Aula-09/09/2026 - USE-EFFECT
------------------------------------------

==============================================================================

# Guia de Configuração e Execução do Projeto

Siga o passo a passo abaixo para clonar, configurar o ambiente com Git Flow e executar o projeto localmente.

---

### 1. Clonar o repositório
```bash
git clone <endereço-remoto-repositorio>
```

### 2. Verificar branches locais
```bash
git branch
```

### 3. Verificar branches remotas
```bash
git branch -a
```

### 4. Inicializar a estrutura do Git Flow
Inicia a estrutura do Git Flow no projeto e muda automaticamente para a branch `develop`:
```bash
git flow init
```

> **Atenção (PC da Instituição):** Caso o Git Flow não esteja instalado no Windows, execute:
> ```bash
> winget install GitTower.GitFlowNext
> ```

### 5. Mudar para a branch de trabalho desejada
```bash
git switch <nomeDaBranch>
# ou
git checkout <nomeDaBranch>
```

### 6. Acessar a pasta da aplicação
```bash
cd my-app
```

### 7. Listar o conteúdo da pasta atual
```bash
ls
```

### 8. Abrir o VS Code a partir do Git Bash
```bash
code .
```

### 9. Encerrar o Git Bash
```bash
exit
```

### 10. Abrir o terminal no VS Code e instalar dependências
No VS Code, abra um novo terminal usando o **Command Prompt (CMD)** e instale as dependências:
```bash
npm install
# ou
npm i
```
> **Atenção:** Certifique-se de que o terminal está dentro da pasta `my-app`.

### 11. Executar o projeto em modo de desenvolvimento
```bash
npm run dev
```

================================================================================================================================================================================================


# Guia de Sincronização de Branches com o Professor

Se o seu código está diferente ou você não tem o conteúdo atual do professor, identifique sua situação e siga os passos correspondentes abaixo.

---

### 1. Acabou de clonar o repositório OU ainda não criou sua branch
*(Você não tem branch de trabalho e precisa começar exatamente do ponto onde o professor parou)*

1. Atualize a lista de branches do servidor:
```bash
git fetch origin
```

2. Crie a sua branch diretamente a partir da branch do professor:
```bash
git switch -c feature/exemplo-rmSeuRM origin/feature/exemplo-pf0670
```
> Substitua `rmSeuRM` pelo seu RM real (ex: `feature/exemplo-rm12345`).

---

### 

### 3. Sua branch deu erro/conflito e você quer descartar tudo e ficar idêntico ao professor
*(Para quem perdeu a aula, quebrou o código ou quer zerar o ambiente com o código oficial do professor)*

1. Acesse a sua branch:
```bash
git switch feature/exemplo-rmSeuRM
```

2. Baixe os dados atualizados:
```bash
git fetch origin
```

3. Force a sua branch a ficar exatamente igual à do professor:
```bash
git reset --hard origin/feature/exemplo-pf0670
```

> **Atenção:** O comando `git reset --hard` apaga qualquer alteração local não sincronizada e alinha tudo 100% com a branch do professor.


================================================================================================================================================================================================


# useEffect: O hook que controla a rerenderização!!

Neste guia, vamos aprender como reagir a mudanças no seu projeto utilizando ganchos (**Hooks**):

* **O que é o `useEffect`?**  
  O `useEffect` é um hook nativo do React que atua como um observador. Ele serve para disparar ações secundárias (efeitos colaterais) sempre que algo muda ou quando um componente precisa se re-renderizar, sem interferir diretamente no fluxo visual da tela.

* **O que é o `useLocation`?**  
  O `useLocation` também é um hook, mas fornecido pelo `react-router`. Ele atua como uma antena que lê em tempo real os dados da URL atual da aplicação (caminho, parâmetros e estado).

Ao juntar os dois, criamos uma rotina automática que reage toda vez que o usuário navega por uma rota.

---

### Passo 1: Criar o Componente Observador de Rota

Crie o arquivo `src/components/ObservadorDeRota.tsx`:

```tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router';

export default function ObservadorDeRota() {
  const location = useLocation();

  useEffect(() => {
    // 1. Exibe a rota acessada no console
    console.log(`Rota acessada: ${location.pathname}`);

    // 2. Altera o título da aba do navegador
    document.title = `Aplicação | ${location.pathname}`;

    // 3. Rola a visualização de volta ao topo
    window.scrollTo(0, 0);

  }, [location]); // Dependência que dispara o hook

  return null;
}
```

> **Explicação do Passo 1:**
> * `useLocation()`: Ativa a leitura do endereço da aplicação e guarda em `location`.
> * `useEffect(..., [location])`: O hook fica vigiando o valor de `location`. Se ele mudar, o código dentro da função roda imediatamente.
> * `return null`: O componente executa apenas tarefas de lógica e não adiciona elementos visuais ao HTML.

---

### Passo 2: Importar e Adicionar no `App.tsx`

Abra o arquivo `src/App.tsx` e coloque o observador no topo da estrutura:

```tsx
import { Outlet } from 'react-router';
import Cabecalho from './components/Cabecalho';
import Rodape from './components/Rodape';
import ObservadorDeRota from './components/ObservadorDeRota';

export default function App() {
  return (
    <>
      <ObservadorDeRota />
      <Cabecalho />
      <Outlet />
      <Rodape />
    </>
  );
}
```

> **Explicação do Passo 2:**
> * Colocar o `<ObservadorDeRota />` dentro de `App.tsx` garante que o monitoramento fique ativo em toda a aplicação.
> * O `<Outlet />` continua cuidando da troca das páginas filhas enquanto o observador atua em segundo plano.

---

### Passo 3: Por que o Observador Funciona se o `App` não Muda?

> **Explicação do Passo 3:**
> 1. O `<RouterProvider>` compartilha o estado da rota com toda a árvore via Context API do React.
> 2. O hook `useLocation` conecta o `ObservadorDeRota` diretamente a esse canal.
> 3. Quando a rota muda, o React não precisa recarregar o `<App />` inteiro: ele atualiza apenas os componentes que usam hooks inscritos nessa alteração, re-executando o `useEffect`.

---

### Passo 4: Testar no Navegador

Execute `npm run dev` e valide o fluxo:

1. Abra o navegador e o console (`F12`).
2. Clique nos links do menu para alternar entre as rotas.
3. Verifique o console exibindo o novo caminho e a aba do navegador alterando o texto.

> **Explicação do Passo 4:**
> Esse teste confirma que o hook `useEffect` identificou a alteração disparada pelo `useLocation` e concluiu as ações com sucesso.
================================================================================================================================================================================================

# Guia Passo a Passo: Carregando e Listando Produtos em Tabela (React + TypeScript)

Neste tutorial, vamos pegar uma lista de produtos fictícios (o famoso **mock**) e aprender a guardar esses dados na memória do React com `useState`, simular o carregamento desses dados no momento em que a página abre com o `useEffect`, e desenhar cada produto na tela dentro de uma **tabela** organizada.

---

### Passo 1: O "Molde" do nosso Produto (Criando a Tipagem)

No TypeScript, antes de criar dados, nós criamos um **contrato** (ou uma ficha cadastral). Isso ensina ao editor exatamente quais campos todo produto precisa ter. Se esquecermos uma vírgula ou escrevermos o nome do campo errado, o TypeScript nos avisa na hora.

1. Dentro da pasta `src`, crie uma pasta chamada `types` (se ainda não tiver).
2. Dentro dela, crie o arquivo `types.ts`.
3. Adicione o seguinte código:

```typescript
// src/types/types.ts

// Aqui definimos o molde do nosso objeto de produto.
// Cada produto OBRIGATORIAMENTE deve ter esses campos e esses tipos:
export interface TipoProduto {
  id: number;          // O número de identificação único
  nome: string;        // O nome do produto em texto
  preco: number;       // O valor em número (sem R$, usamos só números decimais)
  descricao: string;   // Uma explicação curta do item
  avatar: string;      // O link (URL) da imagem que está na internet
}
```

---

### Passo 2: O Nosso Estoque Fictício (Arquivo de Mock)

Um dado "mockado" é um dado de mentirinha, usado para testes enquanto não temos um banco de dados de verdade conectado na internet.

1. Dentro de `src`, crie uma pasta chamada `data`.
2. Dentro de `data`, crie o arquivo `listaProdutos.ts`.
3. Vamos importar o molde `TipoProduto` e criar nossa lista de produtos:

```typescript
// src/data/listaProdutos.ts
import { TipoProduto } from '../types/types';

// Usamos TipoProduto[] com colchetes para avisar que é uma LISTA (Array) desse molde.
export const listaProdutos: TipoProduto[] = [
  {
    id: 1,
    nome: "Headset Gamer Sem Fio",
    preco: 299.90,
    descricao: "Áudio espacial 7.1, espumas confortáveis e microfone retrátil.",
    avatar: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    nome: "Teclado Mecânico RGB",
    preco: 249.00,
    descricao: "Switches mecânicos rápidos e iluminação colorida ajustável.",
    avatar: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    nome: "Smartwatch Fitness",
    preco: 189.50,
    descricao: "Mede batimentos cardíacos, conta passos e mostra notificações.",
    avatar: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    nome: "Câmera Instantânea",
    preco: 420.00,
    descricao: "Tira fotos analógicas e imprime na hora para colar no caderno.",
    avatar: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=120&auto=format&fit=crop&q=80"
  }
];
```

---

### Passo 3: Abrindo o Componente `Produtos` e Entendendo os Hooks

Agora abra o arquivo do seu componente que já existe: `src/routes/Produtos/index.tsx`.

Para fazer esse componente funcionar, precisaremos de duas ferramentas especiais do React chamadas **Hooks**:

1. **`useState`**: É a gaveta da memória do componente.
   * Toda vez que você guarda algo nela usando a função `set...`, o React descobre que tem novidade e repinta a tela para mostrar os dados atualizados.
2. **`useEffect`**: É um vigia que espera a tela carregar.
   * Imagine que o componente acabou de ser colocado na tela pela primeira vez (a gente chama isso de "montagem"). O `useEffect` percebe isso e dispara uma ação que você programou, como por exemplo: *"Agora que a tela abriu, busque a lista de produtos e guarde na gaveta!"*.

---

### Passo 4: Declarando os Imports e o Estado no Componente

No topo de `src/routes/Produtos/index.tsx`, vamos importar os Hooks, a tipagem e os dados mockados:

```tsx
// 1. Ferramentas do React
import { useState, useEffect } from 'react';

// 2. O molde que criamos
import { TipoProduto } from '../../types/types';

// 3. Os dados fictícios
import { listaProdutos } from '../../data/listaProdutos';

export default function Produtos() {
  // Criamos o estado "produtos". 
  // - Ele começa vazio: []
  // - Avisamos ao TypeScript que ele vai guardar uma lista de TipoProduto: <TipoProduto[]>
  const [produtos, setProdutos] = useState<TipoProduto[]>([]);

  // O useEffect vai entrar aqui no Passo 5...

  return (
    <main>
      <h1>Página de Produtos</h1>
    </main>
  );
}
```

---

### Passo 5: Carregando os Dados com `useEffect`

Agora vamos ensinar o componente a buscar os dados assim que o usuário entrar na página:

```tsx
  // Esse efeito roda automaticamente quando a tela é montada
  useEffect(() => {
    // Pegamos a listaProdutos do arquivo e guardamos dentro do useState
    setProdutos(listaProdutos);

    // O array vazio [] no final é o "segredo":
    // Ele diz ao React: "Execute isso APENAS UMA VEZ, quando o componente nascer na tela".
    // Se não colocar esse [], o React entraria em um loop infinito!
  }, []);
```

---

### Passo 6: Construindo a Tabela HTML (Linhas e Colunas)

Uma tabela na web funciona como uma planilha de caderno:
* `<table>`: A tabela inteira.
* `<thead>`: O cabeçalho (a primeira linha que diz o nome de cada coluna).
* `<th>`: A célula do cabeçalho (título da coluna: Foto, Nome, Preço...).
* `<tbody>`: O corpo da tabela, onde moram os dados reais.
* `<tr>`: Uma linha inteira (Table Row).
* `<td>`: Um quadradinho/célula de dado (Table Data).

Para mostrar vários produtos sem ter que digitar um por um manualmente, usamos a função do JavaScript chamada **`.map()`**.
* O `.map()` funciona como uma esteira de fábrica: ele pega cada item da nossa lista, um por um, e transforma em uma linha `<tr>` na tabela.

---

### Passo 7: O Código Completo do Componente `Produtos`

Substitua o conteúdo de `src/routes/Produtos/index.tsx` pelo código final documentado:

```tsx
import { useState, useEffect } from 'react';
import { TipoProduto } from '../../types/types';
import { listaProdutos } from '../../data/listaProdutos';

export default function Produtos() {
  // Estado que guarda a lista de produtos na memória do componente
  const [produtos, setProdutos] = useState<TipoProduto[]>([]);

  // Carrega os dados na primeira vez que a tela aparece
  useEffect(() => {
    setProdutos(listaProdutos);
  }, []);

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Painel de Produtos</h1>
      <p>Confira abaixo a lista de itens cadastrados no sistema:</p>

      {/* Tabela com borda e espaçamento para ficar fácil de ler */}
      <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        
        {/* Cabeçalho da Tabela */}
        <thead>
          <tr style={{ backgroundColor: '#2c3e50', color: '#ffffff' }}>
            <th>Foto</th>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Descrição</th>
          </tr>
        </thead>

        {/* Corpo da Tabela com a repetição dos produtos */}
        <tbody>
          {produtos.map((item) => (
            // A propriedade "key" é obrigatória no React quando usamos .map().
            // Ela ajuda o React a saber exatamente qual item é qual através do ID único.
            <tr key={item.id}>
              <td>
                <img 
                  src={item.avatar} 
                  alt={item.nome} 
                  width={60} 
                  height={60} 
                  style={{ objectFit: 'cover', borderRadius: '8px' }} 
                />
              </td>
              <td>{item.id}</td>
              <td><strong>{item.nome}</strong></td>
              {/* toFixed(2) garante que o preço sempre tenha 2 casas decimais (ex: 299.90) */}
              <td>R$ {item.preco.toFixed(2)}</td>
              <td>{item.descricao}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </main>
  );
}
```

---

### Passo 8: Conferindo o Resultado no Navegador

1. Verifique se o servidor do Vite está rodando no terminal do VS Code:
   ```bash
   npm run dev
   ```
2. Abra o navegador no endereço:
   ```text
   http://localhost:5173/produtos
   ```
3. Você verá todos os produtos listados, com as fotos carregadas diretamente da internet, formatados dentro da tabela.

================================================================================================================================================================================================
---

# Aula — 2 de setembro de 2026

## Inicialização de um projeto do zero

Nesta aula, criaremos uma aplicação com **Vite + React + TypeScript**, utilizando uma branch do Git Flow.

---

## 1. Clonar o repositório

Abra o Git Bash e execute:

```bash
git clone <endereço-remoto-do-repositório>
```

Entre na pasta do repositório:

```bash
cd <nome-do-repositório>
```

---

## 2. Inicializar o Git Flow

Antes de executar o comando, confirme que você está na branch `main`:

```bash
git branch
```

Inicialize a estrutura do Git Flow:

```bash
git flow init
```

Pressione `Enter` para aceitar as opções apresentadas.

---

## 3. Criar uma feature

A **feature**, ou funcionalidade, será a branch utilizada para desenvolver a atividade.

Utilize o seguinte padrão:

```bash
git flow feature start exemplo-seu-rm
```

Exemplo:

```bash
git flow feature start exemplo-rm4894894
```

O Git Flow criará uma branch com o prefixo `feature/`:

```text
feature/exemplo-rm4894894
```

---

## 4. Publicar a feature

Publique a branch no repositório remoto:

```bash
git flow feature publish exemplo-rm4894894
```

---

## 5. Criar o projeto com Vite

Execute o comando:

```bash
npm create vite@latest
```

Selecione as seguintes opções:

| Pergunta                | Opção        |
| ----------------------- | ------------ |
| Nome da aplicação       | `my-app`     |
| Framework               | `React`      |
| Variante                | `TypeScript` |
| Linter                  | `Oxlint`     |
| Instalar utilizando npm | `Yes`        |

Aguarde a criação e a instalação do projeto.

---

## 6. Encerrar o servidor e entrar na aplicação

Se o servidor de desenvolvimento estiver em execução, encerre-o utilizando:

```text
Ctrl + C
```

Entre na pasta criada pelo Vite:

```bash
cd my-app
```

---

## 7. Abrir o projeto no Visual Studio Code

Execute:

```bash
code .
```

O ponto representa a pasta atual.

---

## 8. Fechar o Git Bash

Depois que o projeto abrir no Visual Studio Code, feche a janela do Git Bash.

Os próximos comandos poderão ser executados pelo terminal integrado do Visual Studio Code.

Para abrir o terminal integrado, utilize:

```text
Ctrl + `
```

---

## 9. Limpar o boilerplate do Vite

**Boilerplate** é a estrutura inicial de arquivos e códigos criada automaticamente por uma ferramenta.

Realize a limpeza abaixo.

### 9.1. Remover arquivos públicos desnecessários

Remova o conteúdo inicial da pasta:

```text
public/
```

A pasta poderá ser mantida ou recriada posteriormente para receber arquivos públicos, como o favicon.

### 9.2. Remover o README duplicado

Remova o arquivo abaixo somente se já existir outro `README.md` na raiz do repositório:

```text
my-app/README.md
```

### 9.3. Remover os recursos visuais do Vite

Exclua a pasta:

```text
src/assets/
```

### 9.4. Remover os arquivos CSS

Exclua:

```text
src/index.css
src/App.css
```

### 9.5. Remover os imports dos arquivos CSS

No arquivo `src/main.tsx`, remova:

```tsx
import './index.css'
```

No arquivo `src/App.tsx`, remova:

```tsx
import './App.css'
```

### 9.6. Limpar o componente App

Apague o conteúdo gerado pelo Vite em `src/App.tsx` e crie um componente funcional básico:

```tsx
export default function App() {
  return (
    <main>
      <h1>Minha aplicação React</h1>
    </main>
  )
}
```

### 9.7. Atualizar o arquivo index.html

No arquivo `index.html`:

1. Altere o idioma para português do Brasil:

```html
<html lang="pt-BR">
```

2. Remova o `<link>` que aponta para o ícone do Vite.

3. Altere o título da página:

```html
<title>Minha aplicação React</title>
```

---

## 10. Criar um commit

Confira os arquivos alterados:

```bash
git status
```

Adicione as alterações:

```bash
git add .
```

Crie o commit:

```bash
git commit -m "feat: cria estrutura inicial da aplicação"
```

---

## 11. Publicar as alterações

Envie o commit para a feature publicada anteriormente:

```bash
git push
```

---

## 12. Exercício — Criar componentes

Crie três componentes funcionais:

```text
Cabecalho
Conteudo
Rodape
```

Sugestão de organização:

```text
src/
├── components/
│   ├── Cabecalho/
│   │   └── index.tsx
│   ├── Conteudo/
│   │   └── index.tsx
│   └── Rodape/
│       └── index.tsx
├── App.tsx
└── main.tsx
```

Depois, modularize o componente `App.tsx`, importando e utilizando os três componentes.

A estrutura esperada será semelhante a:

```tsx
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
```

---

## 13. Adicionar uma imagem ao componente Conteudo

Dentro do componente `Conteudo`, crie:

* Um elemento `<figure>`;
* Um elemento `<img>`;
* Um elemento `<figcaption>`.

Utilize a imagem:

```text
https://placehold.co/600x400/FFFFF0/FFFFFF/png
```

Exemplo da estrutura:

```tsx
export default function Conteudo() {
  return (
    <main>
      <h2>Conteúdo principal</h2>

      <figure>
        <img
          src="https://placehold.co/600x400/FFFFF0/FFFFFF/png"
          alt="Imagem ilustrativa do conteúdo"
        />

        <figcaption>
          Imagem utilizada para representar o conteúdo da aplicação.
        </figcaption>
      </figure>
    </main>
  )
}
```

O atributo `alt` apresenta uma descrição textual da imagem e ajuda pessoas que utilizam leitores de tela.

---

## 14. Exercício — Adicionar um favicon

**Favicon** é o pequeno ícone exibido na aba do navegador.

1. Escolha um ícone;
2. Coloque o arquivo dentro da pasta `public`;
3. Adicione a referência no `index.html`.

Exemplo:

```html
<link rel="icon" type="image/png" href="/favicon.png">
```

A estrutura ficará semelhante a:

```text
my-app/
├── public/
│   └── favicon.png
├── src/
└── index.html
```

---

## 15. Finalizar a atividade

Confira novamente as alterações:

```bash
git status
```

Adicione os arquivos:

```bash
git add .
```

Crie o commit:

```bash
git commit -m "feat: adiciona componentes e favicon"
```

Publique as alterações:

---

# Aula — 3 de setembro de 2026
# Exercício — Lâmpada: variável comum versus `useState`

## Objetivo

Neste exercício, você criará duas lâmpadas:

1. Uma controlada por uma variável comum;
2. Outra controlada pelo Hook `useState`.

O objetivo é observar que uma variável comum pode mudar na memória, mas não atualiza automaticamente a interface. O `useState`, além de guardar o valor, solicita uma nova renderização do componente.

> **Hook** é uma função especial do React. O `useState` permite criar e atualizar o estado de um componente.

---

## Resultado esperado

A página deverá apresentar duas seções:

* Lâmpada controlada por variável comum;
* Lâmpada controlada por `useState`.

Ao clicar no primeiro botão, o valor será alterado somente no console.

Ao clicar no segundo botão, a imagem deverá alternar entre:

* Lâmpada acesa;
* Lâmpada apagada.

---

## 1. Organizar as imagens

Coloque as duas imagens dentro da pasta `public/images`:

```text
public/
└── images/
    ├── lampada-acesa.png
    └── lampada-apagada.png
```

Os arquivos da pasta `public` podem ser acessados diretamente pelo navegador.

Exemplo:

```tsx
<img src="/images/lampada-acesa.png" alt="Lâmpada acesa" />
```

---

## 2. Criar o componente

Crie a seguinte estrutura:

```text
src/
└── components/
    └── Lampada/
        └── index.tsx
```

No arquivo `src/components/Lampada/index.tsx`, comece com:

```tsx
import { useState } from 'react'

export default function Lampada() {
  // Variável comum.
  // Ela pode mudar, mas não atualiza a interface.
  let lampadaComumAcesa = false

  // Estado controlado pelo React.
  // false: lâmpada apagada.
  // true: lâmpada acesa.
  const [lampadaStateAcesa, setLampadaStateAcesa] =
    useState(false)

  function alternarVariavelComum() {
    // Inverte o valor da variável comum.
    lampadaComumAcesa = !lampadaComumAcesa

    // O novo valor poderá ser observado no console.
    console.log('Variável comum:', lampadaComumAcesa)
  }

  function alternarUseState() {
    // TODO:
    // Utilize setLampadaStateAcesa para inverter
    // o valor atual do estado.
  }

  return (
    <main>
      <h1>Variável comum versus useState</h1>

      <section>
        <h2>Lâmpada com variável comum</h2>

        <p>
          Estado:
          {lampadaComumAcesa ? ' acesa' : ' apagada'}
        </p>

        <img
          src={
            lampadaComumAcesa
              ? '/images/lampada-acesa.png'
              : '/images/lampada-apagada.png'
          }
          alt={
            lampadaComumAcesa
              ? 'Lâmpada controlada por variável comum acesa'
              : 'Lâmpada controlada por variável comum apagada'
          }
          width="250"
        />

        <div>
          <button
            onClick={alternarVariavelComum}
            type="button"
          >
            Alternar variável comum
          </button>
        </div>

        <p>
          Observe o console depois de pressionar o botão.
        </p>
      </section>

      <hr />

      <section>
        <h2>Lâmpada com useState</h2>

        <p>
          Estado:
          {lampadaStateAcesa ? ' acesa' : ' apagada'}
        </p>

        <img
          src={
            lampadaStateAcesa
              ? '/images/lampada-acesa.png'
              : '/images/lampada-apagada.png'
          }
          alt={
            lampadaStateAcesa
              ? 'Lâmpada controlada pelo useState acesa'
              : 'Lâmpada controlada pelo useState apagada'
          }
          width="250"
        />

        <div>
          <button
            aria-pressed={lampadaStateAcesa}
            onClick={alternarUseState}
            type="button"
          >
            {lampadaStateAcesa
              ? 'Apagar lâmpada'
              : 'Acender lâmpada'}
          </button>
        </div>
      </section>
    </main>
  )
}
```

---

## 3. Completar a função do `useState`

Dentro da função `alternarUseState`, utilize a função responsável por atualizar o estado:

```tsx
function alternarUseState() {
  setLampadaStateAcesa(
    (estadoAtual) => !estadoAtual,
  )
}
```

O símbolo `!` significa **negação**. Neste exemplo, ele inverte o valor:

```text
false → true
true  → false
```

---

## 4. Utilizar o componente no App

Abra o arquivo `src/App.tsx` e importe o componente:

```tsx
import Lampada from './components/Lampada'

export default function App() {
  return <Lampada />
}
```

---

## 5. Executar o projeto

No terminal, execute:

```bash
npm run dev
```

Abra o endereço apresentado pelo Vite no navegador.

---

## 6. Testar a variável comum

1. Abra o console do navegador;
2. Pressione o botão **Alternar variável comum**;
3. Observe os valores apresentados no console;
4. Confira se a imagem foi alterada na página.

O valor da variável mudará no console, mas a imagem continuará apagada.

Isso acontece porque uma variável comum não informa ao React que a interface precisa ser renderizada novamente.

---

## 7. Testar o `useState`

Pressione o botão da segunda lâmpada.

O comportamento esperado será:

```text
Clique no botão
      ↓
O estado é invertido
      ↓
O React renderiza o componente novamente
      ↓
A imagem e o texto são atualizados
```

A cada clique, a lâmpada deverá alternar entre acesa e apagada.

---

## Entendendo a operação ternária

A imagem é escolhida por uma operação ternária:

```tsx
lampadaStateAcesa
  ? '/images/lampada-acesa.png'
  : '/images/lampada-apagada.png'
```

A estrutura de uma operação ternária é:

```text
condição ? valor verdadeiro : valor falso
```

Portanto:

```text
lampadaStateAcesa === true
→ mostra lampada-acesa.png

lampadaStateAcesa === false
→ mostra lampada-apagada.png
```

---

## Requisitos obrigatórios

* [ ] Criar o componente `Lampada`;
* [ ] Importar `useState`;
* [ ] Criar uma variável comum;
* [ ] Criar um estado com `useState`;
* [ ] Utilizar as imagens acesa e apagada;
* [ ] Utilizar uma operação ternária;
* [ ] Criar um botão para cada exemplo;
* [ ] Alterar o texto do botão do `useState`;
* [ ] Utilizar textos alternativos no atributo `alt`;
* [ ] Não utilizar CSS;
* [ ] Não utilizar Tailwind CSS;
* [ ] Testar o resultado no navegador;
* [ ] Verificar a variável comum no console.

---

## Perguntas para responder

1. Por que a variável comum não atualiza a imagem na página?
2. O que a função `setLampadaStateAcesa` faz?
3. O que o símbolo `!` faz com um valor booleano?
4. Qual é a função da operação ternária?
5. O que acontece quando o estado é atualizado?
6. Por que utilizamos dois arquivos de imagem?
7. Qual é a diferença entre `lampadaStateAcesa` e `setLampadaStateAcesa`?

> **Valor booleano** é um valor que possui somente duas possibilidades: `true`, que significa verdadeiro, ou `false`, que significa falso.

---

## Desafio

Depois de concluir o exercício:

1. Faça a lâmpada começar acesa;
2. Adicione um título diferente para cada estado;
3. Mostre a mensagem `Economize energia!` quando a lâmpada estiver acesa;
4. Mostre a mensagem `A lâmpada está descansando.` quando ela estiver apagada;
5. Crie um segundo componente utilizando o mesmo conceito.

---

## Registrar a atividade no Git

Confira as alterações:

```bash
git status
```

Adicione os arquivos:

```bash
git add .
```

Crie o commit:

```bash
git commit -m "feat: adiciona exercício da lâmpada com useState"
```

Publique as alterações:

```bash
git push
```
---


git push
```

---
## 1. Instalar os pacotes

Execute no terminal:

```bash
npm install react-router
```

---

## 2. Criar a pasta de rotas

Crie a pasta `routes` dentro de `src`:

```text
src/
└── routes/
```

---

## 3. Criar os componentes de rota

Adote o seguinte padrão dentro de `src/routes`:
* O nome da subpasta será o nome do componente (ex: `/Produtos`);
* O arquivo do componente sempre se chamará `index.tsx`;
* A função exportada terá o mesmo nome da subpasta: `export default function NomeDaPasta() { ... }`.

Rotas a serem criadas:
* `src/routes/Home/index.tsx`
* `src/routes/Produtos/index.tsx`
* `src/routes/EditarProdutos/index.tsx`
* `src/routes/Error/index.tsx`

---

## 4 e 5. Importar recursos no `main.tsx`

No arquivo `src/main.tsx`, importe os componentes criados e os utilitários de roteamento:

```tsx
import { createBrowserRouter, RouterProvider } from 'react-router'

import App from './App'
import Home from './routes/Home'
import Produtos from './routes/Produtos'
import EditarProdutos from './routes/EditarProdutos'
import Error from './routes/Error'
```

---

## 6. Configurar a árvore de rotas

Defina a constante `router` utilizando `createBrowserRouter`:

```tsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/produtos', element: <Produtos /> },
      { path: '/editar-produtos', element: <EditarProdutos /> }
    ]
  }
])
```

---

## 7. Atualizar a renderização no `main.tsx`

Substitua `<App />` diretamente por `<RouterProvider router={router} />`:

```tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
```

---

## 8. Ajustar o layout no `App.tsx`

No componente `App.tsx`, substitua o conteúdo estático pelo componente `<Outlet />`:

```tsx
import { Outlet } from 'react-router'
import Cabecalho from './components/Cabecalho'
import Rodape from './components/Rodape'

export default function App() {
  return (
    <>
      <Cabecalho />
      <Outlet />
      <Rodape />
    </>
  )
}
```

---

## 9. Testar rotas no navegador

Acesse diretamente pela URL para validar a navegação:
* `http://localhost:5173/`
* `http://localhost:5173/produtos`
* `http://localhost:5173/editar-produtos`

> **Nota:** O cabeçalho e o rodapé permanecem estáticos na tela; apenas a área do `<Outlet />` é atualizada.

---

## 10. Criar o componente `<Menu />`

Crie o componente de navegação usando `<Link>` e insira-o dentro do `<Cabecalho />`:

```tsx
import { Link } from 'react-router'

export default function Menu() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/produtos">Produtos</Link></li>
        <li><Link to="/editar-produtos">Editar Produtos</Link></li>
      </ul>
    </nav>
  )
}
```


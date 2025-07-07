## Sistema de Gerenciamento de Estoque

Projeto desenvolvido com React que tem como finalidade representar um sistema de gerenciamento de estoque, e trabalho individual da minha faculdade.

## Tecnologias Utilizadas

- React
- CSS Modules
- Framer Motion
- jsPDF + AutoTable
- LocalStorage
- React Libraries ( todas no arquivo package.json )

## Objetivo do Trabalho

O Principal objetivo desse trabalho era criar um sistema web comumente utilizado no mercado, como uma loja virtual, um site de hospedagem, ou outro por exemplo. Como ainda não tenho um bom conhecimento em linguagens
back-end, optei por fazer essa parte com uma simulação no front-end, atribuindo as funcionalidades necessárias de um sistema de gerenciamento. 

## Principais desafios:

-Grande quantidade de novos conteúdos
-Atualizar e atribuir as mudanças no site conforme a chegada de novas informações.
-Simular o back-end com front-end
-Sistema responsivo em Dekstop x Mobile

## Novidades

Durante o desenvolvimento, me deparei com bastante conteúdo novo e que não havia ainda visto nem nos cursos que faço de programação, dentre eles: Hooks (UseEffect, CreateContext, UseContext, personalizados), 
LocalStorage, Libraries do react e entre outros. Como o prazo para a entrega era curto, priorizei finalizar toda lógica que envolvia tais conteúdos, depois peguei para reler e compreender o funcionamento
de cada coisa, e hoje compreendo estes conceitos e a lógica do sistema.

 ## Site dinâmico

Sem dúvidas deixar o site dinâmico me custou trabalho, pois minha intenção era deixar os produtos e informações todos já predefinidos, principalmente por não ter noção de como faria essa dinâmica.
Porém, resolvi fazer essa mudança, e com bastante  ajuda da IA, consegui deixar o site reativo aos movimentos que são feitos no mesmo.

## Simulação do back-end no front-end

Como mencionado no tópico anterior, a principal dificuldade foi fazer isso sem um grande conhecimento prévio. Fiz a lógica, em seguida testes de funcionalidade, 
e depois de finalizado, reli todo o código e compreendi o que estava sendo feito.

## Responsividade Desktop e Mobile

Um problema que eu enfrentei foi a dificuldade em tornar o sistema responsivo em mobile, uma vez que optei por uma sidebar ( navbar vertical e posicionada ao canto da tela ). Tive a ideia
de fazer com que em telas menores, a barra de navegação mudasse para o centro da tela, o que facilitou e muito o desenvolvimento e tornou o site utilizável em dispositivos menores.

## Considerações Finais:

Fazer esse projeto para mim foi excelente, pois por mais que tenha sofrido para finalizá-lo, me ensinou muito e sem dúvidas me melhorou como desenvolvedor. 
Apesar de tudo, algumas coisas eu não consegui resolver no meu site, como o card de faturamento do mês no dashboard , que dependendo do movimento , reduz o faturamento mensal 
( provavelmente pois não simulei compras no meu site ) e o registro de vendas , que acaba removendo produtos do estoque, sendo que era apenas para fazer um registro. Sobre o design, Apesar dos erros, posso
melhorar esse site futuramente, corrigindo os bugs e adicionando sistemas de login, quando estiver mais desenvolvido. Sobre o design, não tive problemas em fazer o design do site, recorrendo a IA apenas a lógica. 
A Logo GSGerenciamentos foi produzida no intuito de simular uma empresa, e fiz a edição de imagens para colocar no meu site, como as duas que estão nos botões de adicionar produto e excluir produto.  


## Aqui está o sistema totalmente utilizável online:

[Clique aqui para gerar seu QR Code](https://gerador-de-qrcode-gamma.vercel.app/)

## Rode o projeto localmente:

# Clone o repositório
git clone https://github.com/DaviAntonioMendesGaiga/Gerenciamento-de-estoque.git

# Instale as dependências
npm install

# Acesse a pasta do projeto
cd gerenciamentodeestoque

# Rode o projeto
npm run dev

// Conteúdo do curso: apostila do Instrutor Léo Pedroso (Duplo Alfa),
// com colaboração do Instrutor Rogério Torres (Tactical School).
// cat = tema da prova teórica da PF que o capítulo alimenta.

const CATS = {
  seg: { name: "Normas de segurança", n: 6 },
  nomen: { name: "Nomenclatura e funcionamento", n: 6 },
  estande: { name: "Conduta no estande", n: 3 },
  lei: { name: "Legislação", n: 5 },
};

const CHAPTERS = [
  {
    id: "intro", title: "Antes de começar", sub: "Como é a prova e como usar o curso", icon: "🎯", cat: null,
    slides: [
      { kicker: "Curso de Armamento e Tiro", title: "Bem-vindo à linha de tiro.",
        body: `<p class="lead">Eu sou o <strong>Instrutor Léo Pedroso</strong> e vou te levar, capítulo por capítulo, por tudo o que cai na <strong>prova de capacidade técnica</strong> para manuseio de arma de fogo.</p>
        <p>O conteúdo segue a cartilha de armamento e tiro da Polícia Federal: revólver e pistola, segurança, funcionamento, fundamentos e legislação.</p>`,
        img: "img/logo.webp", imgClass: "contain round",
        tip: "Estude com calma. Segurança não é uma matéria da prova: é a prova inteira." },
      { kicker: "Como a prova funciona", title: "20 questões. 60% para passar.",
        body: `<div class="stats">
          <div><b>6</b><span>Normas de segurança</span></div>
          <div><b>6</b><span>Nomenclatura e funcionamento</span></div>
          <div><b>3</b><span>Conduta no estande</span></div>
          <div><b>5</b><span>Legislação</span></div>
        </div>
        <p>A prova teórica tem 20 questões objetivas e exige <strong>60% de acerto</strong> (12 questões). Depois vem a prova prática de tiro. O simulado do curso segue exatamente essa divisão.</p>`,
        tip: "Acertou 12? Passou. Mas mire nos 20: arma não aceita “quase”." },
      { kicker: "Como usar", title: "Leia, toque, teste.",
        body: `<p>Cada capítulo tem aulas curtas com as figuras da apostila e exercícios para você mexer: <strong>cartões que viram</strong>, <strong>certo ou errado</strong>, <strong>coloque na ordem</strong> e até um <strong>simulador de visada</strong>.</p>
        <p>No fim de cada capítulo tem um <strong>checkpoint</strong> com perguntas no estilo da prova. Experimente agora:</p>`,
        widget: { type: "flip", cards: [["Toque aqui", "É assim que os cartões funcionam: frente com a pergunta, verso com a resposta. 👍"], ["Quantas questões tem a prova?", "20 questões, e você precisa de 12 acertos (60%)."]] } },
    ],
  },

  {
    id: "seg", title: "Regras de Segurança", sub: "A base de tudo: cano, dedo, trava e bom senso", icon: "🛡️", cat: "seg",
    slides: [
      { kicker: "A regra de ouro", title: "Toda arma está carregada.",
        body: `<p class="lead">Trate toda arma de fogo como se ela <strong>sempre</strong> estivesse carregada.</p>
        <p>Todo manuseio, de qualquer arma, curta ou longa, tem que ser feito de forma absolutamente segura: na limpeza, no esporte, na defesa, no estande ou em casa. As regras valem em <strong>todas</strong> as situações, sem exceção.</p>`,
        tip: "“Ela estava descarregada” é a frase mais repetida em relatório de acidente." },
      { kicker: "Cano e dedo", title: "Para onde aponta, onde fica o dedo",
        body: `<ul>
          <li>Só aponte a arma, carregada ou não, para onde pretende atirar.</li>
          <li>Nunca aponte para direção que não ofereça segurança.</li>
          <li>Mantenha o <strong>dedo estendido ao longo do corpo da arma</strong> até estar apontando para o alvo e pronto para o disparo.</li>
          <li>Ao sacar ou coldrear, sempre com o dedo estendido.</li>
          <li>Nunca engatilhe a arma se não for atirar.</li>
          <li>Fora do coldre e empunhada, nunca aponte para o seu corpo ou para pessoas ao redor.</li>
        </ul>`, img: "img/disparo-pistola.webp" },
      { kicker: "Mão em mão", title: "Pegar, entregar, carregar",
        body: `<ul>
          <li>Nunca pegue ou receba uma arma com o cano apontado na sua direção.</li>
          <li>Sempre <strong>entregue a arma descarregada</strong>.</li>
          <li>Sempre que pegar uma arma, <strong>verifique se está realmente descarregada</strong>.</li>
          <li>Carregue e descarregue com o cano apontado para direção segura.</li>
          <li>Confira se a munição corresponde ao tamanho e ao calibre da arma.</li>
          <li>Antes de qualquer limpeza, certifique-se de que está descarregada.</li>
        </ul>`,
        widget: { type: "choice", q: "Um amigo te entrega a arma dizendo: “pode pegar, tá vazia”. O que você faz?",
          o: ["Verifico eu mesmo se está descarregada", "Confio, ele é experiente", "Puxo o gatilho pra conferir", "Olho pelo cano"],
          e: "Sempre que pegar uma arma, verifique você mesmo se está realmente descarregada. Confiança não é procedimento." } },
      { kicker: "Travas e guarda", title: "Travas não pensam por você",
        body: `<ul>
          <li>As travas são <strong>dispositivos mecânicos</strong>, não substitutos do bom senso.</li>
          <li>Nunca teste as travas acionando a tecla do gatilho.</li>
          <li>Nunca transporte ou coldreie a arma com o <strong>cão armado</strong>.</li>
          <li>Nunca deixe uma arma de forma descuidada.</li>
          <li>Guarde <strong>armas e munições separadamente</strong>, fora do alcance de crianças.</li>
        </ul>` },
      { kicker: "No estande e no campo", title: "Alvo, ricochete e proteção",
        body: `<ul>
          <li>O alvo e a área ao redor precisam suportar os impactos com máxima segurança.</li>
          <li>Nunca atire em <strong>superfícies planas e duras ou na água</strong>: o projétil pode ricochetear.</li>
          <li>Sempre use <strong>óculos de proteção e abafador</strong>.</li>
          <li>Revólveres soltam gases e resíduos de chumbo pela folga entre cano e tambor; pistolas e rifles ejetam estojos quentes para o lado. Mãos e pessoas longe dessas zonas.</li>
        </ul>` },
      { kicker: "Quando algo sai do normal", title: "Negou fogo? Recuo estranho?",
        body: `<ul>
          <li><strong>Negou fogo?</strong> Mantenha a arma apontada para o alvo por cerca de <strong>30 segundos</strong>: pode haver retardo de ignição.</li>
          <li>Recuo ou som anormal? <strong>Pare</strong>, descarregue e verifique se há obstrução no cano. Qualquer coisa lá dentro (projétil, lama, terra, graxa) sai antes do próximo tiro.</li>
          <li>Munição velha ou recarregada não é confiável e pode ser perigosa.</li>
          <li>Nunca modifique a arma; se precisar, só com armeiro qualificado.</li>
          <li>Nunca porte arma sob efeito de álcool, drogas ou medicamentos que reduzam a percepção.</li>
        </ul>`,
        tip: "Barulho de “pof” em vez de “BANG”? Desconfie. Pode ser tiro chocho e o projétil ficou no cano." },
      { kicker: "Revisão rápida", title: "Certo ou errado?",
        body: `<p>Marque cada afirmação. A explicação aparece na hora.</p>`,
        widget: { type: "tf", items: [
          ["A trava de segurança garante que a arma não vai disparar.", false, "Trava é dispositivo mecânico e pode falhar. Não substitui o bom senso."],
          ["Armas e munições devem ser guardadas separadamente.", true, "E sempre fora do alcance de crianças."],
          ["Se a arma negar fogo, abro na hora para ver o que houve.", false, "Mantenha apontada para o alvo por cerca de 30 segundos: pode ser retardo de ignição."],
          ["Posso atirar na água, ela segura o projétil.", false, "Água e superfícies duras e planas causam ricochete."],
          ["Ao entregar a arma a alguém, ela deve estar descarregada.", true, "E quem recebe também confere."],
        ] } },
    ],
  },

  {
    id: "estande", title: "Conduta no Estande", sub: "Silêncio, comando e alinhamento", icon: "📢", cat: "estande",
    slides: [
      { kicker: "As regras da casa", title: "No estande, quem manda é o instrutor",
        body: `<ol>
          <li><strong>Silêncio</strong> é fator preponderante de segurança na linha de tiro.</li>
          <li>A arma fica sempre <strong>desmuniciada e guardada</strong>, salvo comando expresso do instrutor.</li>
          <li>Carregar, sacar, descarregar, inspecionar e coldrear: só <strong>sob comando</strong>, com o cano para direção segura.</li>
          <li>Obedeça aos comandos. <strong>Nunca antecipe</strong> e nunca faça nada que não foi comandado.</li>
        </ol>` },
      { kicker: "Deu problema?", title: "Braço pra cima, arma no alvo.",
        body: `<ol start="5">
          <li>Em qualquer incidente: permaneça <strong>de frente para o alvo</strong>, arma apontada para o alvo, e <strong>levante o braço oposto</strong> para o instrutor te atender.</li>
          <li>Com mais de um candidato na prova, mantenha o <strong>alinhamento</strong> com os outros atiradores.</li>
        </ol>
        <p>Na prova prática, você começa na <strong>posição de retenção</strong>, e as armas com trava ficam travadas até o comando de início.</p>`,
        tip: "Virar para trás com a arma na mão para perguntar algo é reprovação na hora (e susto geral)." },
      { kicker: "Treino", title: "Coloque na ordem",
        body: `<p>Sua pistola travou no meio da prova. Toque nos passos na <strong>ordem certa</strong>:</p>`,
        widget: { type: "order", items: ["Manter a arma apontada para o alvo", "Ficar de frente para o alvo, sem se virar", "Levantar o braço oposto", "Aguardar e seguir o comando do instrutor"] } },
    ],
  },

  {
    id: "conceitos", title: "Arma de Fogo e Tipos", sub: "Revólver, pistola, carabina, rifle e espingarda", icon: "🔫", cat: "nomen",
    slides: [
      { kicker: "Conceito", title: "O que é arma de fogo",
        body: `<p class="lead">Arma que arremessa projéteis usando a <strong>força expansiva dos gases</strong> gerados pela combustão de um propelente confinado em uma câmara.</p>
        <p>A câmara normalmente é solidária a um <strong>cano</strong>, que dá continuidade à combustão e garante direção e estabilidade ao projétil.</p>` },
      { kicker: "Armas curtas", title: "Revólver × pistola",
        body: `<div class="two">
          <div><h4>Revólver</h4><p>Curta, de porte, de repetição. Tem um <strong>cilindro giratório (tambor)</strong> atrás do cano que serve de carregador; cada furo recebe um cartucho e funciona como câmara.</p></div>
          <div><h4>Pistola</h4><p>Curta, de porte, geralmente <strong>semiautomática</strong>. Tem <strong>câmara única</strong>, que faz parte do cano, e um carregador que apresenta os cartuchos em fila. Existe também a pistola de repetição, carregada tiro a tiro.</p></div>
        </div>` },
      { kicker: "Armas longas", title: "Carabina, rifle e espingarda",
        body: `<p>Toque em cada cartão para lembrar a diferença:</p>`,
        img: "img/carabina.webp", imgClass: "contain light",
        widget: { type: "flip", cards: [
          ["Carabina", "Longa, portátil, alma <strong>raiada</strong>, cano de <strong>até 16 polegadas</strong>."],
          ["Rifle", "Longa, portátil, alma raiada, cano <strong>maior que 16 polegadas</strong>: mais precisão e alcance."],
          ["Espingarda", "Longa, portátil, alma <strong>lisa</strong> (sem raiamento). Calibre em <em>gauge</em>, ex.: 12GA."],
        ] } },
      { kicker: "Exemplo da apostila", title: "Espingarda calibre 12",
        body: `<p>Repare na nomenclatura da espingarda: coronha, soleira, gatilho, guarda-mato, cano e telha. Alma lisa é o que define a espingarda.</p>`,
        img: "img/espingarda.webp", imgClass: "contain light",
        tip: "Raiada ou lisa? Essa pergunta sozinha separa espingarda de carabina e rifle." },
    ],
  },

  {
    id: "municao", title: "Munição e Calibre", sub: "Os 4 componentes do cartucho e o raiamento", icon: "🧨", cat: "nomen",
    slides: [
      { kicker: "Munição", title: "Cartucho é o conjunto completo",
        body: `<p class="lead">Munição é o artefato completo, pronto para carregar e disparar. Ela se divide em <strong>estojo, espoleta, pólvora e projétil</strong>.</p>`,
        img: "img/municoes.webp", tip: "Bala é só a ponta. O conjunto completo se chama cartucho." },
      { kicker: "Componentes", title: "Para que serve cada parte?",
        body: `<p>Vire os cartões:</p>`, img: "img/cartucho.webp", imgClass: "contain light",
        widget: { type: "flip", cards: [
          ["Estojo", "União mecânica: junta todos os componentes numa peça só e agiliza o carregamento."],
          ["Espoleta", "Na base do estojo. Mistura iniciadora que gera a <strong>chama</strong> na percussão."],
          ["Pólvora", "O propelente. Inflamada, expande gases e empurra o projétil."],
          ["Projétil", "A parte lançada pelo cano. Também chamado de bala ou ponta."],
        ] } },
      { kicker: "Calibre", title: "Raias e cheios",
        body: `<p>O <strong>raiamento</strong> são sulcos helicoidais dentro do cano que fazem o projétil girar, dando estabilidade.</p>
        <p>O <strong>calibre real</strong> é o diâmetro interno do cano medido <strong>entre os cheios</strong> (as partes altas do raiamento). Já o calibre do projétil é medido entre os fundos das raias.</p>`,
        img: "img/calibre.webp", imgClass: "contain light",
        widget: { type: "choice", q: "O calibre real de uma arma raiada é medido:", o: ["Entre os cheios", "Entre os fundos das raias", "Pelo peso do projétil", "Pelo comprimento do cano"], e: "Calibre real = diâmetro entre os cheios do raiamento." } },
    ],
  },

  {
    id: "funcionamento", title: "Funcionamento e Acionamento", sub: "Repetição, semi, automático e tipos de ação", icon: "⚙️", cat: "nomen",
    slides: [
      { kicker: "Sistemas de funcionamento", title: "Quem recarrega a arma?",
        body: `<p>Vire os cartões:</p>`,
        widget: { type: "flip", cards: [
          ["Repetição", "Dispara mais de uma vez antes de recarregar, mas a realimentação é feita pela <strong>ação do atirador</strong>."],
          ["Semiautomático", "<strong>Um acionamento do gatilho para cada disparo</strong>. Extração, ejeção e realimentação usam os gases do disparo."],
          ["Automático", "Com o gatilho acionado, atira sem parar até acabar a munição ou soltar o gatilho."],
        ] } },
      { kicker: "Sistemas de acionamento", title: "Ação simples, ação dupla, dupla ação",
        body: `<ul>
          <li><strong>Ação simples:</strong> o gatilho faz só uma coisa, o disparo. O cão já foi armado antes.</li>
          <li><strong>Ação dupla:</strong> o gatilho faz duas coisas: arma o conjunto e dispara.</li>
          <li><strong>Dupla ação:</strong> a arma permite atirar <strong>tanto</strong> em ação simples quanto em ação dupla.</li>
          <li><strong>Ação híbrida:</strong> o armar acontece em duas etapas, uma antes e outra depois do disparo.</li>
        </ul>`,
        tip: "Ação dupla é o que o gatilho faz. Dupla ação é o que a arma permite. Pegadinha clássica de prova." },
      { kicker: "Na prática", title: "Qual é a ação?",
        body: `<p>Você puxa o cão do revólver com o polegar até travar e só depois aciona o gatilho.</p>`,
        widget: { type: "choice", q: "Esse disparo foi em:", o: ["Ação simples", "Ação dupla", "Automático", "Ação híbrida"], e: "O cão já estava armado, então o gatilho só disparou: ação simples." } },
    ],
  },

  {
    id: "pecas", title: "Revólver e Pistola", sub: "Nomenclatura das peças", icon: "🔩", cat: "nomen",
    slides: [
      { kicker: "Explore em 3D", title: "Revólver em 3D",
        body: `<p>Gire com o dedo ou o mouse, toque nas peças ou passe uma por uma. Use <strong>Separar peças</strong> para ver cada parte.</p>`,
        widget: { type: "model3d", kind: "revolver" } },
      { kicker: "Nomenclatura", title: "Composição do revólver",
        body: `<p>Peças que você precisa reconhecer: <strong>cano, tambor, cão, gatilho, guarda-mato, massa de mira, alça de mira, armação, cabo, vareta do extrator e pedal (trava) do tambor</strong>.</p>`,
        img: "img/revolver.webp", imgClass: "contain light" },
      { kicker: "Explore em 3D", title: "Pistola em 3D",
        body: `<p>Agora a pistola: repare no ferrolho, no carregador e nos comandos laterais (retém, alavanca de desmontagem e registro).</p>`,
        widget: { type: "model3d", kind: "pistola" } },
      { kicker: "Nomenclatura", title: "Composição da pistola",
        body: `<p>Peças-chave: <strong>ferrolho, cano, armação, gatilho, guarda-mato, cão, massa e alça de mira, carregador, retém do carregador, retém do ferrolho, alavanca de desmontagem, registro de segurança</strong>.</p>`,
        img: "img/pistola.webp", imgClass: "contain light" },
      { kicker: "Carregador", title: "Peças do carregador",
        body: `<p>O carregador tem <strong>corpo, mola, transportador (plataforma) e base</strong>. A mola empurra os cartuchos em fila para a pistola.</p>`,
        img: "img/carregador.webp", imgClass: "contain light",
        widget: { type: "choice", q: "No revólver, a peça que serve de carregador é:", o: ["O tambor", "O ferrolho", "O guarda-mato", "O retém"], e: "O tambor (cilindro giratório) é o carregador do revólver; cada furo é uma câmara." } },
    ],
  },

  {
    id: "fundamentos", title: "Fundamentos do Tiro", sub: "Posição, empunhadura, visada, gatilho e respiração", icon: "🎯", cat: "nomen",
    slides: [
      { kicker: "Fundamento 1", title: "Posição do corpo",
        body: `<p>A base do atirador, ou seja, sua posição na hora do disparo, influencia tudo. É a forma como você se posiciona diante do alvo.</p>`,
        img: "img/posicao.webp" },
      { kicker: "Fundamento 1", title: "Isósceles × Weaver",
        body: `<div class="two">
          <div><h4>Isósceles</h4><p>Corpo e joelhos semiflexionados, <strong>pés na mesma linha</strong>, braços estendidos formando um triângulo.</p></div>
          <div><h4>Weaver</h4><p>Criada nos anos 1950 por Jack Weaver. <strong>Braços flexionados</strong>, pés como os de um boxeador.</p></div>
        </div>`, img: "img/isosceles.webp", imgB: "img/weaver.webp" },
      { kicker: "Fundamento 2", title: "Empunhadura",
        body: `<p><strong>Revólver:</strong> todos os dedos <strong>atrás do tambor</strong>. Os gases e resíduos de chumbo que saem entre cano e tambor podem ferir gravemente; num .357 podem até amputar um dedo.</p>
        <p><strong>Pistola:</strong> mão forte bem posicionada e mão fraca com o <strong>polegar estendido</strong> sobre o corpo da arma, lembrando que o <strong>ferrolho</strong> se move a cada disparo.</p>`,
        img: "img/empunhadura-revolver.webp" },
      { kicker: "Fundamento 3", title: "Linha de visada",
        body: `<p>Linha reta que sai do <strong>olho</strong>, passa pela <strong>alça de mira</strong> e pela <strong>massa de mira</strong> e termina no <strong>alvo</strong>.</p>`,
        img: "img/linha-visada.webp", imgClass: "contain light" },
      { kicker: "Fundamento 3 · Jogo", title: "Alinhe e dispare",
        body: `<p>Arraste com o dedo ou o mouse até a <strong>massa</strong> ficar no meio da <strong>alça</strong>, com os topos nivelados, e aperte <strong>Disparar</strong>. A mão balança um pouco, como na vida real, e o recuo tira a visada do lugar a cada tiro. São 5 tiros por série.</p>`,
        img: "img/visada-ideal.webp",
        widget: { type: "sight" } },
      { kicker: "Fundamento 4", title: "Acionamento do gatilho",
        body: `<p>O fundamento mais difícil e o mais importante: é na hora do disparo que quase todo mundo erra.</p>
        <ul><li><strong>Pistola:</strong> gatilho no <strong>meio da primeira falange</strong> do indicador.</li>
        <li><strong>Revólver:</strong> como o gatilho costuma ser mais pesado, fica mais próximo da <strong>primeira dobra</strong> da falange.</li></ul>`,
        img: "img/gatilho.webp" },
      { kicker: "Fundamento 5 · Treino", title: "Respiração",
        body: `<p>A respiração faz o cano subir e descer. Respire tranquilo e, com a visada pronta, faça uma <strong>breve apneia</strong> (prender a respiração) no momento do acionamento. Treine o ritmo:</p>`,
        widget: { type: "breath" } },
      { kicker: "Fundamento 6", title: "Controle emocional",
        body: `<p class="lead">Nem euforia com o acerto, nem frustração com o erro.</p><p>O controle emocional sustenta todos os outros fundamentos. Um disparo ruim não pode contaminar o próximo.</p>`,
        tip: "Acertou o 10? Comemore depois de descarregar e coldrear. 😉" },
    ],
  },

  {
    id: "ciclo", title: "M.A.C., Ciclo e Panes", sub: "Do carregador à ejeção, e o que pode dar errado", icon: "🔄", cat: "nomen",
    slides: [
      { kicker: "M.A.C.", title: "Municiar, Alimentar, Carregar",
        body: `<div class="stats three">
          <div><b>M</b><span><strong>Municiar:</strong> colocar a munição no carregador</span></div>
          <div><b>A</b><span><strong>Alimentar:</strong> inserir o carregador municiado na arma</span></div>
          <div><b>C</b><span><strong>Carregar:</strong> agir no ferrolho e levar o cartucho à câmara</span></div>
        </div>`,
        widget: { type: "order", prompt: "Toque na ordem certa:", items: ["Municiar", "Alimentar", "Carregar"] } },
      { kicker: "Ciclo do disparo", title: "Passo a passo",
        body: `<p>Avance pelas etapas do disparo de uma pistola:</p>`, img: "img/ciclo.webp",
        widget: { type: "steps", steps: [
          ["Gatilho", "O gatilho libera o <strong>cão</strong>."],
          ["Percussão", "O cão bate no <strong>percussor</strong>, que atinge a <strong>espoleta</strong>."],
          ["Ignição", "A espoleta gera a chama e inflama a <strong>pólvora</strong>."],
          ["Disparo", "Os gases se expandem e lançam o <strong>projétil</strong> para fora do cano."],
          ["Extração", "O ferrolho volta e puxa o estojo vazio, preso pelo <strong>extrator</strong>."],
          ["Ejeção", "O estojo bate no <strong>ejetor</strong> e sai pela janela de ejeção."],
        ] } },
      { kicker: "Panes", title: "O que pode dar errado",
        body: `<ul>
          <li>Pane de alimentação · Pane de chaminé · Pane seca.</li>
          <li><strong>Pane fatal / tiro chocho:</strong> falta propelente e o projétil fica preso no cano. Um novo disparo pode causar explosão, perda da arma e acidente grave.</li>
          <li><strong>Retardo de disparo:</strong> acionou e não disparou. Mantenha apontada para o alvo de <strong>15 a 30 segundos</strong>.</li>
        </ul>`,
        widget: { type: "choice", q: "O tiro saiu fraco, com um “pof” diferente. Qual é o risco?", o: ["Projétil preso no cano (tiro chocho)", "Munição fria, é normal", "Arma descalibrada", "Nenhum, pode seguir"], e: "Pare, descarregue e verifique o cano. Atirar de novo com projétil preso pode explodir a arma." } },
    ],
  },

  {
    id: "saque", title: "Saque, Modalidades e Manutenção", sub: "Coldre, tiro esportivo e limpeza", icon: "🧰", cat: "estande",
    slides: [
      { kicker: "Saque", title: "Saque da arma",
        body: `<p>O saque é muito usado no tiro prático esportivo e defensivo. Cada modalidade tem seu modelo de coldre, mas sempre com a arma em <strong>condição segura</strong> e o dedo fora do gatilho.</p>`,
        img: "img/saque.webp", imgClass: "contain" },
      { kicker: "Tiro esportivo", title: "Modalidades",
        body: `<p>Algumas modalidades de revólver e pistola:</p>`, img: "img/ipsc.webp",
        widget: { type: "flip", cards: [
          ["IPSC", "Tiro prático: percursos com vários alvos, deslocamento e tempo."],
          ["SR", "Saque rápido."],
          ["TRP", "Tiro rápido de precisão."],
          ["NRA · IDPA", "Outras modalidades de pistola e revólver, entre muitas."],
        ] } },
      { kicker: "Manutenção", title: "Limpeza em escalões",
        body: `<ul>
          <li>Siga a recomendação do fabricante.</li>
          <li><strong>1º escalão:</strong> pelo próprio atirador, após cada uso (principalmente com munição recarregada).</li>
          <li>Limpar o cano evita o <strong>chumbamento</strong>.</li>
          <li><strong>2º escalão:</strong> com armeiro de confiança, após alto volume de disparos.</li>
          <li>Arma <strong>locada</strong> no estande: nada de desmontar sem permissão e acompanhamento do instrutor.</li>
        </ul>`,
        widget: { type: "tf", items: [
          ["Posso desmontar a arma locada para limpar, se eu souber como.", false, "Só com permissão e acompanhamento do instrutor responsável."],
          ["Limpar o cano evita o chumbamento.", true, "Resíduos de chumbo se acumulam no cano."],
        ] } },
    ],
  },

  {
    id: "lei", title: "Legislação", sub: "Estatuto do Desarmamento, SIGMA e SINARM", icon: "⚖️", cat: "lei",
    slides: [
      { kicker: "Sistemas", title: "SIGMA × SINARM",
        body: `<div class="two">
          <div><h4>SINARM</h4><p>Sistema Nacional de Armas, da <strong>Polícia Federal</strong>. Armas para <strong>defesa pessoal, residencial e patrimonial</strong>.</p></div>
          <div><h4>SIGMA</h4><p>Sistema de Gerenciamento Militar de Armas, do <strong>Exército Brasileiro</strong>. Ligado ao <strong>CR</strong> de CAC (caçador, atirador e colecionador).</p></div>
        </div>
        <p>A base de tudo é a <strong>Lei 10.826/2003</strong>, o Estatuto do Desarmamento.</p>` },
      { kicker: "Definições", title: "Porte, portátil, proibida…",
        body: `<p>Vire os cartões. Esses termos caem muito:</p>`,
        widget: { type: "flip", cards: [
          ["Arma de porte", "Dimensões e peso reduzidos, disparada com uma só mão: pistola, revólver, garrucha."],
          ["Arma portátil", "Transportada por uma pessoa: fuzil, carabina, espingarda."],
          ["Não portátil", "Exige mais de uma pessoa, veículo ou estrutura fixa."],
          ["Uso proibido", "Vetadas por tratados e as <strong>dissimuladas</strong>, com aparência de objeto inofensivo."],
          ["Munição restrita", "Inclui traçantes, perfurantes e fumígenas."],
          ["Arma obsoleta", "Munição não é mais fabricada, ou é relíquia/peça de coleção inerte."],
          ["Cadastro × registro", "Cadastro: a arma entra no banco de dados. Registro: a arma é vinculada ao dono."],
          ["Porte de trânsito", "Direito do CAC de transitar com as armas do acervo para suas atividades (Guia de Tráfego)."],
        ] } },
      { kicker: "Posse e porte", title: "O que é cada um e o que é crime",
        body: `<ul>
          <li><strong>Posse:</strong> manter a arma registrada em casa ou no local de trabalho (se for o titular ou responsável).</li>
          <li><strong>Porte:</strong> levar a arma consigo fora desses locais. Em regra, é <strong>proibido</strong> em todo o território nacional, salvo os casos previstos em lei.</li>
          <li>Idade mínima para adquirir arma: <strong>25 anos</strong>.</li>
          <li>São crimes: posse irregular, <strong>omissão de cautela</strong> (deixar menor de 18 anos ou pessoa com deficiência mental se apoderar da arma), porte ilegal e disparo em via pública.</li>
          <li>Capacidade técnica: atestada por <strong>instrutor credenciado pela PF</strong>. Aptidão psicológica: por <strong>psicólogo credenciado pela PF</strong>.</li>
        </ul>` },
      { kicker: "Atualização", title: "⚠️ A lei mudou depois da apostila",
        body: `<p>A apostila original cita o Decreto 9.846/2019. Ele foi <strong>revogado</strong>: hoje a Lei 10.826/2003 é regulamentada pelo <strong>Decreto 11.615/2023</strong>, alterado pelo <strong>Decreto 12.345/2024</strong>.</p>
        <p>Entre as mudanças: prazos de validade de registros menores, regras mais rígidas para CAC e mais restrição a armas e munições de uso restrito. Por isso o curso não cobra os limites antigos de quantidade de armas e munições. <strong>Confirme sempre a regra atual com o instrutor</strong>.</p>`,
        tip: "É responsabilidade de quem tem arma se manter atualizado. A lei não aceita “eu não sabia”." },
    ],
  },

  {
    id: "defesa", title: "Legítima Defesa", sub: "Art. 25 do Código Penal e os 5 requisitos", icon: "🧠", cat: "lei",
    slides: [
      { kicker: "Código Penal", title: "Art. 25",
        body: `<p class="lead">Age em legítima defesa quem, usando <strong>moderadamente</strong> dos meios necessários, repele <strong>injusta agressão, atual ou iminente</strong>, a direito seu ou de outrem.</p>
        <p>É causa de <strong>exclusão da ilicitude</strong> (art. 23, II): o fato praticado em legítima defesa não é crime.</p>` },
      { kicker: "Requisitos", title: "Os 5 juntos, sempre",
        body: `<ol>
          <li>Agressão <strong>injusta</strong>;</li>
          <li><strong>Atual ou iminente</strong>;</li>
          <li>A direito <strong>próprio ou alheio</strong>;</li>
          <li>Reação com os <strong>meios necessários</strong>;</li>
          <li><strong>Uso moderado</strong> desses meios.</li>
        </ol>
        <p>Quando o agressor deixa de ameaçar, a defesa precisa <strong>cessar</strong>. Se você continua, passa a ser agressão.</p>` },
      { kicker: "Casos", title: "É legítima defesa?",
        body: `<p>Analise cada situação com os 5 requisitos:</p>`,
        widget: { type: "tf", yes: "Sim", no: "Não", items: [
          ["Alguém avança armado contra sua família, e você reage para fazer parar a agressão.", true, "Agressão injusta, atual, a direito alheio, com reação para cessá-la."],
          ["O agressor já largou a arma e está fugindo de costas, e você continua atirando.", false, "A agressão cessou. Continuar é excesso: vira agressão."],
          ["Ontem te ameaçaram; hoje você vai até a pessoa “se defender”.", false, "Não há agressão atual nem iminente. Isso é vingança."],
        ] },
        tip: "Saber parar faz parte da defesa." },
    ],
  },

  {
    id: "fim", title: "Reta Final", sub: "Simulado e contato com o instrutor", icon: "🏁", cat: null,
    slides: [
      { kicker: "Reta final", title: "Agora é com você.",
        body: `<p class="lead">Você passou por todo o conteúdo da prova teórica. Agora faça o <strong>simulado</strong>: 20 questões no formato oficial, com correção comentada.</p>
        <p>Curso de tiro esportivo, defesa, combate, primeiros socorros e APH tático? Fale com a gente:</p>
        <div class="contacts">
          <a href="https://wa.me/5511975324734" target="_blank" rel="noopener">Léo Pedroso · (11) 97532-4734</a>
          <a href="https://wa.me/5511974163421" target="_blank" rel="noopener">Rogério Torres · (11) 97416-3421</a>
        </div>`, img: "img/logo.webp", imgClass: "contain round", end: true },
    ],
  },
];

// Banco de questões por capítulo. Em "o", a primeira opção é a correta (o app embaralha).
const QBANK = {
  seg: [
    ["Qual é a regra de ouro no manuseio de uma arma de fogo?", ["Tratá-la sempre como se estivesse carregada", "Confiar na trava de segurança", "Verificar só quando for atirar", "Perguntar pra arma se ela tá carregada"], "Toda arma deve ser tratada como carregada, sempre. É a base de todas as outras regras."],
    ["Onde deve ficar o dedo indicador até o atirador estar apontando para o alvo e pronto para atirar?", ["Estendido ao longo do corpo da arma, fora do gatilho", "Apoiado levemente no gatilho", "Dentro do guarda-mato, sem pressionar", "Sobre o cão"], "O dedo fica estendido ao longo da armação até a decisão de atirar, inclusive ao sacar e ao coldrear."],
    ["A arma negou fogo. Qual é o procedimento correto?", ["Mantê-la apontada para o alvo por cerca de 30 segundos", "Abrir imediatamente para ver o que houve", "Olhar dentro do cano", "Puxar o gatilho de novo bem rápido"], "Pode haver retardo de ignição. Mantenha a arma apontada para o alvo por aproximadamente 30 segundos."],
    ["Ao entregar uma arma para outra pessoa, ela deve estar:", ["Descarregada", "Carregada e travada", "Com o cão armado", "Com o cano apontado para quem recebe, para facilitar"], "Sempre entregue descarregada. E quem recebe deve verificar se está realmente descarregada."],
    ["Sobre as travas de segurança, é correto afirmar:", ["São dispositivos mecânicos e não substituem o bom senso", "Garantem que a arma nunca dispare", "Devem ser testadas acionando o gatilho", "Dispensam o cuidado com a direção do cano"], "Travas falham. Nunca teste uma trava puxando o gatilho."],
    ["Por que nunca se deve atirar em superfícies planas e duras ou na água?", ["Porque o projétil pode ricochetear", "Porque a arma pode travar", "Porque aumenta o recuo", "Porque a água apaga a pólvora"], "Superfícies duras e a água podem desviar o projétil para direções imprevisíveis."],
    ["Como armas e munições devem ser guardadas?", ["Separadamente e fora do alcance de crianças", "Juntas, para ganhar tempo", "Na gaveta da cabeceira, carregadas", "No porta-luvas do carro"], "Armas e munições guardadas separadamente, em local seguro e fora do alcance de crianças."],
    ["Durante os disparos, você percebe um recuo e um som anormais. O que fazer?", ["Interromper, descarregar e verificar se há obstrução no cano", "Continuar atirando para desobstruir", "Trocar de munição e seguir", "Ignorar, é coisa da arma"], "Pode ser projétil preso no cano. Um novo disparo pode causar explosão."],
    ["Qual equipamento de proteção é obrigatório ao atirar?", ["Óculos de proteção e abafador de ruídos", "Colete balístico", "Luvas táticas", "Boné com aba para trás"], "Sempre use óculos protetores e abafadores quando estiver atirando."],
    ["Por que manter as mãos longe da folga entre o cano e o tambor do revólver?", ["Porque saem gases e resíduos de chumbo por ali", "Porque o tambor gira e prende o dedo", "Porque esquenta e queima a luva", "Não há motivo, é mito"], "Revólveres desprendem lateralmente gases e resíduos de chumbo entre cano e tambor."],
    ["Pistolas e rifles, ao atirar, ejetam lateralmente:", ["Estojos quentes", "Gases de chumbo pelo tambor", "O carregador", "A espoleta inteira"], "Mantenha mãos e pessoas longe da zona de ejeção."],
    ["Em que condição a arma NUNCA deve ser transportada ou coldreada?", ["Com o cão armado", "Descarregada", "Travada", "Dentro do estojo"], "Nunca transporte ou coldreie a arma com o cão armado."],
    ["Sobre munição velha ou recarregada, é correto dizer:", ["Não é confiável e pode ser perigosa", "É mais potente que a nova", "É a mais indicada para a prova", "Não faz diferença nenhuma"], "Munição velha ou recarregada não é confiável."],
    ["Antes de qualquer limpeza da arma, o atirador deve:", ["Certificar-se de que a arma está descarregada", "Lubrificar o gatilho", "Armar o cão", "Efetuar um disparo para esvaziar"], "Limpeza só com a arma comprovadamente descarregada."],
    ["Quem deve fazer modificações nas características originais de uma arma?", ["Ninguém; se for indispensável, um armeiro profissional qualificado", "O próprio atirador, com tutorial", "Qualquer instrutor no estande", "O vendedor da loja de munição"], "Nunca modifique a arma. Se houver necessidade, só com armeiro qualificado."],
    ["Ao carregar ou descarregar uma arma, o cano deve estar:", ["Apontado para uma direção segura", "Apontado para cima, sempre", "Apontado para o chão, perto dos pés", "Em qualquer direção, já que não vai atirar"], "Carregar e descarregar sempre com o cano em direção segura."],
    ["É permitido portar a arma sob efeito de medicamentos que reduzem a percepção?", ["Não, nem sob efeito de álcool ou drogas", "Sim, se for receita médica", "Sim, desde que travada", "Só em trajetos curtos"], "Nunca porte arma sob efeito de substâncias que diminuam a percepção."],
    ["O que deve ser conferido em relação à munição antes de usá-la?", ["Se corresponde ao tamanho e ao calibre da arma", "Se é da mesma cor do carregador", "Se é da marca preferida do instrutor", "Se está gelada"], "A munição deve corresponder ao calibre e ao tamanho da arma."],
    ["Fora do coldre e empunhada, a arma deve ser apontada:", ["Somente na direção do alvo", "Para o chão, perto do pé", "Para o instrutor, para ele conferir", "Para cima, ao conversar"], "Nunca aponte para o seu corpo ou para outras pessoas."],
    ["Antes de usar uma arma que você não conhece, o correto é:", ["Aprender o manuseio com um instrutor credenciado", "Testar sozinho no quintal", "Ver um vídeo e ir pro estande", "Atirar e aprender errando"], "Obtenha informações sobre o manuseio com um instrutor credenciado."],
  ],
  estande: [
    ["Qual é o fator preponderante de segurança na linha de tiro?", ["O silêncio", "A música ambiente", "A velocidade dos disparos", "A conversa com o vizinho de baia"], "O silêncio deve ser rigorosamente observado para que os comandos sejam ouvidos."],
    ["No estande, a arma permanece:", ["Desmuniciada e guardada, salvo comando expresso do instrutor", "Carregada e no coldre, para ganhar tempo", "Na mão, apontada para o chão", "Sobre a bancada, carregada"], "A arma só sai e só é municiada sob comando do instrutor."],
    ["Houve um incidente com a sua arma na linha de tiro. O que fazer?", ["Ficar de frente para o alvo, arma apontada para ele, e levantar o braço oposto", "Virar para trás e chamar o instrutor", "Colocar a arma no chão e sair", "Tentar resolver sozinho rapidamente"], "Nunca se vire com a arma. Mantenha-a apontada para o alvo e levante o braço oposto."],
    ["Sobre os comandos do instrutor, o candidato deve:", ["Obedecer e nunca antecipar a execução", "Antecipar para mostrar agilidade", "Executar só os que achar necessários", "Esperar o colega fazer primeiro e copiar"], "Faça tudo o que for ordenado, nunca antecipe e nunca faça nada que não foi comandado."],
    ["Carregar, sacar, descarregar, inspecionar e coldrear no estande deve ser feito:", ["Sob comando do instrutor, com o cano em direção segura", "Livremente, a qualquer momento", "Só ao final da prova", "Fora da linha de tiro, no estacionamento"], "Todo procedimento é feito sob comando, com o cano apontado para direção segura."],
    ["Com vários candidatos fazendo a prova ao mesmo tempo, cada atirador deve:", ["Manter o alinhamento com os outros atiradores", "Avançar um passo para ver melhor", "Ficar atrás dos colegas", "Trocar de baia quando quiser"], "Manter o alinhamento evita que alguém fique na linha de fogo de outro."],
    ["Na prova prática, como o candidato inicia?", ["Na posição de retenção, com a trava acionada até o comando de início", "Com a arma apontada para o alvo e destravada", "Com a arma no coldre e o cão armado", "Com a arma sobre a bancada, carregada"], "Pelo regulamento da PF, a prova começa na posição de retenção e as armas com trava ficam travadas até o comando."],
  ],
  saque: [
    ["Pode desmontar uma arma locada no estande?", ["Só com permissão e acompanhamento do instrutor", "Sim, para limpar", "Sim, se já tiver feito em casa", "Sim, se for rápido"], "Em armas locadas não é correto desmontar sem permissão e acompanhamento do instrutor."],
    ["Qual é a limpeza feita pelo próprio atirador após cada uso?", ["Limpeza de 1º escalão", "Limpeza de 2º escalão", "Revisão de fábrica", "Polimento de cano"], "1º escalão: pelo atirador, após cada uso. 2º escalão: com armeiro, após alto volume de disparos."],
    ["A limpeza de 2º escalão é recomendada:", ["Com armeiro de confiança, após alto volume de disparos", "Pelo atirador, a cada tiro", "Nunca, só a de 1º escalão importa", "Só quando a arma quebrar"], "O 2º escalão é feito por armeiro, após muitos disparos."],
    ["Limpar o cano regularmente evita principalmente:", ["O chumbamento do cano", "A ejeção", "O raiamento", "O recuo"], "Resíduos de chumbo se acumulam no cano (chumbamento)."],
    ["Ao sacar ou coldrear a arma, o dedo deve estar:", ["Estendido ao longo da arma, fora do gatilho", "No gatilho, para ganhar tempo", "Segurando o cão", "Dentro do guarda-mato"], "Saque e coldre sempre com o dedo estendido, fora do gatilho."],
    ["IPSC é a sigla da modalidade conhecida como:", ["Tiro prático", "Saque rápido", "Tiro rápido de precisão", "Tiro ao prato"], "IPSC = tiro prático. SR = saque rápido. TRP = tiro rápido de precisão."],
  ],
  conceitos: [
    ["Arma de fogo é aquela que arremessa projéteis usando:", ["A força expansiva dos gases da combustão de um propelente", "Ar comprimido", "Mola", "Energia elétrica"], "Os gases do propelente confinado na câmara empurram o projétil pelo cano."],
    ["O que caracteriza o revólver?", ["Um cilindro giratório (tambor) atrás do cano, que serve de carregador", "Câmara única que faz parte do cano", "Carregador destacável no cabo", "Alma lisa"], "No revólver, cada furo do tambor recebe um cartucho e funciona como câmara."],
    ["Na pistola, a câmara:", ["É única e faz parte do cano", "Fica no tambor", "Fica no carregador", "Não existe"], "A pistola tem câmara única, que faz parte do corpo do cano."],
    ["Qual arma longa tem alma lisa, sem raiamento?", ["Espingarda", "Carabina", "Rifle", "Fuzil"], "A espingarda tem alma lisa e calibre geralmente medido em gauge (ex.: 12GA)."],
    ["A carabina se diferencia do rifle pelo comprimento do cano, que é de:", ["Até 16 polegadas", "Mais de 16 polegadas", "Até 6 polegadas", "Exatamente 20 polegadas"], "Carabina: alma raiada e cano até 16\". Rifle: cano maior que 16\"."],
    ["O calibre da espingarda geralmente é medido em:", ["Gauge (ex.: 12GA)", "Milímetros do raiamento", "Polegadas do cano", "Joules"], "Espingardas usam gauge, como o calibre 12."],
  ],
  municao: [
    ["Quais são os quatro componentes de um cartucho?", ["Estojo, espoleta, pólvora e projétil", "Cano, tambor, cão e gatilho", "Ferrolho, carregador, mola e base", "Bala, ponta, chumbo e cápsula"], "O cartucho é formado por estojo, espoleta, pólvora e projétil."],
    ["Qual componente do cartucho gera a chama no momento da percussão?", ["Espoleta", "Estojo", "Projétil", "Raiamento"], "A espoleta, na base do estojo, contém a mistura iniciadora."],
    ["Qual é a função do estojo?", ["Unir mecanicamente todos os componentes do cartucho", "Dar giro ao projétil", "Inflamar a pólvora", "Guiar o cão até o percussor"], "O estojo une todos os componentes numa única peça."],
    ["O projétil também é chamado de:", ["Bala ou ponta", "Cartucho", "Espoleta", "Estojo"], "Bala é a ponta; cartucho é o conjunto completo."],
    ["O calibre real de uma arma raiada é medido:", ["Entre os cheios do raiamento", "Entre os fundos das raias", "Pelo comprimento do cano", "Pelo peso do projétil"], "Calibre real é o diâmetro interno do cano medido entre os cheios."],
    ["Qual é a função do raiamento do cano?", ["Fazer o projétil girar, dando estabilidade", "Aumentar a quantidade de pólvora", "Esfriar o cano", "Segurar o estojo"], "As raias imprimem giro ao projétil, estabilizando a trajetória."],
  ],
  funcionamento: [
    ["No sistema semiautomático:", ["Cada disparo exige um acionamento do gatilho", "Com o gatilho pressionado, a arma atira sem parar", "O atirador realimenta a arma manualmente a cada tiro", "O tambor gira sozinho"], "Um acionamento por disparo; extração, ejeção e realimentação aproveitam os gases."],
    ["Na arma de repetição, a realimentação é feita:", ["Pela ação do atirador", "Pelos gases do disparo", "Por uma mola elétrica", "Pelo instrutor"], "Na repetição, a realimentação depende da ação do atirador."],
    ["No sistema automático:", ["A arma atira continuamente enquanto o gatilho estiver acionado", "Cada tiro exige um acionamento", "O atirador recarrega a cada tiro", "A arma só dispara em ação dupla"], "Atira até acabar a munição ou cessar a pressão no gatilho."],
    ["Em “ação simples”, ao acionar o gatilho:", ["Ocorre apenas o disparo, pois o cão já foi armado antes", "O cão é armado e a arma dispara", "A arma dispara em rajada", "O carregador é liberado"], "Ação simples: o gatilho só libera o disparo."],
    ["Em “ação dupla”, ao acionar o gatilho:", ["O conjunto é armado e depois ocorre o disparo", "Ocorre só o disparo", "A arma dispara duas vezes", "O ferrolho trava aberto"], "O gatilho faz duas operações: armar e disparar."],
    ["Uma arma de “dupla ação” é aquela que:", ["Permite atirar tanto em ação simples quanto em ação dupla", "Só atira em ação dupla", "Dispara dois tiros por vez", "Tem dois gatilhos"], "Dupla ação = a arma permite os dois modos."],
  ],
  pecas: [
    ["No revólver, qual peça serve de carregador?", ["O tambor", "O ferrolho", "O guarda-mato", "O retém do carregador"], "O tambor é o carregador do revólver."],
    ["Qual peça da pistola se movimenta a cada disparo?", ["Ferrolho", "Guarda-mato", "Massa de mira", "Cabo"], "O ferrolho recua a cada disparo."],
    ["A peça que protege o gatilho contra acionamento acidental é o:", ["Guarda-mato", "Retém", "Cão", "Percussor"], "O guarda-mato envolve o gatilho."],
    ["Massa de mira e alça de mira ficam, respectivamente:", ["Na frente e atrás da arma", "Atrás e na frente", "Ambas no cabo", "Ambas no carregador"], "A massa fica na ponta do cano; a alça, na parte de trás."],
    ["Quais são as peças do carregador da pistola?", ["Corpo, mola, transportador e base", "Tambor, vareta e extrator", "Cão, gatilho e percussor", "Ferrolho e cano"], "Corpo, mola, transportador (plataforma) e base."],
  ],
  fundamentos: [
    ["Na empunhadura do revólver, os dedos devem ficar:", ["Todos atrás do tambor", "Um dedo apoiado na frente do tambor", "Envolvendo o cano", "Sobre o cão"], "Os gases entre cano e tambor podem ferir gravemente."],
    ["Na pistola, em qual parte do dedo o gatilho deve ficar?", ["No meio da primeira falange do indicador", "Na segunda dobra do dedo", "Na ponta da unha", "Com o dedo médio"], "Pistola: meio da primeira falange. Revólver: mais perto da primeira dobra."],
    ["A linha de visada vai do olho do atirador até o alvo passando por:", ["Alça de mira e massa de mira", "Ferrolho e cão", "Guarda-mato e gatilho", "Tambor e cano"], "Olho → alça → massa → alvo."],
    ["O que se recomenda fazer com a respiração no momento do disparo?", ["Uma breve apneia (prender a respiração)", "Respirar rápido e forte", "Expirar gritando", "Prender por um minuto inteiro"], "Respiração tranquila e breve apneia no acionamento."],
    ["A posição Weaver tem como característica:", ["Braços flexionados e pés como os de um boxeador", "Pés na mesma linha e braços totalmente estendidos", "Atirar deitado", "Atirar com uma mão só"], "Weaver: braços flexionados. Isósceles: pés alinhados e braços estendidos."],
    ["Na posição isósceles:", ["Os pés ficam na mesma linha e os braços estendidos", "Um pé fica bem à frente e os braços flexionados", "O atirador fica ajoelhado", "Atira-se com uma só mão"], "Braços estendidos formam um triângulo isósceles."],
    ["Na empunhadura da pistola, a mão fraca fica com:", ["O polegar estendido sobre o corpo da arma", "O polegar atrás do ferrolho", "Os dedos na frente do cano", "O indicador no gatilho"], "E lembrando que o ferrolho se move a cada disparo."],
    ["Por que o gatilho do revólver costuma ficar mais perto da primeira dobra do dedo?", ["Porque o acionamento costuma ser mais pesado", "Porque o tambor é maior", "Porque o revólver não tem guarda-mato", "Por estética"], "Mais alavanca para um gatilho mais pesado."],
    ["Qual é considerado o fundamento mais difícil de dominar?", ["O acionamento do gatilho", "A escolha do coldre", "A limpeza", "O transporte"], "É no acionamento que quase todo mundo erra o disparo."],
  ],
  ciclo: [
    ["No M.A.C., “municiar” significa:", ["Colocar a munição no carregador", "Inserir o carregador na arma", "Levar o cartucho à câmara", "Comprar munição"], "Municiar = munição no carregador."],
    ["No M.A.C., “alimentar” significa:", ["Inserir o carregador municiado na arma", "Colocar munição no carregador", "Levar o cartucho à câmara", "Lubrificar a arma"], "Alimentar = carregador na arma."],
    ["No M.A.C., “carregar” significa:", ["Agir no ferrolho para levar o cartucho à câmara", "Colocar munição no carregador", "Inserir o carregador", "Levar a arma no coldre"], "Carregar = cartucho na câmara, arma em pronto uso."],
    ["O movimento do ferrolho para trás puxando o estojo vazio preso pelo extrator chama-se:", ["Extração", "Ejeção", "Alimentação", "Percussão"], "Extração: o estojo é puxado pelo extrator."],
    ["A ejeção ocorre quando:", ["O estojo vazio bate no ejetor e sai pela janela de ejeção", "O projétil sai do cano", "O carregador é liberado", "O cão bate no percussor"], "Na ejeção, a base do estojo toca o ejetor."],
    ["Qual é a sequência correta do disparo?", ["Gatilho libera o cão → percussor → espoleta → pólvora → projétil", "Pólvora → espoleta → cão → gatilho", "Percussor → gatilho → projétil → espoleta", "Espoleta → ferrolho → cão → pólvora"], "Gatilho, cão, percussor, espoleta, pólvora, projétil."],
    ["O que é o “tiro chocho” (pane fatal)?", ["Falta propelente e o projétil fica preso no cano", "Quando a arma dispara sozinha", "Quando o carregador está vazio", "Quando o atirador erra o alvo"], "Com o projétil preso, um novo disparo pode explodir a arma."],
    ["No retardo de disparo, a arma deve ficar apontada para o alvo por:", ["15 a 30 segundos", "1 a 2 segundos", "5 minutos", "Nenhum tempo, abra na hora"], "A ignição pode acontecer atrasada."],
  ],
  lei: [
    ["Qual lei dispõe sobre registro, posse e comercialização de armas de fogo e munição (Estatuto do Desarmamento)?", ["Lei 10.826/2003", "Lei 8.069/1990", "Lei 9.503/1997", "Lei 11.343/2006"], "As outras são ECA, Código de Trânsito e Lei de Drogas."],
    ["O SINARM (Sistema Nacional de Armas) está a cargo de qual órgão?", ["Polícia Federal", "Exército Brasileiro", "Polícia Militar", "Receita Federal"], "SINARM: Polícia Federal. SIGMA: Exército."],
    ["O SIGMA é o sistema de armas de qual instituição?", ["Exército Brasileiro", "Polícia Federal", "Polícia Civil", "Ministério da Saúde"], "SIGMA = Sistema de Gerenciamento Militar de Armas."],
    ["Pela Lei 10.826/2003, qual é a idade mínima para adquirir arma de fogo?", ["25 anos", "18 anos", "21 anos", "30 anos"], "A regra geral do Estatuto proíbe a aquisição por menores de 25 anos."],
    ["Quem atesta a capacidade técnica para o manuseio de arma de fogo?", ["Instrutor de armamento e tiro credenciado pela Polícia Federal", "Qualquer atirador com mais de 5 anos de prática", "O vendedor da loja", "O delegado de plantão"], "O laudo de capacidade técnica é de instrutor credenciado pela PF."],
    ["A aptidão psicológica para o manuseio de arma de fogo é atestada por:", ["Psicólogo credenciado pela Polícia Federal", "Qualquer médico", "O instrutor de tiro", "O próprio candidato, por declaração"], "Laudo conclusivo de psicólogo credenciado pela PF."],
    ["Uma arma dissimulada, com aparência de objeto inofensivo (ex.: caneta-revólver), é de uso:", ["Proibido", "Permitido", "Restrito", "Esportivo"], "Armas dissimuladas são de uso proibido."],
    ["Pistolas, revólveres e garruchas são classificados como armas:", ["De porte", "Portáteis", "Não portáteis", "Obsoletas"], "Arma de porte: pode ser disparada com uma só mão."],
    ["Fuzil, carabina e espingarda são classificados como armas:", ["Portáteis", "De porte", "Não portáteis", "Dissimuladas"], "Portáteis: transportadas por uma pessoa, mas não são de porte."],
    ["Munições traçantes, perfurantes ou fumígenas são de uso:", ["Restrito", "Permitido", "Livre", "Esportivo"], "São munições de uso restrito."],
    ["Uma arma cuja munição não é mais fabricada é classificada como:", ["Obsoleta", "Dissimulada", "De uso restrito", "Não portátil"], "Arma obsoleta: munição fora de produção ou relíquia/peça de coleção inerte."],
    ["Qual é a diferença entre posse e porte de arma?", ["Posse é manter em casa ou no trabalho; porte é levar consigo", "Posse é levar consigo; porte é manter em casa", "São a mesma coisa", "Porte é só para armas longas"], "Posse: residência ou local de trabalho. Porte: trazer a arma consigo."],
    ["“Registro” de arma de fogo significa:", ["Matrícula da arma vinculada à identificação do proprietário", "Inclusão da arma no banco de dados pela fábrica", "Autorização de porte", "Licença de caça"], "Cadastro é a arma no banco de dados; registro vincula ao dono."],
    ["Deixar de tomar as cautelas para impedir que um menor de 18 anos se apodere da sua arma é:", ["Crime de omissão de cautela", "Apenas infração administrativa", "Permitido se a arma estiver travada", "Conduta sem consequência legal"], "Omissão de cautela é crime previsto no Estatuto."],
    ["Disparar arma de fogo em via pública ou em direção a ela, em lugar habitado, é:", ["Crime previsto no Estatuto do Desarmamento", "Permitido em datas comemorativas", "Permitido para quem tem posse", "Só uma contravenção leve"], "Tiro pro alto no Réveillon não é comemoração: é crime."],
    ["A Guia de Tráfego, emitida pelo Exército para CACs, corresponde a:", ["Porte de trânsito das armas do acervo", "Porte para defesa pessoal", "Registro definitivo da arma", "Autorização para caça em qualquer local"], "Autoriza o trânsito de armas, acessórios e munições."],
    ["Para ser aprovado na prova teórica de capacidade técnica, o candidato precisa de:", ["60% de acerto", "50% de acerto", "70% de acerto", "100% de acerto"], "São 20 questões; é preciso acertar pelo menos 12."],
  ],
  defesa: [
    ["A legítima defesa, segundo o Código Penal, é causa de:", ["Exclusão da ilicitude", "Aumento de pena", "Crime culposo", "Contravenção penal"], "Art. 23, II: o fato praticado em legítima defesa não é crime."],
    ["Qual destes NÃO é requisito da legítima defesa?", ["Vingança por agressão passada", "Agressão injusta", "Agressão atual ou iminente", "Uso moderado dos meios necessários"], "Agressão passada não autoriza reação."],
    ["Na legítima defesa, o que acontece se você continua reagindo depois que o agressor já não ameaça mais?", ["A defesa passa a ser caracterizada como agressão", "Continua sendo legítima defesa", "Vira estrito cumprimento do dever legal", "Nada muda"], "A defesa deve cessar quando cessa a ameaça."],
    ["A legítima defesa pode proteger direito:", ["Próprio ou de outra pessoa", "Somente próprio", "Somente de familiares", "Somente patrimônio"], "O art. 25 fala em direito seu ou de outrem."],
  ],
};

const JOKES = {
  right: ["Na mosca! 🎯", "Agrupamento bonito, hein!", "Isso é 10 no alvo.", "O Léo aprovou com a cabeça.", "Tá mirando bem!", "Visada perfeita.", "Mão firme, resposta certa.", "Essa foi no centro."],
  wrong: ["Ricocheteou… 😬", "Esse foi pra fora do alvo.", "Respira, faz a apneia e tenta de novo.", "Calma, aqui o único tiro no pé é na prova.", "Errou a visada nessa.", "Alça e massa desalinhadas!", "Esse passou longe do 10.", "Bora reler o capítulo, guerreiro(a)."],
  result: {
    great: ["Atirador(a) de elite! Pode marcar a prova.", "Gabaritou o coração do Léo. 🏆"],
    pass: ["Aprovado(a)! Agora é lapidar os detalhes.", "Passou! Só não vale relaxar a segurança."],
    fail: ["Ainda não foi dessa vez. Revisa os capítulos e volta pra linha de tiro.", "Faltou pouco. Até o melhor atirador já errou o primeiro alvo."],
  },
};

// Achata o banco: cada questão herda o tema da prova (c) e o capítulo (m).
const QUESTIONS = Object.entries(QBANK).flatMap(([m, list]) => {
  const ch = CHAPTERS.find((c) => c.id === m);
  return list.map(([q, o, e]) => ({ m, c: ch.cat, q, o, e }));
});

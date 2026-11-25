// Conteúdo do curso — baseado na apostila do Instrutor Léo Pedroso (Duplo Alfa)
// com colaboração do Instrutor Rogério Torres (Tactical School).

const MODULES = [
  { id: "intro", name: "Boas-vindas", cat: null },
  { id: "seg", name: "Regras de Segurança", cat: "seg" },
  { id: "estande", name: "Conduta no Estande", cat: "estande" },
  { id: "conceitos", name: "Arma de Fogo e Tipos", cat: "nomen" },
  { id: "municao", name: "Munição e Calibre", cat: "nomen" },
  { id: "sistemas", name: "Funcionamento e Acionamento", cat: "nomen" },
  { id: "pecas", name: "Revólver e Pistola", cat: "nomen" },
  { id: "fundamentos", name: "Fundamentos do Tiro", cat: "nomen" },
  { id: "ciclo", name: "M.A.C., Ciclo e Panes", cat: "nomen" },
  { id: "saque", name: "Saque, Modalidades e Manutenção", cat: "estande" },
  { id: "lei", name: "Legislação", cat: "lei" },
  { id: "defesa", name: "Legítima Defesa", cat: "lei" },
  { id: "fim", name: "Prova e Próximos Passos", cat: null },
];

const SLIDES = [
  // ---------- BOAS-VINDAS ----------
  { mod: "intro", kicker: "Curso de Armamento e Tiro", title: "Bem-vindo à linha de tiro.",
    body: `<p class="lead">Eu sou o <strong>Instrutor Léo Pedroso</strong> e vou te levar, passo a passo, por tudo o que cai na <strong>prova de capacidade técnica</strong> para manuseio de arma de fogo.</p>
    <p>O conteúdo segue a cartilha de armamento e tiro da Polícia Federal: revólver e pistola, segurança, funcionamento, fundamentos e legislação.</p>`,
    img: "img/logo.webp", imgClass: "contain round",
    tip: "Estude com calma. Segurança não é uma matéria da prova: é a prova inteira." },
  { mod: "intro", kicker: "Como a prova funciona", title: "20 questões. 60% para passar.",
    body: `<div class="stats">
      <div><b>6</b><span>Normas de segurança</span></div>
      <div><b>6</b><span>Nomenclatura e funcionamento</span></div>
      <div><b>3</b><span>Conduta no estande</span></div>
      <div><b>5</b><span>Legislação</span></div>
    </div>
    <p>A prova teórica oficial tem 20 questões objetivas e exige <strong>60% de acerto</strong> (12 questões). Depois vem a prova prática de tiro. O simulado deste curso segue exatamente essa divisão.</p>`,
    tip: "Acertou 12? Passou. Mas mire nos 20: arma não aceita “quase”." },

  // ---------- SEGURANÇA ----------
  { mod: "seg", kicker: "Módulo 1 · Segurança", title: "A regra de ouro",
    body: `<p class="lead">Trate toda arma de fogo como se ela <strong>sempre</strong> estivesse carregada.</p>
    <p>Todo manuseio, de qualquer arma, curta ou longa, tem que ser feito de forma absolutamente segura: na limpeza, no esporte, na defesa, no estande ou em casa. As regras valem em <strong>todas</strong> as situações, sem exceção.</p>`,
    tip: "“Ela estava descarregada” é a frase mais repetida em relatório de acidente." },
  { mod: "seg", kicker: "Módulo 1 · Segurança", title: "Cano, dedo e gatilho",
    body: `<ul>
      <li>Só aponte a arma, carregada ou não, para onde pretende atirar.</li>
      <li>Nunca aponte para direção que não ofereça segurança.</li>
      <li>Mantenha o <strong>dedo estendido ao longo do corpo da arma</strong> até estar apontando para o alvo e pronto para o disparo.</li>
      <li>Ao sacar ou coldrear, sempre com o dedo estendido.</li>
      <li>Nunca engatilhe a arma se não for atirar.</li>
      <li>Fora do coldre e empunhada, nunca aponte para o seu corpo ou para pessoas ao redor.</li>
    </ul>` },
  { mod: "seg", kicker: "Módulo 1 · Segurança", title: "Pegar, entregar, carregar",
    body: `<ul>
      <li>Nunca pegue ou receba uma arma com o cano apontado na sua direção.</li>
      <li>Sempre <strong>entregue a arma descarregada</strong>.</li>
      <li>Sempre que pegar uma arma, <strong>verifique se está realmente descarregada</strong>.</li>
      <li>Carregue e descarregue com o cano apontado para direção segura.</li>
      <li>Confira se a munição corresponde ao tamanho e ao calibre da arma.</li>
      <li>Antes de qualquer limpeza, certifique-se de que está descarregada.</li>
    </ul>` },
  { mod: "seg", kicker: "Módulo 1 · Segurança", title: "Travas não pensam por você",
    body: `<ul>
      <li>As travas são <strong>dispositivos mecânicos</strong>, não substitutos do bom senso.</li>
      <li>Nunca teste as travas acionando a tecla do gatilho.</li>
      <li>Nunca transporte ou coldreie a arma com o <strong>cão armado</strong>.</li>
      <li>Nunca deixe uma arma de forma descuidada.</li>
      <li>Guarde <strong>armas e munições separadamente</strong>, fora do alcance de crianças.</li>
    </ul>` },
  { mod: "seg", kicker: "Módulo 1 · Segurança", title: "Alvo, ricochete e proteção",
    body: `<ul>
      <li>O alvo e a área ao redor precisam suportar os impactos com máxima segurança.</li>
      <li>Nunca atire em <strong>superfícies planas e duras ou na água</strong>: o projétil pode ricochetear.</li>
      <li>Sempre use <strong>óculos de proteção e abafador</strong>.</li>
      <li>Revólveres soltam gases e resíduos de chumbo pela folga entre cano e tambor; pistolas e rifles ejetam estojos quentes para o lado. Mãos e pessoas longe dessas zonas.</li>
    </ul>` },
  { mod: "seg", kicker: "Módulo 1 · Segurança", title: "Quando algo sai do normal",
    body: `<ul>
      <li><strong>Negou fogo?</strong> Mantenha a arma apontada para o alvo por cerca de <strong>30 segundos</strong>: pode haver retardo de ignição.</li>
      <li>Recuo ou som anormal? <strong>Pare</strong>, descarregue e verifique se há obstrução no cano. Qualquer coisa lá dentro (projétil, lama, terra, graxa) sai antes do próximo tiro.</li>
      <li>Munição velha ou recarregada não é confiável e pode ser perigosa.</li>
      <li>Nunca modifique a arma; se precisar, só com armeiro qualificado.</li>
      <li>Nunca porte arma sob efeito de álcool, drogas ou medicamentos que reduzam a percepção.</li>
      <li>Antes de usar qualquer arma, aprenda o manuseio com instrutor credenciado.</li>
    </ul>`,
    tip: "Barulho de “pof” em vez de “BANG”? Desconfie. Pode ser tiro chocho e o projétil ficou no cano." },

  // ---------- ESTANDE ----------
  { mod: "estande", kicker: "Módulo 2 · Conduta no estande", title: "No estande, quem manda é o instrutor",
    body: `<ol>
      <li><strong>Silêncio</strong> é fator preponderante de segurança na linha de tiro.</li>
      <li>A arma fica sempre <strong>desmuniciada e guardada</strong>, salvo comando expresso do instrutor.</li>
      <li>Carregar, sacar, descarregar, inspecionar e coldrear: só <strong>sob comando</strong>, com o cano para direção segura.</li>
      <li>Obedeça aos comandos. <strong>Nunca antecipe</strong> e nunca faça nada que não foi comandado.</li>
    </ol>` },
  { mod: "estande", kicker: "Módulo 2 · Conduta no estande", title: "Deu problema? Braço pra cima.",
    body: `<ol start="5">
      <li>Em qualquer incidente: permaneça <strong>de frente para o alvo</strong>, arma apontada para o alvo, e <strong>levante o braço oposto</strong> para o instrutor te atender.</li>
      <li>Com mais de um candidato na prova, mantenha o <strong>alinhamento</strong> com os outros atiradores.</li>
    </ol>
    <p>Na prova prática, você começa na <strong>posição de retenção</strong>, e as armas com trava ficam travadas até o comando de início.</p>`,
    tip: "Virar para trás com a arma na mão para perguntar algo é reprovação na hora (e susto geral)." },

  // ---------- CONCEITOS ----------
  { mod: "conceitos", kicker: "Módulo 3 · Conceitos", title: "O que é arma de fogo",
    body: `<p class="lead">Arma que arremessa projéteis usando a <strong>força expansiva dos gases</strong> gerados pela combustão de um propelente confinado em uma câmara.</p>
    <p>A câmara normalmente é solidária a um <strong>cano</strong>, que dá continuidade à combustão e garante direção e estabilidade ao projétil.</p>` },
  { mod: "conceitos", kicker: "Módulo 3 · Conceitos", title: "Armas curtas: revólver × pistola",
    body: `<div class="two">
      <div><h4>Revólver</h4><p>Curta, de porte, de repetição. Tem um <strong>cilindro giratório (tambor)</strong> atrás do cano que serve de carregador; cada perfuração recebe um cartucho e funciona como câmara.</p></div>
      <div><h4>Pistola</h4><p>Curta, de porte, geralmente <strong>semiautomática</strong>. Tem <strong>câmara única</strong>, que faz parte do cano, e um carregador que apresenta os cartuchos em fila.</p></div>
    </div>` },
  { mod: "conceitos", kicker: "Módulo 3 · Conceitos", title: "Armas longas",
    body: `<ul>
      <li><strong>Carabina:</strong> longa, portátil, alma <strong>raiada</strong>, cano de <strong>até 16 polegadas</strong>.</li>
      <li><strong>Rifle:</strong> longa, portátil, alma raiada, cano <strong>maior que 16 polegadas</strong> (mais precisão e alcance).</li>
      <li><strong>Espingarda:</strong> longa, portátil, alma <strong>lisa</strong> (sem raiamento); calibre medido em <em>gauge</em>, ex.: 12GA.</li>
    </ul>` },

  // ---------- MUNIÇÃO ----------
  { mod: "municao", kicker: "Módulo 4 · Munição", title: "Os 4 componentes do cartucho",
    body: `<ul>
      <li><strong>Estojo:</strong> faz a união mecânica de tudo numa peça só.</li>
      <li><strong>Espoleta:</strong> na base do estojo; mistura iniciadora que gera a chama na percussão.</li>
      <li><strong>Pólvora:</strong> propelente; inflamada, expande gases e empurra o projétil.</li>
      <li><strong>Projétil:</strong> a parte lançada pelo cano. Também chamado de bala ou ponta.</li>
    </ul>`, img: "img/cartucho.webp", imgClass: "contain light",
    tip: "Bala é só a ponta. O conjunto completo se chama cartucho." },
  { mod: "municao", kicker: "Módulo 4 · Munição", title: "Calibre e raiamento",
    body: `<p>O <strong>raiamento</strong> são sulcos helicoidais dentro do cano que fazem o projétil girar, dando estabilidade.</p>
    <p>O <strong>calibre real</strong> é o diâmetro interno do cano medido <strong>entre os cheios</strong> (as partes altas do raiamento). Já o calibre do projétil é medido entre os fundos das raias.</p>`,
    img: "img/calibre.webp", imgClass: "contain light" },

  // ---------- SISTEMAS ----------
  { mod: "sistemas", kicker: "Módulo 5 · Funcionamento", title: "Repetição, semi e automático",
    body: `<ul>
      <li><strong>Repetição:</strong> dispara mais de uma vez antes de recarregar, mas a realimentação é feita pela <strong>ação do atirador</strong> (carregador, tambor ou tubo).</li>
      <li><strong>Semiautomático:</strong> <strong>um acionamento do gatilho para cada disparo</strong>; extração, ejeção e realimentação usam os gases do próprio disparo.</li>
      <li><strong>Automático:</strong> com o gatilho acionado, atira continuamente até acabar a munição ou soltar o gatilho.</li>
    </ul>` },
  { mod: "sistemas", kicker: "Módulo 5 · Acionamento", title: "Ação simples, ação dupla, dupla ação",
    body: `<ul>
      <li><strong>Ação simples:</strong> o gatilho faz só uma coisa, o disparo. O armar do cão já foi feito antes.</li>
      <li><strong>Ação dupla:</strong> o gatilho faz duas coisas: arma o conjunto e dispara.</li>
      <li><strong>Dupla ação:</strong> a arma permite atirar <strong>tanto</strong> em ação simples quanto em ação dupla.</li>
      <li><strong>Ação híbrida:</strong> o armar acontece em duas etapas, uma antes e outra depois do disparo.</li>
    </ul>`,
    tip: "Ação dupla é o que o gatilho faz. Dupla ação é o que a arma permite. Pegadinha clássica de prova." },

  // ---------- PEÇAS ----------
  { mod: "pecas", kicker: "Módulo 6 · Nomenclatura", title: "Composição do revólver",
    body: `<p>Peças que você precisa reconhecer: <strong>cano, tambor, cão, gatilho, guarda-mato, massa de mira, alça de mira, armação, cabo, vareta do extrator e pedal (trava) do tambor</strong>.</p>`,
    img: "img/revolver.webp", imgClass: "contain light" },
  { mod: "pecas", kicker: "Módulo 6 · Nomenclatura", title: "Composição da pistola",
    body: `<p>Peças-chave: <strong>ferrolho, cano, armação, gatilho, guarda-mato, cão, massa e alça de mira, carregador, retém do carregador, retém do ferrolho, alavanca de desmontagem, registro de segurança</strong>.</p>
    <p>O carregador tem corpo, mola, transportador (plataforma) e base.</p>`,
    img: "img/pistola.webp", imgClass: "contain light" },

  // ---------- FUNDAMENTOS ----------
  { mod: "fundamentos", kicker: "Módulo 7 · Fundamentos", title: "1. Posição (base)",
    body: `<p>A base do atirador influencia tudo. As posições mais usadas:</p>
    <ul><li><strong>Isósceles:</strong> corpo semiflexionado, pés na mesma linha, joelhos semiflexionados, braços estendidos formando um triângulo.</li>
    <li><strong>Weaver:</strong> criada nos anos 1950 por Jack Weaver; braços flexionados, pés como de boxeador.</li></ul>`,
 },
  { mod: "fundamentos", kicker: "Módulo 7 · Fundamentos", title: "2. Empunhadura",
    body: `<p><strong>Revólver:</strong> todos os dedos acomodados <strong>atrás do tambor</strong>. Os gases e resíduos de chumbo que saem entre cano e tambor podem ferir gravemente; num .357 podem até amputar um dedo.</p>
    <p><strong>Pistola:</strong> mão forte bem posicionada e mão fraca com o <strong>polegar estendido</strong> sobre o corpo da arma, lembrando que o <strong>ferrolho</strong> se move a cada disparo.</p>`,
 },
  { mod: "fundamentos", kicker: "Módulo 7 · Fundamentos", title: "3. Linha de visada",
    body: `<p>Linha reta que sai do <strong>olho</strong>, passa pela <strong>alça de mira</strong> e pela <strong>massa de mira</strong> e termina no <strong>alvo</strong>.</p>
    <p>Visada ideal: massa centralizada na alça, topos nivelados, foco na massa de mira.</p>`,
 },
  { mod: "fundamentos", kicker: "Módulo 7 · Fundamentos", title: "4. Acionamento do gatilho",
    body: `<p>O fundamento mais difícil e o mais importante: é na hora do disparo que quase todo mundo erra.</p>
    <ul><li><strong>Pistola:</strong> gatilho no <strong>meio da primeira falange</strong> do indicador.</li>
    <li><strong>Revólver:</strong> como o gatilho costuma ser mais pesado, fica mais próximo da <strong>primeira dobra</strong> da falange.</li></ul>`,
 },
  { mod: "fundamentos", kicker: "Módulo 7 · Fundamentos", title: "5. Respiração e controle emocional",
    body: `<p>A respiração faz o cano subir e descer. Respire tranquilo e, com a visada pronta, faça uma <strong>breve apneia</strong> (prender a respiração) no momento do acionamento.</p>
    <p>E controle a emoção: nem euforia com o acerto, nem frustração com o erro.</p>`,
    tip: "Acertou o 10? Comemore depois de descarregar e coldrear. 😉" },

  // ---------- CICLO ----------
  { mod: "ciclo", kicker: "Módulo 8 · M.A.C.", title: "Municiar, Alimentar, Carregar",
    body: `<div class="stats three">
      <div><b>M</b><span><strong>Municiar:</strong> colocar a munição no carregador</span></div>
      <div><b>A</b><span><strong>Alimentar:</strong> inserir o carregador municiado na arma</span></div>
      <div><b>C</b><span><strong>Carregar:</strong> agir no ferrolho e levar o cartucho à câmara</span></div>
    </div>` },
  { mod: "ciclo", kicker: "Módulo 8 · Ciclo do disparo", title: "Do gatilho à ejeção",
    body: `<ol>
      <li>O gatilho libera o <strong>cão</strong>, que bate no <strong>percussor</strong>.</li>
      <li>O percussor atinge a <strong>espoleta</strong>, que inflama a <strong>pólvora</strong>.</li>
      <li>Os gases expandem e lançam o <strong>projétil</strong> para fora do cano.</li>
      <li><strong>Extração:</strong> o ferrolho volta e puxa o estojo vazio, preso pelo <strong>extrator</strong>.</li>
      <li><strong>Ejeção:</strong> o estojo bate no <strong>ejetor</strong> e sai pela janela de ejeção.</li>
    </ol>` },
  { mod: "ciclo", kicker: "Módulo 8 · Panes", title: "Panes que você precisa conhecer",
    body: `<ul>
      <li>Pane de alimentação · Pane de chaminé · Pane seca.</li>
      <li><strong>Pane fatal / tiro chocho:</strong> falta propelente e o projétil fica preso no cano. Um novo disparo pode causar explosão, perda da arma e acidente grave.</li>
      <li><strong>Retardo de disparo:</strong> acionou e não disparou. Mantenha apontada para o alvo de <strong>15 a 30 segundos</strong>.</li>
    </ul>` },

  // ---------- SAQUE / MANUTENÇÃO ----------
  { mod: "saque", kicker: "Módulo 9 · Saque", title: "Saque da arma e modalidades",
    body: `<p>O saque é muito usado no tiro prático esportivo e defensivo. Cada modalidade tem seu coldre, mas sempre com a arma em <strong>condição segura</strong>.</p>
    <p>Modalidades de revólver e pistola: <strong>IPSC</strong> (tiro prático), <strong>SR</strong> (saque rápido), <strong>TRP</strong> (tiro rápido de precisão), <strong>NRA</strong>, <strong>IDPA</strong>, entre outras.</p>`,
 },
  { mod: "saque", kicker: "Módulo 9 · Manutenção", title: "Manutenção e limpeza",
    body: `<ul>
      <li>Siga a recomendação do fabricante.</li>
      <li><strong>1º escalão:</strong> limpeza após cada uso (principalmente com munição recarregada), pelo próprio atirador.</li>
      <li>Limpar o cano evita o <strong>chumbamento</strong>.</li>
      <li><strong>2º escalão:</strong> com armeiro de confiança, após alto volume de disparos.</li>
      <li>Arma <strong>locada</strong> no estande: nada de desmontar sem permissão e acompanhamento do instrutor.</li>
    </ul>` },

  // ---------- LEGISLAÇÃO ----------
  { mod: "lei", kicker: "Módulo 10 · Legislação", title: "SIGMA × SINARM",
    body: `<div class="two">
      <div><h4>SINARM</h4><p>Sistema Nacional de Armas, da <strong>Polícia Federal</strong>. Registro de armas para <strong>defesa pessoal, residencial e patrimonial</strong>.</p></div>
      <div><h4>SIGMA</h4><p>Sistema de Gerenciamento Militar de Armas, do <strong>Exército Brasileiro</strong>. Ligado ao <strong>CR</strong> de CAC (caçador, atirador e colecionador).</p></div>
    </div>
    <p>A base de tudo é a <strong>Lei 10.826/2003</strong>, o Estatuto do Desarmamento.</p>` },
  { mod: "lei", kicker: "Módulo 10 · Legislação", title: "Definições que caem na prova",
    body: `<ul>
      <li><strong>Arma de porte:</strong> pode ser disparada com uma só mão (pistola, revólver, garrucha).</li>
      <li><strong>Arma portátil:</strong> transportada por uma pessoa (fuzil, carabina, espingarda).</li>
      <li><strong>Não portátil:</strong> exige mais de uma pessoa, veículo ou estrutura fixa.</li>
      <li><strong>Uso proibido:</strong> as vetadas por tratados e as <strong>dissimuladas</strong>, com aparência de objeto inofensivo.</li>
      <li><strong>Munição de uso restrito:</strong> inclui traçantes, perfurantes e fumígenas.</li>
      <li><strong>Registro:</strong> matrícula da arma vinculada ao proprietário.</li>
    </ul>` },
  { mod: "lei", kicker: "Módulo 10 · Legislação", title: "Posse, porte e os crimes do Estatuto",
    body: `<ul>
      <li><strong>Posse:</strong> manter a arma registrada em casa ou no local de trabalho (se for o titular ou responsável).</li>
      <li><strong>Porte:</strong> levar a arma consigo fora desses locais. Em regra, é <strong>proibido</strong> em todo o território nacional, salvo os casos previstos em lei.</li>
      <li>Idade mínima para adquirir arma: <strong>25 anos</strong>.</li>
      <li>São crimes: posse irregular, <strong>omissão de cautela</strong> (deixar menor de 18 anos ou pessoa com deficiência mental se apoderar da arma), porte ilegal e disparo em via pública.</li>
      <li>A capacidade técnica é atestada por <strong>instrutor credenciado pela PF</strong>; a aptidão psicológica, por psicólogo credenciado pela PF.</li>
    </ul>` },
  { mod: "lei", kicker: "Módulo 10 · Atualização", title: "⚠️ A lei mudou depois da apostila",
    body: `<p>A apostila original cita o Decreto 9.846/2019. Ele foi <strong>revogado</strong>: hoje a Lei 10.826/2003 é regulamentada pelo <strong>Decreto 11.615/2023</strong>, alterado pelo <strong>Decreto 12.345/2024</strong>.</p>
    <p>Entre as mudanças: prazos de validade de registros menores, regras mais rígidas para CAC e restrição a armas e munições de uso restrito. Limites de quantidade e prazos mudam com frequência, por isso <strong>confirme sempre com o instrutor</strong> antes da prova.</p>`,
    tip: "É responsabilidade de quem tem arma se manter atualizado. A lei não aceita “eu não sabia”." },

  // ---------- LEGÍTIMA DEFESA ----------
  { mod: "defesa", kicker: "Módulo 11 · Legítima defesa", title: "Art. 25 do Código Penal",
    body: `<p class="lead">Age em legítima defesa quem, usando <strong>moderadamente</strong> dos meios necessários, repele <strong>injusta agressão, atual ou iminente</strong>, a direito seu ou de outrem.</p>
    <p>É causa de <strong>exclusão da ilicitude</strong> (art. 23, II): o fato praticado em legítima defesa não é crime.</p>` },
  { mod: "defesa", kicker: "Módulo 11 · Legítima defesa", title: "Os 5 requisitos (todos juntos)",
    body: `<ol>
      <li>Agressão <strong>injusta</strong>;</li>
      <li><strong>Atual ou iminente</strong>;</li>
      <li>A direito <strong>próprio ou alheio</strong>;</li>
      <li>Reação com os <strong>meios necessários</strong>;</li>
      <li><strong>Uso moderado</strong> desses meios.</li>
    </ol>
    <p>Atenção: quando o agressor deixa de ameaçar, a defesa precisa <strong>cessar</strong>. Se você continua, passa a ser agressão.</p>`,
    tip: "Saber parar faz parte da defesa." },

  // ---------- FIM ----------
  { mod: "fim", kicker: "Reta final", title: "Agora é com você.",
    body: `<p class="lead">Você passou por todo o conteúdo da prova teórica. Agora faça o <strong>simulado</strong>: 20 questões no formato oficial, com correção comentada.</p>
    <p>Curso de tiro esportivo, defesa, combate, primeiros socorros e APH tático? Fale com a gente:</p>
    <div class="contacts">
      <a href="https://wa.me/5511975324734" target="_blank" rel="noopener">Léo Pedroso · (11) 97532-4734</a>
      <a href="https://wa.me/5511974163421" target="_blank" rel="noopener">Rogério Torres · (11) 97416-3421</a>
    </div>`, img: "img/logo.webp", imgClass: "contain round", end: true },
];

const CATS = {
  seg: { name: "Normas de segurança", n: 6 },
  nomen: { name: "Nomenclatura e funcionamento", n: 6 },
  estande: { name: "Conduta no estande", n: 3 },
  lei: { name: "Legislação", n: 5 },
};

// q: pergunta · o: opções (a primeira é a correta; o app embaralha) · e: explicação
const QUESTIONS = [
  // ===== SEGURANÇA =====
  { c: "seg", q: "Qual é a regra de ouro no manuseio de uma arma de fogo?",
    o: ["Tratá-la sempre como se estivesse carregada", "Confiar na trava de segurança", "Verificar só quando for atirar", "Perguntar pra arma se ela tá carregada"],
    e: "Toda arma deve ser tratada como carregada, sempre. É a base de todas as outras regras." },
  { c: "seg", q: "Onde deve ficar o dedo indicador até o atirador estar apontando para o alvo e pronto para atirar?",
    o: ["Estendido ao longo do corpo da arma, fora do gatilho", "Apoiado levemente no gatilho", "Dentro do guarda-mato, sem pressionar", "Sobre o cão"],
    e: "O dedo fica estendido ao longo da armação até a decisão de atirar, inclusive ao sacar e ao coldrear." },
  { c: "seg", q: "A arma negou fogo. Qual é o procedimento correto?",
    o: ["Mantê-la apontada para o alvo por cerca de 30 segundos", "Abrir imediatamente para ver o que houve", "Olhar dentro do cano", "Puxar o gatilho de novo bem rápido"],
    e: "Pode haver retardo de ignição. Mantenha a arma apontada para o alvo por aproximadamente 30 segundos." },
  { c: "seg", q: "Ao entregar uma arma para outra pessoa, ela deve estar:",
    o: ["Descarregada", "Carregada e travada", "Com o cão armado", "Com o cano apontado para quem recebe, para facilitar"],
    e: "Sempre entregue descarregada. E quem recebe deve verificar se está realmente descarregada." },
  { c: "seg", q: "Sobre as travas de segurança, é correto afirmar:",
    o: ["São dispositivos mecânicos e não substituem o bom senso", "Garantem que a arma nunca dispare", "Devem ser testadas acionando o gatilho", "Dispensam o cuidado com a direção do cano"],
    e: "Travas falham. Nunca teste uma trava puxando o gatilho, e nunca relaxe a segurança por causa dela." },
  { c: "seg", q: "Por que nunca se deve atirar em superfícies planas e duras ou na água?",
    o: ["Porque o projétil pode ricochetear", "Porque a arma pode travar", "Porque aumenta o recuo", "Porque a água apaga a pólvora"],
    e: "Superfícies duras e a água podem desviar o projétil (ricochete) para direções imprevisíveis." },
  { c: "seg", q: "Como armas e munições devem ser guardadas?",
    o: ["Separadamente e fora do alcance de crianças", "Juntas, para ganhar tempo", "Na gaveta da cabeceira, carregadas", "No porta-luvas do carro"],
    e: "Armas e munições guardadas separadamente, em local seguro e fora do alcance de crianças." },
  { c: "seg", q: "Durante os disparos, você percebe um recuo e um som anormais. O que fazer?",
    o: ["Interromper, descarregar e verificar se há obstrução no cano", "Continuar atirando para desobstruir", "Trocar de munição e seguir", "Ignorar, é coisa da arma"],
    e: "Pode ser tiro chocho com projétil preso no cano. Um novo disparo pode causar explosão." },
  { c: "seg", q: "Qual equipamento de proteção é obrigatório ao atirar?",
    o: ["Óculos de proteção e abafador de ruídos", "Colete balístico", "Luvas táticas", "Boné com aba para trás"],
    e: "Sempre use óculos protetores e abafadores quando estiver atirando." },
  { c: "seg", q: "Por que manter as mãos longe da folga entre o cano e o tambor do revólver?",
    o: ["Porque saem gases e resíduos de chumbo por ali", "Porque o tambor gira e prende o dedo", "Porque esquenta e queima a luva", "Não há motivo, é mito"],
    e: "Revólveres desprendem lateralmente gases e resíduos de chumbo entre cano e tambor, podendo ferir gravemente." },
  { c: "seg", q: "Em que condição a arma NUNCA deve ser transportada ou coldreada?",
    o: ["Com o cão armado", "Descarregada", "Travada", "Dentro do estojo"],
    e: "Nunca transporte ou coldreie a arma com o cão armado." },
  { c: "seg", q: "Sobre munição velha ou recarregada, é correto dizer:",
    o: ["Não é confiável e pode ser perigosa", "É mais potente que a nova", "É a mais indicada para a prova", "Não faz diferença nenhuma"],
    e: "Munição velha ou recarregada não é confiável e pode causar panes e acidentes." },
  { c: "seg", q: "Antes de qualquer limpeza da arma, o atirador deve:",
    o: ["Certificar-se de que a arma está descarregada", "Lubrificar o gatilho", "Armar o cão", "Efetuar um disparo para esvaziar"],
    e: "Limpeza só com a arma comprovadamente descarregada." },
  { c: "seg", q: "Quem deve fazer modificações nas características originais de uma arma?",
    o: ["Ninguém; se for indispensável, um armeiro profissional qualificado", "O próprio atirador, com tutorial", "Qualquer instrutor no estande", "O vendedor da loja de munição"],
    e: "Nunca modifique a arma. Se houver necessidade, só com armeiro profissional qualificado." },
  { c: "seg", q: "Ao carregar ou descarregar uma arma, o cano deve estar:",
    o: ["Apontado para uma direção segura", "Apontado para cima, sempre", "Apontado para o chão, perto dos pés", "Em qualquer direção, já que não vai atirar"],
    e: "Carregar e descarregar sempre com o cano em direção segura." },
  { c: "seg", q: "É permitido portar a arma sob efeito de medicamentos que reduzem a percepção?",
    o: ["Não, nem sob efeito de álcool ou drogas", "Sim, se for receita médica", "Sim, desde que travada", "Só em trajetos curtos"],
    e: "Nunca porte arma sob efeito de substâncias que diminuam a percepção: álcool, drogas ou medicamentos." },
  { c: "seg", q: "O que deve ser conferido em relação à munição antes de usá-la?",
    o: ["Se corresponde ao tamanho e ao calibre da arma", "Se é da mesma cor do carregador", "Se é da marca preferida do instrutor", "Se está gelada"],
    e: "A munição deve corresponder ao calibre e ao tamanho da arma." },
  { c: "seg", q: "Fora do coldre e empunhada, a arma deve ser apontada:",
    o: ["Somente na direção do alvo", "Para o chão, perto do pé", "Para o instrutor, para ele conferir", "Para cima, ao conversar"],
    e: "Nunca aponte para qualquer parte do seu corpo ou de outras pessoas. Só para o alvo." },

  // ===== NOMENCLATURA E FUNCIONAMENTO =====
  { c: "nomen", q: "Quais são os quatro componentes de um cartucho?",
    o: ["Estojo, espoleta, pólvora e projétil", "Cano, tambor, cão e gatilho", "Ferrolho, carregador, mola e base", "Bala, ponta, chumbo e cápsula"],
    e: "O cartucho é formado por estojo, espoleta (cápsula), pólvora (propelente) e projétil." },
  { c: "nomen", q: "Qual componente do cartucho gera a chama no momento da percussão?",
    o: ["Espoleta", "Estojo", "Projétil", "Raiamento"],
    e: "A espoleta, na base do estojo, contém a mistura iniciadora que gera a chama." },
  { c: "nomen", q: "Qual é a função do estojo?",
    o: ["Unir mecanicamente todos os componentes do cartucho", "Dar giro ao projétil", "Inflamar a pólvora", "Guiar o cão até o percussor"],
    e: "O estojo une todos os componentes numa única peça, facilitando o manejo e o carregamento." },
  { c: "nomen", q: "O que caracteriza o revólver?",
    o: ["Um cilindro giratório (tambor) atrás do cano, que serve de carregador", "Câmara única que faz parte do cano", "Carregador destacável no cabo", "Alma lisa"],
    e: "No revólver, cada perfuração do tambor recebe um cartucho e funciona como câmara." },
  { c: "nomen", q: "Na pistola, a câmara:",
    o: ["É única e faz parte do cano", "Fica no tambor", "Fica no carregador", "Não existe"],
    e: "A pistola tem câmara única, que faz parte do corpo do cano." },
  { c: "nomen", q: "Qual arma longa tem alma lisa, sem raiamento?",
    o: ["Espingarda", "Carabina", "Rifle", "Fuzil"],
    e: "A espingarda tem alma lisa e calibre geralmente medido em gauge (ex.: 12GA)." },
  { c: "nomen", q: "A carabina se diferencia do rifle pelo comprimento do cano, que é de:",
    o: ["Até 16 polegadas", "Mais de 16 polegadas", "Até 6 polegadas", "Exatamente 20 polegadas"],
    e: "Carabina: alma raiada e cano até 16\". Rifle: cano maior que 16\"." },
  { c: "nomen", q: "No sistema semiautomático:",
    o: ["Cada disparo exige um acionamento do gatilho", "Com o gatilho pressionado, a arma atira sem parar", "O atirador realimenta a arma manualmente a cada tiro", "O tambor gira sozinho"],
    e: "Um acionamento por disparo; extração, ejeção e realimentação aproveitam os gases do disparo." },
  { c: "nomen", q: "Na arma de repetição, a realimentação é feita:",
    o: ["Pela ação do atirador", "Pelos gases do disparo", "Por uma mola elétrica", "Pelo instrutor"],
    e: "Na repetição, as operações de realimentação dependem da ação do atirador." },
  { c: "nomen", q: "Em “ação simples”, ao acionar o gatilho:",
    o: ["Ocorre apenas o disparo, pois o cão já foi armado antes", "O cão é armado e a arma dispara", "A arma dispara em rajada", "O carregador é liberado"],
    e: "Ação simples: o gatilho só libera o disparo. O armar foi feito antes, manualmente." },
  { c: "nomen", q: "Uma arma de “dupla ação” é aquela que:",
    o: ["Permite atirar tanto em ação simples quanto em ação dupla", "Só atira em ação dupla", "Dispara dois tiros por vez", "Tem dois gatilhos"],
    e: "Dupla ação = a arma permite os dois modos. Ação dupla = o gatilho arma e dispara." },
  { c: "nomen", q: "No M.A.C., “municiar” significa:",
    o: ["Colocar a munição no carregador", "Inserir o carregador na arma", "Levar o cartucho à câmara", "Comprar munição"],
    e: "Municiar = munição no carregador. Alimentar = carregador na arma. Carregar = cartucho na câmara." },
  { c: "nomen", q: "No M.A.C., “carregar” significa:",
    o: ["Agir no ferrolho para levar o cartucho à câmara", "Colocar munição no carregador", "Inserir o carregador", "Levar a arma no coldre"],
    e: "Carregar é acionar o ferrolho para levar a munição à câmara, deixando a arma em pronto uso." },
  { c: "nomen", q: "O movimento do ferrolho para trás puxando o estojo vazio preso pelo extrator chama-se:",
    o: ["Extração", "Ejeção", "Alimentação", "Percussão"],
    e: "Extração: o estojo é puxado pelo extrator. Ejeção: ele é lançado para fora ao bater no ejetor." },
  { c: "nomen", q: "A ejeção ocorre quando:",
    o: ["O estojo vazio bate no ejetor e sai pela janela de ejeção", "O projétil sai do cano", "O carregador é liberado", "O cão bate no percussor"],
    e: "Na ejeção, a base do estojo toca o ejetor e ele sai pela janela de ejeção." },
  { c: "nomen", q: "Qual é a sequência correta do disparo?",
    o: ["Gatilho libera o cão → percussor → espoleta → pólvora → projétil", "Pólvora → espoleta → cão → gatilho", "Percussor → gatilho → projétil → espoleta", "Espoleta → ferrolho → cão → pólvora"],
    e: "O gatilho libera o cão, que bate no percussor; este atinge a espoleta, que inflama a pólvora e lança o projétil." },
  { c: "nomen", q: "O calibre real de uma arma raiada é medido:",
    o: ["Entre os cheios do raiamento", "Entre os fundos das raias", "Pelo comprimento do cano", "Pelo peso do projétil"],
    e: "Calibre real é o diâmetro interno do cano medido entre os cheios." },
  { c: "nomen", q: "Na empunhadura do revólver, os dedos devem ficar:",
    o: ["Todos atrás do tambor", "Um dedo apoiado na frente do tambor", "Envolvendo o cano", "Sobre o cão"],
    e: "Os gases entre cano e tambor podem ferir gravemente; num .357 podem até amputar um dedo." },
  { c: "nomen", q: "Na pistola, em qual parte do dedo o gatilho deve ficar?",
    o: ["No meio da primeira falange do indicador", "Na segunda dobra do dedo", "Na ponta da unha", "Com o dedo médio"],
    e: "Pistola: meio da primeira falange. Revólver: mais perto da primeira dobra, por ter gatilho mais pesado." },
  { c: "nomen", q: "A linha de visada vai do olho do atirador até o alvo passando por:",
    o: ["Alça de mira e massa de mira", "Ferrolho e cão", "Guarda-mato e gatilho", "Tambor e cano"],
    e: "Olho → alça de mira → massa de mira → alvo." },
  { c: "nomen", q: "O que se recomenda fazer com a respiração no momento do disparo?",
    o: ["Uma breve apneia (prender a respiração)", "Respirar rápido e forte", "Expirar gritando", "Prender por um minuto inteiro"],
    e: "Respiração tranquila e uma breve apneia no momento do acionamento do gatilho." },
  { c: "nomen", q: "O que é o “tiro chocho” (pane fatal)?",
    o: ["Falta propelente e o projétil fica preso no cano", "Quando a arma dispara sozinha", "Quando o carregador está vazio", "Quando o atirador erra o alvo"],
    e: "Com o projétil preso, um novo disparo pode explodir a arma e ferir gravemente o atirador." },
  { c: "nomen", q: "A posição Weaver tem como característica:",
    o: ["Braços flexionados e pés como os de um boxeador", "Pés na mesma linha e braços totalmente estendidos", "Atirar deitado", "Atirar com uma mão só"],
    e: "Weaver, criada nos anos 1950: braços flexionados e base de boxeador. Isósceles: pés alinhados e braços estendidos." },
  { c: "nomen", q: "Qual peça da pistola se movimenta a cada disparo e exige atenção com o polegar da mão fraca?",
    o: ["Ferrolho", "Guarda-mato", "Massa de mira", "Cabo"],
    e: "O ferrolho recua a cada disparo; a mão fraca fica com o polegar estendido sobre o corpo da arma." },

  // ===== CONDUTA NO ESTANDE =====
  { c: "estande", q: "Qual é o fator preponderante de segurança na linha de tiro?",
    o: ["O silêncio", "A música ambiente", "A velocidade dos disparos", "A conversa com o vizinho de baia"],
    e: "O silêncio deve ser rigorosamente observado para que os comandos sejam ouvidos." },
  { c: "estande", q: "No estande, a arma permanece:",
    o: ["Desmuniciada e guardada, salvo comando expresso do instrutor", "Carregada e no coldre, para ganhar tempo", "Na mão, apontada para o chão", "Sobre a bancada, carregada"],
    e: "A arma só sai e só é municiada sob comando do instrutor." },
  { c: "estande", q: "Houve um incidente com a sua arma na linha de tiro. O que fazer?",
    o: ["Ficar de frente para o alvo, arma apontada para ele, e levantar o braço oposto", "Virar para trás e chamar o instrutor", "Colocar a arma no chão e sair", "Tentar resolver sozinho rapidamente"],
    e: "Nunca se vire com a arma. Mantenha-a apontada para o alvo e levante o braço oposto." },
  { c: "estande", q: "Sobre os comandos do instrutor, o candidato deve:",
    o: ["Obedecer e nunca antecipar a execução", "Antecipar para mostrar agilidade", "Executar só os que achar necessários", "Esperar o colega fazer primeiro e copiar"],
    e: "Faça tudo o que for ordenado, nunca antecipe e nunca faça nada que não foi comandado." },
  { c: "estande", q: "Carregar, sacar, descarregar, inspecionar e coldrear no estande deve ser feito:",
    o: ["Sob comando do instrutor, com o cano em direção segura", "Livremente, a qualquer momento", "Só ao final da prova", "Fora da linha de tiro, no estacionamento"],
    e: "Todo procedimento é feito sob comando, com o cano apontado para direção segura." },
  { c: "estande", q: "Com vários candidatos fazendo a prova ao mesmo tempo, cada atirador deve:",
    o: ["Manter o alinhamento com os outros atiradores", "Avançar um passo para ver melhor", "Ficar atrás dos colegas", "Trocar de baia quando quiser"],
    e: "Manter o alinhamento evita que alguém fique na linha de fogo de outro." },
  { c: "estande", q: "Pode desmontar uma arma locada no estande?",
    o: ["Só com permissão e acompanhamento do instrutor", "Sim, para limpar", "Sim, se já tiver feito em casa", "Sim, se for rápido"],
    e: "Em armas locadas não é correto desmontar sem permissão e acompanhamento do instrutor responsável." },
  { c: "estande", q: "Na prova prática, como o candidato inicia?",
    o: ["Na posição de retenção, com a trava acionada até o comando de início", "Com a arma apontada para o alvo e destravada", "Com a arma no coldre e o cão armado", "Com a arma sobre a bancada, carregada"],
    e: "Pelo regulamento da PF, a prova começa na posição de retenção e as armas com trava ficam travadas até o comando." },
  { c: "estande", q: "Qual é a limpeza feita pelo próprio atirador após cada uso?",
    o: ["Limpeza de 1º escalão", "Limpeza de 2º escalão", "Revisão de fábrica", "Polimento de cano"],
    e: "1º escalão: pelo atirador, após cada uso. 2º escalão: com armeiro, após alto volume de disparos." },

  // ===== LEGISLAÇÃO =====
  { c: "lei", q: "Qual lei dispõe sobre registro, posse e comercialização de armas de fogo e munição (Estatuto do Desarmamento)?",
    o: ["Lei 10.826/2003", "Lei 8.069/1990", "Lei 9.503/1997", "Lei 11.343/2006"],
    e: "A Lei 10.826/2003 é o Estatuto do Desarmamento. As outras são ECA, Código de Trânsito e Lei de Drogas." },
  { c: "lei", q: "O SINARM (Sistema Nacional de Armas) está a cargo de qual órgão?",
    o: ["Polícia Federal", "Exército Brasileiro", "Polícia Militar", "Receita Federal"],
    e: "O SINARM fica no âmbito da Polícia Federal. O SIGMA é do Exército." },
  { c: "lei", q: "O SIGMA é o sistema de armas de qual instituição?",
    o: ["Exército Brasileiro", "Polícia Federal", "Polícia Civil", "Ministério da Saúde"],
    e: "SIGMA = Sistema de Gerenciamento Militar de Armas, do Exército." },
  { c: "lei", q: "Pela Lei 10.826/2003, qual é a idade mínima para adquirir arma de fogo?",
    o: ["25 anos", "18 anos", "21 anos", "30 anos"],
    e: "A regra geral do Estatuto proíbe a aquisição por menores de 25 anos." },
  { c: "lei", q: "Quem atesta a capacidade técnica para o manuseio de arma de fogo?",
    o: ["Instrutor de armamento e tiro credenciado pela Polícia Federal", "Qualquer atirador com mais de 5 anos de prática", "O vendedor da loja", "O delegado de plantão"],
    e: "O laudo de capacidade técnica é expedido por instrutor credenciado pela PF." },
  { c: "lei", q: "Uma arma dissimulada, com aparência de objeto inofensivo (ex.: caneta-revólver), é de uso:",
    o: ["Proibido", "Permitido", "Restrito", "Esportivo"],
    e: "Armas dissimuladas são de uso proibido." },
  { c: "lei", q: "Pistolas, revólveres e garruchas são classificados como armas:",
    o: ["De porte", "Portáteis", "Não portáteis", "Obsoletas"],
    e: "Arma de porte: dimensões e peso reduzidos, pode ser disparada com uma só mão." },
  { c: "lei", q: "Fuzil, carabina e espingarda são classificados como armas:",
    o: ["Portáteis", "De porte", "Não portáteis", "Dissimuladas"],
    e: "Portáteis: podem ser transportadas por uma pessoa, mas não são de porte." },
  { c: "lei", q: "Munições traçantes, perfurantes ou fumígenas são de uso:",
    o: ["Restrito", "Permitido", "Livre", "Esportivo"],
    e: "Traçantes, perfurantes e fumígenas são munições de uso restrito." },
  { c: "lei", q: "Qual é a diferença entre posse e porte de arma?",
    o: ["Posse é manter em casa ou no trabalho; porte é levar consigo", "Posse é levar consigo; porte é manter em casa", "São a mesma coisa", "Porte é só para armas longas"],
    e: "Posse: dentro da residência ou local de trabalho (se titular/responsável). Porte: trazer a arma consigo." },
  { c: "lei", q: "Deixar de tomar as cautelas para impedir que um menor de 18 anos se apodere da sua arma é:",
    o: ["Crime de omissão de cautela", "Apenas infração administrativa", "Permitido se a arma estiver travada", "Conduta sem consequência legal"],
    e: "Omissão de cautela é crime previsto no Estatuto do Desarmamento." },
  { c: "lei", q: "Disparar arma de fogo em via pública ou em direção a ela, em lugar habitado, é:",
    o: ["Crime previsto no Estatuto do Desarmamento", "Permitido em datas comemorativas", "Permitido para quem tem posse", "Só uma contravenção leve"],
    e: "Disparo de arma de fogo em lugar habitado ou via pública é crime (art. 15). Tiro pro alto no Réveillon não é comemoração." },
  { c: "lei", q: "A legítima defesa, segundo o Código Penal, é causa de:",
    o: ["Exclusão da ilicitude", "Aumento de pena", "Crime culposo", "Contravenção penal"],
    e: "Art. 23, II: o fato praticado em legítima defesa é lícito, não configura crime." },
  { c: "lei", q: "Qual destes NÃO é requisito da legítima defesa?",
    o: ["Vingança por agressão passada", "Agressão injusta", "Agressão atual ou iminente", "Uso moderado dos meios necessários"],
    e: "Agressão passada não autoriza reação. Os requisitos são: injusta, atual ou iminente, direito próprio ou alheio, meios necessários e uso moderado." },
  { c: "lei", q: "Na legítima defesa, o que acontece se você continua reagindo depois que o agressor já não ameaça mais?",
    o: ["A defesa passa a ser caracterizada como agressão", "Continua sendo legítima defesa", "Vira estrito cumprimento do dever legal", "Nada muda"],
    e: "A defesa deve cessar quando cessa a ameaça. Continuar é excesso e passa a ser agressão." },
  { c: "lei", q: "A Guia de Tráfego, emitida pelo Exército para CACs, corresponde a:",
    o: ["Porte de trânsito das armas do acervo", "Porte para defesa pessoal", "Registro definitivo da arma", "Autorização para caça em qualquer local"],
    e: "A Guia de Tráfego autoriza o trânsito de armas, acessórios e munições e corresponde ao porte de trânsito." },
  { c: "lei", q: "Para ser aprovado na prova teórica de capacidade técnica, o candidato precisa de:",
    o: ["60% de acerto", "50% de acerto", "70% de acerto", "100% de acerto"],
    e: "São 20 questões e é preciso acertar pelo menos 60%, ou seja, 12." },
];

const JOKES = {
  right: [
    "Na mosca! 🎯", "Agrupamento bonito, hein!", "Isso é 10 no alvo.", "O Léo aprovou com a cabeça.",
    "Tá mirando bem!", "Visada perfeita.", "Mão firme, resposta certa.", "Essa foi no centro.",
  ],
  wrong: [
    "Ricocheteou… 😬", "Esse foi pra fora do alvo.", "Respira, faz a apneia e tenta de novo.",
    "Calma, aqui o único tiro no pé é na prova.", "Errou a visada nessa.", "Alça e massa desalinhadas!",
    "Esse passou longe do 10.", "Bora reler o módulo, guerreiro(a).",
  ],
  result: {
    great: ["Atirador(a) de elite! Pode marcar a prova.", "Gabaritou o coração do Léo. 🏆"],
    pass: ["Aprovado(a)! Agora é lapidar os detalhes.", "Passou! Só não vale relaxar a segurança."],
    fail: ["Ainda não foi dessa vez. Revisa os módulos e volta pra linha de tiro.", "Faltou pouco. Até o melhor atirador já errou o primeiro alvo."],
  },
};

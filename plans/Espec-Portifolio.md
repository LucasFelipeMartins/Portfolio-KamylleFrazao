ESPECIFICAÇÃO DE DESIGN
PORTFÓLIO PÚBLICO + PAINEL ADMINISTRATIVO
Kamylle Frazão Arquitetura
Documento técnico para desenvolvimento fiel em HTML, CSS e JavaScript
- Projeto 
Portfólio institucional com estética sofisticada, leve e feminina.
- Paleta
Creme, sand, dusty pink e burgundy, com contraste suave e elegante.
- Escopo
Site público, área adm, login e versões desktop/mobile.	
- Stack
HTML, CSS e JavaScript puros, sem frameworks obrigatórios.
Este documento deve funcionar como fonte única de verdade para a equipe de desenvolvimento. A intenção é preservar o design aprovado com o máximo de fidelidade visual e estrutural.

## 1. Objetivo do projeto
Criar um site de portfólio para uma arquiteta com linguagem editorial, elegante e acolhedora, além de uma área administrativa simples e intuitiva para atualização de conteúdo. A experiência precisa ser consistente entre desktop e mobile, com navegação clara, boa leitura e composição sofisticada.
A entrega visual já aprovada pela cliente deve ser seguida sem alterações de conceito. Este documento registra as regras de layout, cores, tipografia, espaçamento, componentes e comportamento para orientar o desenvolvimento com precisão.
## 2. Direção de arte e posicionamento visual
A identidade visual é inspirada em arquitetura contemporânea com toque orgânico e feminino. O resultado deve transmitir calma, refinamento, confiança e leveza. O site não deve parecer corporativo rígido; ele precisa ter sensação de ateliê premium, com curvas suaves, áreas arejadas e detalhes delicados.
• Uso predominante de fundos claros e tons neutros quentes.
• Detalhes decorativos em rosa queimado/dusty pink para criar personalidade.
• Acentos em burgundy para CTAs, estados ativos e destaques importantes.
• Fotos grandes, bem recortadas e com bordas orgânicas, reforçando a assinatura visual.
## 3. Paleta de cores oficial
A paleta precisa ser aplicada em toda a interface, sem substituições aleatórias.
Creme	#EEE4DA  | fundo principal, áreas amplas e telas de login.
Sand	#D8C4AC  | blocos secundários, cartões suaves e áreas de suporte.
Dusty Pink	#C8A49F  | detalhes, subtítulos, contornos delicados e elementos decorativos.
Burgundy	#4D0E13  | botões principais, links ativos, destaques e ações críticas.
Branco quente	#FFFDFC  | cards, inputs, superfícies de leitura e contraste.
Texto principal	#2A2222  | títulos, parágrafos e conteúdo de uso frequente.
Texto secundário	#756864  | legendas, auxiliares e metadados.
Borda suave	#E1D6D0  | divisórias, contornos de cards e campos.
Regras de aplicação:
• Botões primários sempre em burgundy com texto claro.
• Botões secundários com fundo transparente e borda burgundy ou dusty pink.
• Usar creme como base em áreas grandes para manter a interface leve.
• Evitar preto puro; a leitura deve permanecer suave e sofisticada.
## 4. Tipografia
A tipografia deve combinar uma serif elegante para títulos com uma sans-serif limpa para os conteúdos de apoio. A hierarquia deve ser muito clara, com contrastes de peso e tamanho, mas sem excesso de variações.
Fonte de títulos	Cormorant Garamond ou equivalente serifada elegante. Se a fonte não estiver disponível, usar Georgia como fallback seguro.
Fonte de textos	Arial ou Inter, com preferência por uma sans-serif limpa e legível. Para máxima compatibilidade em HTML/CSS, Arial pode ser o padrão base.
Fonte de botões	Mesma sans-serif dos textos, porém com peso semibold/bold.
Fonte de microtextos	Sans-serif no peso regular, tamanho reduzido e bom espaçamento entre linhas.
Escala sugerida:
• H1: 64px desktop / 38px mobile
• H2: 44px desktop / 30px mobile
• H3: 28px desktop / 22px mobile
• Corpo: 18px desktop / 16px mobile
• Auxiliares: 14px desktop / 12px mobile
Estilo dos títulos: maiúsculas e/ou capitalização natural conforme o layout aprovado, com respiro generoso e contraste de cor em trechos de destaque.
## 5. Grid, largura e comportamento responsivo
O site deve ser construído em estrutura responsiva de coluna, com seções empilhadas verticalmente. No desktop, a página usa composição em blocos amplos com alinhamento centralizado e largura máxima controlada. No mobile, os blocos passam para largura total com espaçamento reduzido e leitura sequencial.
Largura máxima do conteúdo	1200px a 1280px, centralizado.
Padding lateral desktop	96px a 120px em telas grandes; nunca colar o conteúdo nas bordas.
Padding lateral mobile	20px a 24px.
Grid desktop	12 colunas, com gutters amplos e áreas respiráveis.
Grid mobile	1 coluna, com cards empilhados e pouca complexidade horizontal.
Breakpoints sugeridos	1440px, 1200px, 992px, 768px e 390px.
Em telas intermediárias, a adaptação deve preservar a composição sem quebrar a hierarquia. O hero pode trocar de duas colunas para uma coluna antes do mobile estrito, mas a ordem dos conteúdos deve permanecer coerente.
## 6. Sistema de espaçamento
A sensação de leveza depende de espaço em branco consistente. O espaçamento deve ser previsível e uniforme entre seções, blocos internos, títulos e botões.
Entre seções	88px a 112px no desktop; 64px no mobile.
Entre título e texto	16px a 24px.
Entre texto e botões	24px a 32px.
Entre cards de projeto	24px.
Entre itens em listas/admin	12px a 16px.
Padding interno dos cards	24px a 32px.
A regra geral é: menos elementos por linha, mais respiro entre eles. O site não deve parecer apertado em nenhum breakpoint.
## 7. Raios, sombras e bordas
• Cards principais: raio de 24px no desktop e 20px no mobile.
• Botões: raio de 999px para aparência pill/oval.
• Campos e caixas do ADM: raio de 16px a 20px.
• Sombras: muito sutis, com opacidade baixa e desfoque macio; nada pesado ou dramático.
• Bordas: 1px em tom bege/rosa suave, apenas para definição visual.
## 8. Estrutura do site público
A página pública deve ser composta por seções empilhadas na seguinte ordem: navegação, hero, sobre, projetos, experiência, serviços, depoimentos, chamada final, contato e rodapé. Essa ordem é importante e deve ser preservada.
- 8.1 Navbar
• Navbar fixa no topo com fundo claro translúcido ou sólido suave, dependendo do comportamento de scroll.
• Logo à esquerda com assinatura minimalista.
• Menu centralizado ou alinhado à direita no desktop.
• No mobile, usar menu hambúrguer simples e limpo.
• Links ativos devem usar burgundy e estado hover com leve destaque.
• Altura aproximada: 80px desktop e 68px mobile.
- 8.2 Hero principal
• Primeira dobra com foco em impacto visual e leitura imediata.
• Lado esquerdo: título grande, subtítulo e dois botões de ação.
• Lado direito: foto grande da arquiteta com moldura orgânica em forma de onda.
• A foto deve ocupar boa parte da área, sem parecer apertada.
• O botão principal é “Baixar Portfólio”; o secundário é “Falar comigo”.
• Adicionar pequenos detalhes decorativos em dusty pink ou burgundy para dar personalidade.
- 8.3 Sobre mim
• Seção com imagem secundária e texto institucional.
• Título com destaque em parte da frase usando dusty pink.
• Descrever a abordagem da arquiteta, propósito e sensibilidade.
• Incluir 4 atributos/ícones curtos, como atendimento personalizado, projetos autorais, soluções funcionais e estética/bem-estar.
• Botão de apoio “Conheça mais sobre mim”.
- 8.4 Projetos
• Seção com título forte e filtros visuais por categoria.
• Card de projeto com imagem, categoria, título, descrição curta e link “Ver projeto”.
• Manter cards com altura semelhante para harmonizar a grade.
• No desktop, preferir 3 cards por linha; no tablet, 2; no mobile, carrossel ou lista vertical curta.
• Botão central “Ver todos os projetos”.
- 8.5 Experiência
• Bloco de métricas com números em destaque.
• Usar 4 indicadores principais, como anos de atuação, projetos realizados, clientes satisfeitos e prêmios/menções.
• Adicionar uma linha do tempo ou marcos profissionais em versão detalhada, se houver espaço.
• Os números devem ser visualmente priorizados, com labels menores abaixo.
- 8.6 Serviços
• Seção com cards de serviço limpos e organizados.
• Cada card precisa mostrar ícone, título e breve descrição.
• Manter leitura rápida para comunicar valor sem poluição visual.
• Serviços previstos: projeto arquitetônico, projeto de interiores, acompanhamento de obras e consultoria arquitetônica.
- 8.7 Depoimentos
• Fundo levemente diferente para separar a seção.
• Um depoimento principal por vez, com foto do cliente, nome, projeto e texto curto.
• Se houver carrossel, os controles precisam ser discretos.
• Usar bordas suaves e muita clareza tipográfica.
- 8.8 CTA final
• Chamada de conversão com mensagem emocional e imagem de ambiente suave ao fundo.
• Dois botões: falar comigo e ver projetos.
• O bloco precisa parecer acolhedor e inspirador, sem vender agressivamente.
- 8.9 Contato e rodapé
• Contato com telefone, e-mail, Instagram e localização.
• Formulário com nome, e-mail, telefone e mensagem.
• Rodapé com logo, navegação, serviços, redes sociais e copyright.
• No mobile, organizar tudo em blocos empilhados com leitura simples.
## 9. Direção de arte para a área administrativa
O painel administrativo deve ser muito mais funcional do que decorativo, porém ainda alinhado à identidade do portfólio. O objetivo é reduzir esforço cognitivo, permitir edição rápida e manter a sensação de sistema premium e organizado.
• Interface clara, leve e sem ruído visual.
• Uso de cards, listas e formulários com hierarquia fácil de entender.
• CTAs sempre evidentes para salvar, editar, publicar e excluir.
• Estados de sucesso, erro e carregamento devem ser simples e visíveis.
- 9.1 Tela de login
• Acesso protegido por nome de usuário e senha.
• Layout centralizado em card com fundo creme e elementos suaves decorativos ao redor.
• Campos de entrada com labels visíveis e placeholder discreto.
• Botão principal “Entrar” em burgundy.
• Links auxiliares: lembrar de mim e esqueci minha senha.
• No mobile, o card deve ocupar quase toda a largura com foco na legibilidade.
- 9.2 Dashboard inicial
• Apresentar visão geral do conteúdo do site: projetos, serviços, depoimentos e atualizações.
• Exibir cards de métricas no topo.
• Mostrar lista de projetos recentes e atividades recentes.
• Manter navegação lateral no desktop e navegação compacta no mobile.
• O painel deve informar o status do conteúdo com clareza.
- 9.3 Gerenciamento de projetos
• Tela para adicionar, editar, remover, publicar e salvar rascunho.
• Usar tabela ou lista de cards com miniaturas, categoria, título e status.
• Ações em ícones simples: editar, excluir, duplicar, visualizar.
• Modal de confirmação antes de excluir.
• Formulário de criação/edição com título, categoria, descrição, imagem principal, galeria opcional e status.
- 9.4 Sobre mim
• Área dedicada à edição do texto institucional da arquiteta.
• Campo para texto longo, destaque e imagem de perfil.
• Preferir editor simples com suporte a negrito, itálico e listas se necessário.
• Botão de salvar alterações sempre visível.
- 9.5 Serviços
• CRUD de serviços com nome, descrição, ícone e ordem de exibição.
• Cards ou tabela de fácil leitura.
• Permitir reordenação se possível, mantendo simplicidade.
- 9.6 Depoimentos
• CRUD com nome do cliente, projeto, texto do depoimento e foto opcional.
• Listar depoimentos com ações claras de editar e excluir.
• Permitir organizar a ordem de exibição no site público.
- 9.7 Configurações e saída
• Área reservada para preferências básicas, troca de senha e logout.
• A saída precisa ser fácil de encontrar, mas sem destaque excessivo.
## 10. Layout do painel adm
Desktop: menu lateral fixo à esquerda, conteúdo principal à direita, com área superior de contexto e ações rápidas. Mobile: navegação simplificada, com menu compacto ou barra inferior, e páginas internas em cartões empilhados.
Sidebar desktop	Fundo claro, itens com ícone + texto, estado ativo em burgundy.
Topbar desktop	Logo, usuário, notificações e ações rápidas.
Mobile nav	Barra inferior ou menu hamburguer com prioridade para acessar projetos e dashboard.
Listas	Tabelas apenas quando fizer sentido; caso contrário, usar cards grandes para toque fácil.
Formulários	Campos largos, labels claras, ajuda textual e botão fixo ao final.
## 11. Comportamento mobile
O mobile precisa ser tratado como uma experiência principal, não como adaptação de última hora. O conteúdo deve continuar elegante, porém em blocos mais verticais, com interações simplificadas e navegação reduzida.
• Hero e login devem caber bem na primeira dobra, sem cortar elementos importantes.
• Cards empilhados com uma coluna; quando necessário, usar carrossel apenas para projetos ou depoimentos.
• Botões com largura total em telas pequenas.
• Menu acessível com toque de pelo menos 44px de altura.
• Textos com line-height confortável e sem blocos muito longos.
## 12. Interações e microestados
• Hover sutil em botões, cards e links, com leve elevação ou mudança de tonalidade.
• Estados de foco visíveis nos campos de formulário.
• Feedback visual ao salvar, excluir ou publicar conteúdo no ADM.
• Animações devem ser discretas, com duração curta e sem exagero.
• A rolagem entre seções pode ser suave para navegação ancorada.
## 13. Requisitos técnicos para HTML, CSS e JavaScript
A implementação será feita sem frameworks obrigatórios. A equipe deve usar HTML semântico, CSS organizado e JavaScript puro para interações. A arquitetura precisa ser simples de manter, com separação clara entre estrutura, estilo e comportamento.
HTML	Usar tags semânticas: header, main, section, article, aside, footer, nav e form.
CSS	Organizar por variáveis de cor, tipografia, espaçamento, componentes e responsividade.
JavaScript	Responsável por menu mobile, carrosséis, modais, validações e troca de estados.
Arquivos recomendados	index.html, admin.html, login.html, styles.css, admin.css e scripts separados.
Boas práticas	Evitar estilos inline; usar classes reutilizáveis e nomes consistentes.
Sugestão de organização de pastas:
• assets/images — fotos e ícones
• assets/icons — ícones lineares e utilitários
• css — arquivos de estilo público e adm
• js — scripts da interface e autenticação visual
• pages — páginas HTML principais
## 14. Componentes reutilizáveis
• Botão primário burgundy
• Botão secundário outline
• Card de projeto
• Card de serviço
• Card de depoimento
• Badge de status
• Campo de input padrão
• Textarea
• Modal de confirmação
• Toast de feedback
## 15. Conteúdo mínimo necessário para a equipe
• Logo e assinatura da marca
• Fotos da arquiteta em alta qualidade
• Fotos de cada projeto
• Texto institucional do sobre mim
• Lista de serviços com descrições curtas
• Depoimentos com nome e, se possível, foto
• Contato oficial e redes sociais
## 16. Critérios de aceitação
O desenvolvimento será considerado fiel quando respeitar integralmente a composição aprovada, a nova paleta cromática e a estrutura de seções definida. O site deve funcionar de forma limpa em desktop e mobile, com boa legibilidade e navegação intuitiva.
• Não alterar a ordem das seções sem aprovação.
• Não trocar a paleta principal por tons fora da especificação.
• Manter a estética editorial, suave e sofisticada.
• Garantir usabilidade no login e no painel adm.
• Preservar respiro, proporção e hierarquia visual.


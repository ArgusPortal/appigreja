# Igreja Batista Renovada - Aplicativo Mobile

## Visão Geral do Projeto

Este aplicativo mobile foi desenvolvido como parte da disciplina de Desenvolvimento de Aplicações Mobile, apresentando uma solução completa para a comunidade religiosa da Igreja Batista Renovada. O aplicativo oferece uma experiência integrada para membros e visitantes, fornecendo acesso a informações, eventos e conteúdo espiritual.

## Tecnologias Utilizadas

### Stack Principal
- **React Native (v0.76.7)**: Framework cross-platform para desenvolvimento mobile
- **Expo (SDK 52)**: Plataforma de ferramentas e serviços para React Native
- **Expo Router (v4.0.19)**: Sistema de roteamento baseado em arquivos para navegação
- **TypeScript**: Superconjunto tipado de JavaScript para desenvolvimento mais robusto

### Bibliotecas de UI/UX
- **React Navigation (v7)**: Navegação com integração de drawer, stack e tab
- **React Native Gesture Handler (v2.20.2)**: Manipulação avançada de gestos
- **React Native Reanimated (v3.16.1)**: Sistema de animações de alta performance
- **Expo Linear Gradient (v14.0.0)**: Gradientes personalizáveis
- **React Native Vector Icons (v10.0.0)**: Biblioteca de ícones para interfaces

### Ferramentas de Desenvolvimento
- **Metro Bundler (v4.0.1)**: Empacotador JavaScript para React Native
- **Babel (v7.24.0)**: Transpilador JavaScript
- **Patch-package (v8.0.0)**: Ferramenta para aplicação de patches em dependências
- **ESLint/Prettier**: Ferramentas de linting e formatação de código

## Arquitetura do Projeto

O aplicativo foi desenvolvido utilizando uma arquitetura modular com os seguintes componentes principais:

- **Drawer Navigation**: Navegação principal através de um menu lateral deslizante
- **Componentes Reutilizáveis**: Sistema de UI componentizado para manter consistência
- **Context API**: Gerenciamento de estado para informações globais
- **Shims e Polyfills**: Implementações personalizadas para resolver incompatibilidades
- **Error Handling**: Sistema robusto de tratamento de erros

### Arquitetura de Módulos

O projeto segue uma arquitetura de módulos bem definida:

- **App**: Ponto de entrada da aplicação, configuração inicial e gerenciamento de estado global
- **Components**: Componentes reutilizáveis isolados por responsabilidade
- **Navigation**: Configuração de rotas e navegação
- **Screens**: Componentes de tela que compõem a interface do usuário
- **Services**: Serviços para comunicação com APIs e operações assíncronas
- **Utils**: Funções utilitárias e helpers
- **Constants**: Valores constantes e configurações
- **Shims**: Polyfills e soluções para problemas de compatibilidade

## Funcionalidades Implementadas

1. **Página Inicial**
   - Feed de notícias da igreja
   - Banner de eventos próximos
   - Transmissões ao vivo

2. **Bíblia Digital**
   - Acesso a textos bíblicos
   - Sistema de busca e favoritos

3. **Agenda de Eventos**
   - Calendário interativo
   - Detalhes de eventos
   - Filtro por categorias

4. **Devocional Diário**
   - Meditações diárias
   - Compartilhamento de reflexões

5. **Dízimos e Ofertas**
   - Integração para contribuições online

6. **Localização**
   - Mapa e informações de contato
   - Rotas e direções

7. **Comunicação Comunitária**
   - Perfis de ministérios
   - Informações sobre a comunidade

## Estrutura do Projeto

## Implementação Técnica e Desafios

### Sistema de Navegação
O aplicativo implementa um sistema de navegação hierárquico baseado em Expo Router, que utiliza uma estrutura de arquivos para definir rotas de forma declarativa. A navegação principal é implementada através de um Drawer customizado que oferece acesso às principais seções do aplicativo.

### Otimizações de Performance
Foram implementadas diversas otimizações para melhorar a performance do aplicativo:

- Componentes memorizados (React.memo)
- Renderização condicional otimizada
- Lazy loading de assets e componentes pesados

### Solução de Problemas Críticos
Durante o desenvolvimento, enfrentamos e resolvemos vários desafios técnicos:

- Problema com topInsetsChange: Implementação de múltiplos interceptadores de eventos e handlers de erro personalizados para bloquear eventos problemáticos relacionados a insets de tela.
- Problemas de Resolução do Metro: Criação de resolvedores customizados no Metro Bundler para garantir o correto carregamento de módulos e evitar erros de compilação.
- Incompatibilidades entre Bibliotecas: Implementação de patches e shims para resolver incompatibilidades entre React Native, Expo e demais dependências.

### Estratégias de Tratamento de Erros
O aplicativo implementa um sistema em camadas para tratamento de erros:

- Interceptação global de erros JavaScript
- Fallbacks para componentes que podem falhar
- Limites de erro (Error Boundaries) para isolar falhas
- Registro e relatório de erros (logging)

## Execução do Projeto

### Pré-requisitos
- Node.js (v16+)
- NPM ou Yarn
- Android Studio (para emulador Android)
- XCode (para emulador iOS, apenas em macOS)
- Expo CLI (opcional)

### Instalação

## Conclusão e Aprendizados
O desenvolvimento deste aplicativo proporcionou importante experiência prática com o ecossistema React Native/Expo, abordando desafios reais do desenvolvimento mobile multiplataforma. Os principais aprendizados incluem:

- Implementação de layouts responsivos para diferentes tamanhos de tela
- Otimização de performance em dispositivos de diferentes capacidades
- Solução de problemas de compatibilidade entre bibliotecas
- Implementação de estratégias eficazes de tratamento de erros
- Aplicação de conceitos de UX/UI para uma experiência de usuário fluida

O resultado é um aplicativo completo, funcional e performático que demonstra conceitos avançados de desenvolvimento mobile em um contexto de aplicação real.

## Referências Técnicas
- [Documentação do React Native](https://reactnative.dev/docs/getting-started)
- [Documentação do Expo](https://docs.expo.dev/)
- [Expo Router Documentation](https://expo.github.io/router/docs/)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
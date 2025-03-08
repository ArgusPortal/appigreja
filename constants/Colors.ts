// Cores personalizadas para aplicativo de igreja batista renovada - Esquema preto e branco
const primaryColor = '#000000'; // Preto
const secondaryColor = '#ffffff'; // Branco
const accentColor = '#505050'; // Cinza médio para detalhes
const darkBackground = '#121212'; // Fundo escuro quase preto
const lightBackground = '#f8fafc'; // Fundo claro
const successColor = '#28a745'; // Verde para sucesso (mantido para funcionalidade)
const errorColor = '#dc3545'; // Vermelho para erros (mantido para funcionalidade)

export default {
  light: {
    text: '#121212',
    background: lightBackground,
    tint: primaryColor,
    tabIconDefault: '#888888',
    tabIconSelected: primaryColor,
    card: '#ffffff',
    buttonText: '#ffffff',
    primary: primaryColor,
    secondary: secondaryColor,
    accent: accentColor,
    success: successColor,
    error: errorColor,
    cardBorder: '#e0e0e0',
    highlight: '#f5f5f5'
  },
  dark: {
    text: '#ffffff',
    background: darkBackground,
    tint: secondaryColor,
    tabIconDefault: '#888888',
    tabIconSelected: secondaryColor,
    card: '#1a1a1a',
    buttonText: '#ffffff',
    primary: primaryColor,
    secondary: secondaryColor,
    accent: accentColor,
    success: successColor,
    error: errorColor,
    cardBorder: '#333333',
    highlight: '#252525'
  },
};

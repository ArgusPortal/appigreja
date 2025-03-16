/**
 * Arquivo de entrada personalizado que serve como ponte para o expo-router
 * Criado em: 2025-03-16T23:13:59.814Z
 */

// Redirecionando para o entry do expo-router
module.exports = require('expo-router/entry-classic');

// Importamos diretamente desta forma para garantir que o Metro possa resolver o módulo
require('expo-router');

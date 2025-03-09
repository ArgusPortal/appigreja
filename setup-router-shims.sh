#!/bin/bash

# Script para configurar manualmente os shims necessários para o expo-router
echo "🛠️  Configurando shims para expo-router..."

# Certifique-se de que a estrutura de pastas existe
mkdir -p "node_modules/expo-router/build/node"

# Copie o shim para o local esperado pelo expo-router
cp shims/router-render-shim.js node_modules/expo-router/build/node/render.js 2>/dev/null || echo "❌ Falha ao copiar shim render"

# Crie um arquivo index.js na pasta node se necessário
if [ ! -f "node_modules/expo-router/build/node/index.js" ]; then
    echo "📄 Criando node/index.js"
    echo "module.exports = { render: require('./render').render };" > node_modules/expo-router/build/node/index.js
fi

# Configure permissões corretas
chmod +x node_modules/expo-router/build/node/render.js 2>/dev/null || echo "⚠️  Não foi possível definir permissões de execução"

echo "✅ Setup completo! Execute 'npm start -- --reset-cache' para iniciar com as novas configurações."

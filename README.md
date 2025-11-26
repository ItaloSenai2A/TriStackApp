# **🌾 Mapa Vivo do Campo Inteligente**

Aplicativo mobile desenvolvido em React Native, focado no monitoramento de dados ambientais, exibição de alertas críticos, funcionamento offline e integração com sensores IoT.
O TriStack oferece uma experiência rápida, segura e confiável, mesmo em ambientes com conexão limitada.

# **📑 Índice**

-Visão Geral

-Funcionalidades

-Arquitetura do App

-Estrutura de Navegação

-Tecnologias Utilizadas

-Instalação e Execução

-Estrutura de Pastas

-Conexão com API

-Modo Offline

-Desenvolvimento e Build

-Autores

# **🔍 1. Visão Geral**

O TriStack coleta dados de sensores IoT, processa informações críticas e exibe gráficos, mapas e alertas para o usuário.
O app funciona online e offline, sincronizando automaticamente dados, limites críticos e alertas.

Principais objetivos:

-Monitorar temperatura, umidade, luminosidade e outros indicadores ambientais.

-Mostrar alertas em tempo real.

-Garantir funcionamento mesmo sem internet.

-Sincronizar dados com API REST + WebSocket.

-Fornecer navegação intuitiva e rápida.

# **⚙️ 2. Funcionalidades**
-🛰️ Monitoramento em tempo real

-Atualização de dados via API e WebSocket.

-Gráficos dinâmicos no Dashboard.

# **🚨 Gestão de alertas**

-Alertas críticos com cores visuais.

-Histórico e detalhes de cada alerta.

-Notificações locais.

# **📍 Mapa Interativo**

-Exibição de marcadores e zonas críticas.

# **🧾 Persistência Offline**

-Acesso a dados mesmo sem internet.

-Sincronização automática ao reconectar.

# **👤 Perfil do Usuário**

-Edição de dados pessoais.

-Foto de perfil.

# **🔧 Configurações**

-Alteração de limites críticos.

-Salvamento local + sincronização posterior.

# **🧱 3. Arquitetura do App**

-React Native CLI

-React Navigation (Stack + Bottom Tabs)

-Context API / Redux (opcional) para estado global

-AsyncStorage para persistência offline

-Axios para API

-WebSocket para alertas em tempo real

# **🧭 4. Estrutura de Navegação**

-O app combina Stack Navigator + Bottom Tab Navigator.

-Stack Principal

-WelcomeScreen

-LoginScreen

-CadastroScreen

-MainTabs

-AdministracaoScreen

-AlertasScreen

-DashboardScreen

-SairScreen

-Bottom Tabs

**Home** – Visão geral e mapa

**Perfil** – Dados do usuário

**Configurações** – Limites críticos

# **🛠️ 5. Tecnologias Utilizadas**
-Frontend

-React Native

-React Navigation

-Axios

-AsyncStorage

-Victory Native (gráficos)

-Leaflet/MapView (dependendo da versão do projeto)

-Backend (consumido pelo app)

-API RESTful

-WebSocket

-Autenticação JWT

-JSON como padrão

# **🚀Instalação e Execução**
-Pré-requisitos

-Node.js

-React Native CLI

-Android Studio ou Xcode

**Instalação**
-git clone https://github.com/SEU_REPOSITORIO/tristack-app
-cd tristack-app
-npm install

**Executar no Android**
-npx react-native run-android

-Executar no iOS
-npx react-native run-ios

# **📂Estrutura de Pastas**
/src
  /screens
    HomeScreen
    LoginScreen
    ProfileScreen
    SettingsScreen
    AdministracaoScreen
    DashboardScreen
    AlertasScreen
  /components
  /navigation
  /services
    api.js
    websocket.js
  /utils
  /context
assets/

# **🔌Conexão com API**
-Protocolo: HTTPS
-Formato: JSON
-Autenticação: JWT

**Endpoints principais:**

/login – valida credenciais e retorna token

/register – cria usuário

/dashboard – dados ambientais

/alerts – alertas críticos

/settings – limites críticos

📡 Modo Offline
# **🔒 Persistência via AsyncStorage:**

-Token JWT

-Dados ambientais recentes

-Alertas

-Limites críticos

# **🔄 Sincronização automática:**

Ao reconectar, o app sincroniza alterações locais → servidor

Conflitos são resolvidos com timestamps

# **🏗️ Desenvolvimento e Build**
Build Android (APK)
cd android
./gradlew assembleRelease

Build iOS
cd ios
pod install
xcodebuild -workspace .xcworkspace -scheme tristack -configuration Release

# **🧑‍💻 Autores**

Projeto desenvolvido por:

-Emanuelly Vitória dos Santos Lima
-Ítalo Francesco
-Rayssa Nanclares da Silveira

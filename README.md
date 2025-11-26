🌿  Mapa Vivo do Campo Inteligente - Aplicativo Mobile

TriStack é um aplicativo mobile desenvolvido em React Native, voltado para monitoramento ambiental, gerenciamento de alertas e dashboards de dados, com navegação intuitiva via Stack Navigator e Bottom Tab Navigator.

⚡ 1. Tecnologias Utilizadas

📱 React Native

🔀 React Navigation (Stack & Bottom Tabs)

🛠️ Expo CLI

📊 Victory Native (gráficos)

🗺️ React Native Maps / Leaflet (mapas)

⚛️ Context API / Redux (gerenciamento de estado, se aplicado)

📁 2. Estrutura de Pastas
TriStack/
│
├── App.js                 
├── package.json           
├── /src
│   ├── /screens           
│   │   ├── WelcomeScreen.js
│   │   ├── CadastroScreen.js
│   │   ├── LoginScreen.js
│   │   ├── HomeScreen.js
│   │   ├── ProfileScreen.js
│   │   ├── SettingsScreen.js
│   │   ├── AdministracaoScreen.js
│   │   ├── AlertasScreen.js
│   │   ├── DashboardScreen.js
│   │   └── SairScreen.js
│   ├── /components        
│   ├── /navigation        
│   └── /assets            
└── README.md

⚙️ 3. Instalação e Configuração

Clone o repositório:

git clone https://github.com/seu-usuario/TriStack.git
cd TriStack


Instale as dependências:

npm install
# ou
yarn install


Execute o aplicativo:

npm start
# ou
yarn start


Para Android:

npm run android
# ou
yarn android


Para iOS:

npm run ios
# ou
yarn ios


⚠️ Certifique-se de ter Android Studio ou Xcode configurado.

🧭 4. Fluxo de Navegação e Wireframes
🔹 Stack Navigator

WelcomeScreen → CadastroScreen / LoginScreen

LoginScreen → MainTabs

Menu lateral → AdministracaoScreen / AlertasScreen / DashboardScreen / SairScreen

🔹 Bottom Tab Navigator

🏠 Home

👤 Perfil

⚙️ Configurações

🖼️ Wireframes das Telas

WelcomeScreen


CadastroScreen


LoginScreen


HomeScreen


ProfileScreen


SettingsScreen


AdministracaoScreen


AlertasScreen


DashboardScreen


SairScreen


✅ 5. Funcionalidades Principais

👥 Cadastro e login de usuários

🌡️ Visualização de dados ambientais

🗺️ Mapas com áreas críticas

🚨 Gerenciamento de alertas

📊 Dashboard com gráficos detalhados

📝 Ações administrativas e checklist

🔒 Logout seguro

🔄 6. Fluxograma de Navegação

O fluxograma mostra como as telas se conectam via Stack Navigator, Bottom Tabs e menu lateral.

🚀 7. Próximos Passos

🔗 Integrar com API REST para dados reais

🔐 Autenticação avançada com JWT ou Firebase

🧪 Testes unitários e de integração

⚡ Otimização de performance de mapas e gráficos

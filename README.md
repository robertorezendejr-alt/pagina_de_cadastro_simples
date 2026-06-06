# 🔥 Tela de Cadastro com Firebase

Aplicação de cadastro com Material UI, validação completa e integração com Firebase.

## ✨ Funcionalidades

- ✅ Formulário com validação em tempo real
- ✅ Material UI Design System
- ✅ HTML semântico
- ✅ Autenticação com Firebase
- ✅ Armazenamento de dados no Firestore
- ✅ Verificação reCAPTCHA anti-robô
- ✅ Responsivo mobile-first
- ✅ Tratamento de erros robusto

## 🚀 Como Configurar Firebase

### Passo 1: Criar Projeto Firebase

1. Acesse [https://firebase.google.com](https://firebase.google.com)
2. Clique em **"Ir para console"** (canto superior direito)
3. Clique em **"Criar projeto"**
4. Preencha:
   - **Nome do projeto**: "tela-cadastro" (ou outro nome)
   - Clique em **Próximo**
5. Desabilite **"Google Analytics"** (para testes)
6. Clique em **"Criar projeto"**
7. Aguarde alguns segundos até o projeto ser criado

### Passo 2: Adicionar App Web

1. No console do Firebase, clique no ícone de engrenagem (⚙️) no canto superior esquerdo
2. Clique em **"Configurações do projeto"**
3. Procure a seção **"Seus apps"** (role para baixo)
4. Clique em **"</> (Web)"** para criar um novo app web
5. Preencha o nome do app (ex: "cadastro-app") e clique em **"Registrar app"**
6. Na próxima tela, você verá um objeto `firebaseConfig` com suas credenciais

### Passo 3: Copiar Credenciais

1. Copie TODA a configuração que aparece (o objeto com apiKey, authDomain, etc)
2. Abra o arquivo `firebase-config.js` no seu editor
3. Substitua o objeto `firebaseConfig` com suas credenciais
4. **Salve o arquivo**

Exemplo de como deve ficar:
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyDxxxxxxxxxxxxx",
    authDomain: "seu-projeto.firebaseapp.com",
    projectId: "seu-projeto-xxxxx",
    storageBucket: "seu-projeto.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef1234567890"
};
```

### Passo 4: Ativar Autenticação por Email

1. No console do Firebase, clique em **"Autenticação"** (menu esquerdo)
2. Clique na aba **"Provedores de login"**
3. Clique em **"Email/Senha"**
4. Ative o toggle **"Email/Senha"**
5. Clique em **"Salvar"**

### Passo 5: Criar Firestore Database

1. No console do Firebase, clique em **"Firestore Database"** (menu esquerdo)
2. Clique em **"Criar banco de dados"**
3. Selecione **"Iniciar no modo de teste"** (para testes locais)
4. Clique em **Próximo**
5. Escolha uma localização (ex: `us-central1` ou `asia-southeast1`)
6. Clique em **"Ativar"**
7. Aguarde alguns segundos

### Passo 6: Configurar Regras do Firestore (IMPORTANTE!)

1. No Firestore Database, clique na aba **"Regras"**
2. Substitua o conteúdo por estas regras:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permite que usuários leiam e escrevam apenas seus próprios dados
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
  }
}
```

3. Clique em **"Publicar"**

## 📁 Estrutura de Arquivos

```
.
├── index.html              # Página de cadastro (Material UI)
├── login.html              # Página de login
├── dashboard.html          # Dashboard (perfil do usuário)
├── styles.css              # Estilos CSS compartilhados
├── script.js               # JavaScript do cadastro + Firebase
├── script-login.js         # JavaScript do login + Firebase
├── script-dashboard.js     # JavaScript do dashboard + Firebase
├── firebase-config.js      # Configuração do Firebase (EDITE AQUI!)
├── firebase-exemplos.js    # Exemplos de funções Firebase
├── package.json            # Dependências do projeto
├── README.md               # Este arquivo
├── RECAPTCHA.md            # Guia para configurar reCAPTCHA
└── .git/                   # Controle de versão Git
```

## 💻 Como Rodar

### Opção 1: Python (Mais fácil)

```bash
cd /Users/robertorezendejr/Documents/www/teste
python -m http.server 8000
```

Depois acesse: **http://localhost:8000**

### Opção 2: Node.js

```bash
npm install -g http-server
http-server
```

## 🗺️ Navegação Entre Páginas

```
┌─────────────────────────────────────────┐
│  index.html (Cadastro)                  │
│  - Preencher dados                      │
│  - Criar conta com Firebase             │
│  └─→ Link para "Faça login aqui"       │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  login.html (Login)                     │
│  - Entrar com email e senha             │
│  - Resetar senha                        │
│  └─→ Redireciona para dashboard.html   │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  dashboard.html (Perfil do Usuário)     │
│  - Ver dados salvos no Firestore        │
│  - Editar nome e telefone               │
│  - Fazer logout                         │
└─────────────────────────────────────────┘
```

## 🔍 Testando o Cadastro

1. Abra http://localhost:8000 no navegador
2. Preencha o formulário:
   - **Nome**: João Silva (mínimo 3 caracteres)
   - **Email**: seu.email@exemplo.com
   - **Telefone**: (11) 99999-9999
   - **Senha**: MinhaS3nh@! (mínimo 8 caracteres com maiúscula, minúscula, número e caractere especial)
   - **Confirmar Senha**: MinhaS3nh@!
   - **Termos**: Marque a caixa
   - **reCAPTCHA**: Clique em "Não sou um robô"

3. Clique em **"Criar Conta"**
4. Se tudo funcionar, você verá uma mensagem de sucesso! ✅

## 📊 Onde Vejo os Dados?

Os dados são salvos automaticamente no **Firestore**:

1. Abra o console do Firebase
2. Clique em **"Firestore Database"**
3. Clique na coleção **"users"**
4. Você verá todos os usuários cadastrados com seus dados

## 🛠️ Funções Disponíveis (para usar em outras páginas)

### Fazer Login
```javascript
await fazerLogin('email@exemplo.com', 'senha123');
```

### Fazer Logout
```javascript
await fazerLogout();
```

### Obter Dados do Usuário
```javascript
const dados = await obterDadosUsuario();
console.log(dados);
// Retorna: { nome, email, telefone, dataCadastro, status }
```

### Atualizar Dados
```javascript
await atualizarDadosUsuario({
    telefone: '(11) 98888-8888',
    status: 'inativo'
});
```

### Monitorar Estado de Autenticação
```javascript
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('Usuário:', user.email);
    } else {
        console.log('Sem usuário');
    }
});
```

## 📚 Arquivos de Exemplo

O arquivo **`firebase-exemplos.js`** contém muitos exemplos práticos:

- ✅ Página de Login
- ✅ Dashboard (mostrar dados do usuário)
- ✅ Atualizar Perfil
- ✅ Logout
- ✅ Verificar Autenticação
- ✅ Resetar Senha
- ✅ Listar Usuários (Admin)
- ✅ Deletar Conta
- ✅ Sincronizar em Tempo Real
- ✅ Buscar Usuários

Descomente os exemplos que precisar e adapte para seu projeto!

## ❓ Troubleshooting

### "Firebase não está inicializado"
- Verifique se preencheu corretamente as credenciais em `firebase-config.js`
- Certifique-se que o arquivo foi salvo
- Recarregue a página (F5)

### "Email já está cadastrado"
- Este email já existe no seu Firestore
- Use outro email para testar

### "Senha muito fraca"
- A senha precisa de: maiúscula, minúscula, número e caractere especial (!@#$%^&*)
- Mínimo 8 caracteres

### "Você não pode criar contas"
- Verifique se ativou **Email/Senha** na seção Autenticação do Firebase
- Veja o Passo 4 acima

### reCAPTCHA não valida
- Verifique se tem conexão com internet
- A chave do reCAPTCHA é uma chave de teste. Para produção, crie sua própria em: https://www.google.com/recaptcha/admin

## 🔐 Notas de Segurança

- As credenciais do Firebase no `firebase-config.js` estão em modo público (é normal!)
- Para produção, configure **Regras de Segurança** no Firestore (já fornecidas acima)
- Nunca coloque senhas em logs ou console
- Use HTTPS em produção

## 📚 Documentação Útil

- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Cloud Firestore](https://firebase.google.com/docs/firestore)
- [Material UI](https://mui.com/)
- [Google reCAPTCHA](https://www.google.com/recaptcha/about/)

## 📝 Licença

MIT

---

**Criado em**: Junho 2026  
**Versão**: 1.0.0
# pagina_de_cadastro_simples

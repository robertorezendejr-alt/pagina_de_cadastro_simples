# ⚡ Guia Rápido - Configurar Firebase em 5 Minutos

## ✅ Checklist de Configuração

### Passo 1: Criar Projeto Firebase (2 min)
- [ ] Acesse: https://firebase.google.com
- [ ] Clique em "Ir para console"
- [ ] Clique em "Criar projeto"
- [ ] Nomeie como "tela-cadastro" (ou outro nome)
- [ ] Prossiga até criar o projeto

### Passo 2: Pegar Credenciais (1 min)
- [ ] Clique em ⚙️ (Configurações) → "Configurações do projeto"
- [ ] Role até "Seus apps"
- [ ] Clique em "</> (Web)"
- [ ] Registre um novo app
- [ ] **Copie a configuração** que aparecer

### Passo 3: Atualizar arquivo firebase-config.js (1 min)
- [ ] Abra o arquivo `firebase-config.js` neste projeto
- [ ] Substitua o objeto `firebaseConfig` com suas credenciais
- [ ] Salve o arquivo (Ctrl+S ou Cmd+S)

### Passo 4: Ativar Autenticação (1 min)
- [ ] No Firebase Console, clique em "Autenticação"
- [ ] Clique em "Ativar método de login"
- [ ] Selecione "Email/Senha"
- [ ] Ative o toggle
- [ ] Clique em "Salvar"

### Passo 5: Criar Firestore Database (1 min)
- [ ] No Firebase Console, clique em "Firestore Database"
- [ ] Clique em "Criar banco de dados"
- [ ] Selecione "Iniciar no modo de teste"
- [ ] Escolha uma localização (ex: us-central1)
- [ ] Clique em "Ativar"

### Passo 6: Configurar Regras de Segurança (1 min)
- [ ] No Firestore, clique na aba "Regras"
- [ ] Cole este código:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
  }
}
```

- [ ] Clique em "Publicar"

---

## 🚀 Pronto! Você Está Pronto Para Usar

### Para Rodar Localmente

```bash
cd /Users/robertorezendejr/Documents/www/teste
python -m http.server 8000
```

Depois abra: **http://localhost:8000**

### Testar o Cadastro

1. Preencha o formulário em `http://localhost:8000`
2. Clique em "Criar Conta"
3. Se funcionar, você verá ✅ "Cadastro realizado com sucesso!"
4. Verifique os dados no Firebase Console → Firestore Database

### Links Principais

- **Cadastro**: http://localhost:8000/index.html
- **Login**: http://localhost:8000/login.html  
- **Perfil**: http://localhost:8000/dashboard.html
- **Firebase Console**: https://console.firebase.google.com

---

## ❌ Erros Comuns

### "Firebase não está inicializado"
✅ Você esqueceu de preencher `firebase-config.js`  
→ Volte ao Passo 2 e 3

### "auth/operation-not-allowed"
✅ Você não ativou Email/Senha na Autenticação  
→ Volte ao Passo 4

### "Você não pode criar documentos"
✅ Suas regras de Firestore estão incorretas  
→ Volte ao Passo 6 e copie o código certo

### "Email já está cadastrado"
✅ Isso é normal! O email já existe  
→ Use outro email para testar

---

## 📱 Próximos Passos

Depois de configurar, você pode:

1. **Customizar estilos**: Edite `styles.css`
2. **Adicionar mais campos**: Edite `index.html` e `script.js`
3. **Conectar a um backend**: Veja `firebase-exemplos.js`
4. **Fazer deploy**: Use Firebase Hosting (`firebase deploy`)

---

## 🎓 Documentação Oficial

- [Firebase Auth](https://firebase.google.com/docs/auth)
- [Cloud Firestore](https://firebase.google.com/docs/firestore)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)

**Dúvidas?** Veja o arquivo `README.md` para mais detalhes!

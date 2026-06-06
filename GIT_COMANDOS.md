# 🔧 Comandos Git - Guia Rápido

## 📝 Quando Criar um NOVO Repositório no GitHub

### Passo 1: Criar repositório vazio no GitHub
1. Acesse https://github.com/new
2. Preench:
   - **Repository name**: seu-nome-do-projeto
   - **Description**: (opcional)
   - **Public** ou **Private**: escolha
3. Clique em "Create repository"
4. Copie a URL que aparecer

### Passo 2: Rodar esses comandos NO SEU COMPUTADOR

```bash
# Navegue até a pasta do seu projeto
cd /caminho/para/seu/projeto

# Inicie o Git
git init

# Adicione a origem remota (substitua pela URL do GitHub)
git remote add origin https://github.com/seu-usuario/seu-projeto.git

# Adicione todos os arquivos
git add .

# Faça o primeiro commit
git commit -m "Initial commit"

# Renomeie a branch para 'main' (se necessário)
git branch -M main

# Faça o push para o GitHub
git push -u origin main
```

---

## 💾 Comandos do Dia a Dia

### Quando você MODIFICOU arquivos e quer subir

```bash
# Ver o que mudou
git status

# Adicionar TODOS os arquivos modificados
git add .

# Fazer commit (obrigatório descrever o que mudou)
git commit -m "Descrição clara do que você fez"

# Subir para o GitHub
git push
```

### Exemplo Completo:
```bash
git status
# On branch main
# Changes not staged for commit:
#   modified: index.html
#   modified: styles.css

git add .
git commit -m "Fixar validação de email e melhorar estilo do botão"
git push
```

---

## 📥 Quando você quer BAIXAR atualizações do GitHub

```bash
# Baixar atualizações
git pull
```

---

## 🌿 Trabalhando com BRANCHES

### Criar uma nova branch
```bash
git branch nome-da-branch
git checkout nome-da-branch

# Ou em um comando só (Git 2.23+)
git switch -c nome-da-branch
```

### Listar branches
```bash
# Apenas locais
git branch

# Locais e remotas
git branch -a
```

### Mudar de branch
```bash
git checkout nome-da-branch
# ou
git switch nome-da-branch
```

### Deletar branch
```bash
# Local
git branch -d nome-da-branch

# Remota
git push origin --delete nome-da-branch
```

---

## 🔄 Sincronizar com Remoto

### Se alguém fez push e você quer os arquivos dele
```bash
git pull origin main
```

### Se você fez push e quer enviar específico
```bash
git push origin main
```

### Se sua branch local está atrasada
```bash
# Baixar tudo do remoto
git fetch origin

# Depois atualizar sua branch
git merge origin/main
```

---

## 🐛 Desfazer Mudanças

### Desfazer mudanças em um arquivo (antes de fazer commit)
```bash
git checkout -- nome-do-arquivo
```

### Remover arquivo do staging (antes de commit)
```bash
git reset HEAD nome-do-arquivo
```

### Desfazer último commit (CUIDADO!)
```bash
# Desfaz mas mantém as mudanças
git reset --soft HEAD~1

# Desfaz tudo
git reset --hard HEAD~1
```

---

## 📊 Ver Histórico

### Ver commits
```bash
# Simples
git log --oneline

# Com mais detalhes
git log

# Ver diferenças
git log -p
```

### Ver o que mudou
```bash
# Arquivos modificados
git diff

# De um arquivo específico
git diff nome-do-arquivo
```

---

## 🚀 Fluxo Completo Recomendado

```bash
# 1. Faça suas mudanças nos arquivos

# 2. Verifique o status
git status

# 3. Adicione os arquivos
git add .

# 4. Faça commit com mensagem clara
git commit -m "Descrever o que você fez"

# 5. Puxe mudanças do remoto (em caso de equipe)
git pull origin main

# 6. Envie para o GitHub
git push origin main
```

---

## 💡 Dicas Importantes

### Mensagens de Commit Úteis
```bash
# ✅ Bom
git commit -m "Adicionar validação de email em tempo real"
git commit -m "Fixar bug na autenticação Firebase"
git commit -m "Melhorar design responsivo do formulário"

# ❌ Ruim
git commit -m "mudança"
git commit -m "fix"
git commit -m "ajuste"
```

### Antes de fazer commit, sempre verifique:
```bash
# O que vai subir
git status

# O que exatamente mudou
git diff
```

---

## 🆘 Erros Comuns

### "error: failed to push some refs to"
**Solução:**
```bash
# Alguém fez push antes
git pull origin main
git push origin main
```

### "fatal: not a git repository"
**Solução:**
```bash
# Você não está na pasta certa ou não fez git init
cd /caminho/correto
git init
```

### "Please tell me who you are"
**Solução:**
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@exemplo.com"
```

---

## 📝 Cheat Sheet Rápido

| Comando | O que faz |
|---------|-----------|
| `git init` | Inicializa git na pasta |
| `git add .` | Adiciona todos os arquivos |
| `git commit -m "msg"` | Registra as mudanças |
| `git push` | Envia para GitHub |
| `git pull` | Baixa do GitHub |
| `git status` | Mostra o que mudou |
| `git log` | Mostra histórico |
| `git branch` | Lista branches |
| `git checkout -b branch` | Cria e muda de branch |

---

## 📚 Documentação Oficial

- [Git Official](https://git-scm.com/doc)
- [GitHub Help](https://docs.github.com)
- [Git Cheat Sheet](https://github.github.com/training-kit/downloads/github-git-cheat-sheet.pdf)

---

**Criado em:** Junho 2026  
**Versão:** 1.0

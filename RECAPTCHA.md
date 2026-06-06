# 🔐 Configurar reCAPTCHA v2

O formulário atualmente usa uma **chave de teste do reCAPTCHA**. Para produção, você precisa criar sua própria chave.

## 📝 Passo a Passo

### 1. Acessar Google reCAPTCHA Admin

1. Acesse: https://www.google.com/recaptcha/admin
2. Faça login com sua conta Google
3. Clique em **"+ Create"** (criar novo)

### 2. Configurar reCAPTCHA v2

Preencha com:
- **Label**: "Tela de Cadastro" (ou outro nome)
- **reCAPTCHA type**: Selecione **"reCAPTCHA v2"** → **"'I'm not a robot' Checkbox"**
- **Domains**: 
  - Para testes local: `localhost`
  - Para produção: seu domínio (ex: `exemplo.com`)

Clique em **"Create"**

### 3. Copiar as Chaves

Na próxima tela, você verá:
- **Site Key** (chave pública)
- **Secret Key** (chave secreta)

### 4. Atualizar index.html

Abra `index.html` e procure por esta linha:

```html
<div class="g-recaptcha" data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"></div>
```

Substitua `data-sitekey="..."` por sua **Site Key**:

```html
<div class="g-recaptcha" data-sitekey="SUA_SITE_KEY_AQUI"></div>
```

### 5. Backend (Opcional)

Para validar o reCAPTCHA no backend, você pode usar a **Secret Key**.

Exemplo com Node.js/Express:

```javascript
app.post('/api/validar-recaptcha', async (req, res) => {
    const recaptchaToken = req.body.recaptchaToken;
    const secretKey = 'SUA_SECRET_KEY_AQUI';

    try {
        const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `secret=${secretKey}&response=${recaptchaToken}`
        });

        const data = await response.json();
        
        if (data.success && data.score > 0.5) {
            res.json({ valid: true });
        } else {
            res.json({ valid: false });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

## 🧪 Teste Localmente

Para testar localmente sem reCAPTCHA:

1. Edite `index.html`
2. Comente ou remova a linha do reCAPTCHA:
   ```html
   <!-- <div class="g-recaptcha" data-sitekey="..."></div> -->
   ```

3. Em `script.js`, modifique a validação:
   ```javascript
   function validateRecaptcha() {
       // Para testes locais, sempre retorna true
       clearError('recaptcha');
       return true;
   }
   ```

## 📊 Dashboard reCAPTCHA

No https://www.google.com/recaptcha/admin você pode:
- Ver estatísticas de requisições
- Monitorar score de fraude
- Gerenciar múltiplos sites

## 🔒 Notas de Segurança

- **Site Key**: Pode ser pública (coloque em HTML)
- **Secret Key**: NUNCA coloque em arquivos públicos (use apenas no backend)
- reCAPTCHA v2 é bom para bloquear bots
- reCAPTCHA v3 é melhor para detectar fraude (usar score)

## 🎯 Diferenças Entre Versões

| Aspecto | v2 Checkbox | v2 Invisible | v3 |
|---------|------------|-------------|-----|
| UX | Clica em checkbox | Invisível | Invisível |
| Detecção | Boa | Ótima | Excelente |
| Score | Não | Não | Sim (0-1) |
| Uso | Cadastros | Tudo | Tudo |

---

**Dúvidas?** Veja: https://developers.google.com/recaptcha/docs/start

// Aguarda o Firebase estar carregado
window.addEventListener('load', () => {
    console.log('DOM carregado e Firebase pronto!');
});

const loginForm = document.getElementById('loginForm');
const successMessage = document.getElementById('successMessage');
const resetMessage = document.getElementById('resetMessage');
const resetarSenhaLink = document.getElementById('resetarSenhaLink');
const submitBtn = document.querySelector('.btn-submit');

const inputs = {
    email: document.getElementById('loginEmail'),
    senha: document.getElementById('loginSenha')
};

const errors = {
    email: document.getElementById('emailError'),
    senha: document.getElementById('senhaError')
};

let firebaseReady = false;
setTimeout(() => {
    if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
        firebaseReady = true;
        console.log('✅ Firebase disponível!');
    } else {
        console.warn('⚠️ Firebase não inicializado. Verifique firebase-config.js');
    }
}, 1000);

/**
 * Validação de campos
 */
const validators = {
    email: (value) => {
        if (!value.trim()) {
            return 'Email é obrigatório';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return 'Email inválido';
        }
        return null;
    },

    senha: (value) => {
        if (!value) {
            return 'Senha é obrigatória';
        }
        if (value.length < 8) {
            return 'Senha deve ter no mínimo 8 caracteres';
        }
        return null;
    }
};

function showError(fieldName, message) {
    const errorElement = errors[fieldName];
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        inputs[fieldName]?.classList.add('error');
    }
}

function clearError(fieldName) {
    const errorElement = errors[fieldName];
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        inputs[fieldName]?.classList.remove('error');
    }
}

function validateField(fieldName) {
    const value = inputs[fieldName].value;
    const error = validators[fieldName](value);

    if (error) {
        showError(fieldName, error);
        return false;
    } else {
        clearError(fieldName);
        return true;
    }
}

function validateForm() {
    const fieldsToValidate = ['email', 'senha'];
    let isValid = true;

    fieldsToValidate.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    return isValid;
}

// Event listeners para validação em tempo real
Object.keys(inputs).forEach(fieldName => {
    const input = inputs[fieldName];
    
    input.addEventListener('blur', () => {
        validateField(fieldName);
    });

    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateField(fieldName);
        }
    });
});

/**
 * Submissão do formulário de login
 */
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) {
        console.log('Formulário contém erros');
        return;
    }

    if (!firebaseReady) {
        showError('email', 'Firebase não está configurado. Verifique firebase-config.js');
        return;
    }

    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner"></span><span class="btn-text">Entrando...</span>';

    try {
        const email = inputs.email.value;
        const senha = inputs.senha.value;

        console.log('🔑 Fazendo login...');
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, senha);
        
        console.log('✅ Login realizado:', userCredential.user.email);

        // Pega dados do usuário
        const dados = await firebase.firestore()
            .collection('users')
            .doc(userCredential.user.uid)
            .get();

        if (dados.exists) {
            console.log('👤 Dados do usuário:', dados.data());
        }

        loginForm.style.display = 'none';
        successMessage.style.display = 'block';

        // Redireciona após 2 segundos
        setTimeout(() => {
            console.log('Redirecionando para dashboard...');
            // Descomente a linha abaixo se tiver uma página dashboard
            // window.location.href = '/dashboard.html';
            alert('Login realizado com sucesso! (Em desenvolvimento)');
        }, 2000);

    } catch (error) {
        console.error('❌ Erro:', error.code, error.message);
        
        let mensagemErro = 'Erro ao fazer login. Tente novamente.';
        
        if (error.code === 'auth/user-not-found') {
            mensagemErro = 'Usuário não encontrado. Cadastre-se primeiro';
        } else if (error.code === 'auth/wrong-password') {
            mensagemErro = 'Senha incorreta';
        } else if (error.code === 'auth/invalid-email') {
            mensagemErro = 'Email inválido';
        } else if (error.code === 'auth/too-many-requests') {
            mensagemErro = 'Muitas tentativas. Tente mais tarde';
        }
        
        showError('email', mensagemErro);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
});

/**
 * Reset de senha
 */
resetarSenhaLink.addEventListener('click', async (e) => {
    e.preventDefault();

    if (!validateField('email')) {
        alert('Preenchea com um email válido');
        return;
    }

    if (!firebaseReady) {
        alert('Firebase não está configurado');
        return;
    }

    const email = inputs.email.value;
    submitBtn.disabled = true;

    try {
        console.log('📧 Enviando email de reset...');
        await firebase.auth().sendPasswordResetEmail(email);
        
        console.log('✅ Email enviado para:', email);
        
        loginForm.style.display = 'none';
        resetMessage.style.display = 'block';

    } catch (error) {
        console.error('❌ Erro ao resetar senha:', error.message);
        
        if (error.code === 'auth/user-not-found') {
            alert('Este email não está cadastrado');
        } else if (error.code === 'auth/too-many-requests') {
            alert('Muitas tentativas. Tente mais tarde');
        } else {
            alert('Erro ao enviar email. Tente novamente');
        }
    } finally {
        submitBtn.disabled = false;
    }
});

/**
 * Volta para o formulário de login
 */
function voltarParaLogin() {
    loginForm.style.display = 'block';
    resetMessage.style.display = 'none';
    inputs.email.value = '';
    inputs.senha.value = '';
}

console.log('Script de login carregado!');

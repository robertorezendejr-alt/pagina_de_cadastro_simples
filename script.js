// Aguarda o Firebase estar carregado
window.addEventListener('load', () => {
    console.log('DOM carregado e Firebase pronto!');
});

// Selecionando elementos do DOM
const form = document.getElementById('cadastroForm');
const successMessage = document.getElementById('successMessage');
const inputs = {
    nome: document.getElementById('nome'),
    email: document.getElementById('email'),
    telefone: document.getElementById('telefone'),
    senha: document.getElementById('senha'),
    confirmaSenha: document.getElementById('confirmaSenha'),
    termos: document.getElementById('termos')
};

const errors = {
    nome: document.getElementById('nomeError'),
    email: document.getElementById('emailError'),
    telefone: document.getElementById('telefoneError'),
    senha: document.getElementById('senhaError'),
    confirmaSenha: document.getElementById('confirmaSenhaError'),
    termos: document.getElementById('termosError'),
    recaptcha: document.getElementById('recaptchaError')
};

const submitBtn = document.querySelector('.btn-submit');

// Verificar se Firebase está inicializado - Versão melhorada
let firebaseReady = false;

function checkFirebaseReady() {
    return typeof firebase !== 'undefined' && firebase.apps.length > 0;
}

// Desabilita o botão inicialmente
submitBtn.disabled = true;
submitBtn.innerHTML = '<span class="spinner"></span><span class="btn-text">Carregando Firebase...</span>';

// Tenta verificar a cada 100ms por até 10 segundos
let attempts = 0;
const checkInterval = setInterval(() => {
    if (checkFirebaseReady()) {
        firebaseReady = true;
        console.log('✅ Firebase disponível!');
        clearInterval(checkInterval);
        // Habilita o botão
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Criar Conta';
        console.log('✅ Botão habilitado!');
    } else if (attempts >= 100) { // 100 * 100ms = 10 segundos
        console.warn('⚠️ Firebase não inicializado após 10 segundos');
        clearInterval(checkInterval);
        // Habilita o botão mesmo assim para permitir retry
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Criar Conta (Retry)';
    }
    attempts++;
}, 100);

/**
 * Validação de campos individuais
 */
const validators = {
    nome: (value) => {
        if (!value.trim()) {
            return 'Nome é obrigatório';
        }
        if (value.trim().length < 3) {
            return 'Nome deve ter no mínimo 3 caracteres';
        }
        if (!/^[a-záàâãéèêíïóôõöúçñ\s]+$/i.test(value)) {
            return 'Nome deve conter apenas letras';
        }
        return null;
    },

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

    telefone: (value) => {
        if (!value.trim()) {
            return 'Telefone é obrigatório';
        }
        const telefoneRegex = /^(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/;
        if (!telefoneRegex.test(value)) {
            return 'Telefone inválido. Use formato: (11) 99999-9999';
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
        if (!/[A-Z]/.test(value)) {
            return 'Senha deve conter pelo menos uma letra maiúscula';
        }
        if (!/[a-z]/.test(value)) {
            return 'Senha deve conter pelo menos uma letra minúscula';
        }
        if (!/[0-9]/.test(value)) {
            return 'Senha deve conter pelo menos um número';
        }
        if (!/[!@#$%^&*]/.test(value)) {
            return 'Senha deve conter pelo menos um caractere especial (!@#$%^&*)';
        }
        return null;
    },

    confirmaSenha: (value) => {
        if (!value) {
            return 'Confirmação de senha é obrigatória';
        }
        if (value !== inputs.senha.value) {
            return 'As senhas não correspondem';
        }
        return null;
    },

    termos: (checked) => {
        if (!checked) {
            return 'Você deve concordar com os termos de serviço';
        }
        return null;
    }
};

/**
 * Mostra mensagem de erro para um campo
 */
function showError(fieldName, message) {
    const errorElement = errors[fieldName];
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        inputs[fieldName]?.classList.add('error');
    }
}

/**
 * Remove mensagem de erro de um campo
 */
function clearError(fieldName) {
    const errorElement = errors[fieldName];
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        inputs[fieldName]?.classList.remove('error');
    }
}

/**
 * Valida um campo específico
 */
function validateField(fieldName) {
    const input = inputs[fieldName];
    if (!input) return true;

    const value = fieldName === 'termos' ? input.checked : input.value;
    const error = validators[fieldName](value);

    if (error) {
        showError(fieldName, error);
        return false;
    } else {
        clearError(fieldName);
        return true;
    }
}

/**
 * Valida o reCAPTCHA
 */
function validateRecaptcha() {
    const recaptchaResponse = grecaptcha.getResponse();
    
    if (!recaptchaResponse) {
        showError('recaptcha', 'Por favor, confirme que você não é um robô');
        return false;
    } else {
        clearError('recaptcha');
        return true;
    }
}

/**
 * Valida o formulário inteiro
 */
function validateForm() {
    const fieldsToValidate = ['nome', 'email', 'telefone', 'senha', 'confirmaSenha', 'termos'];
    let isValid = true;

    fieldsToValidate.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    if (!validateRecaptcha()) {
        isValid = false;
    }

    return isValid;
}

/**
 * Event listeners para validação em tempo real
 */
Object.keys(inputs).forEach(fieldName => {
    const input = inputs[fieldName];
    if (!input) return;

    input.addEventListener('blur', () => {
        validateField(fieldName);
    });

    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateField(fieldName);
        }
    });

    input.addEventListener('change', () => {
        if (input.classList.contains('error')) {
            validateField(fieldName);
        }
    });
});

/**
 * Submissão do formulário COM FIREBASE
 */
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Valida o formulário
    if (!validateForm()) {
        console.log('Formulário contém erros');
        return;
    }

    // Desabilita o botão e mostra loading
    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner"></span><span class="btn-text">Preparando...</span>';

    // Aguarda Firebase estar pronto (com retry)
    let firebaseOk = false;
    let retryCount = 0;
    const maxRetries = 300; // 300 * 100ms = 30 segundos
    
    console.log('⏳ Aguardando Firebase ficar pronto...');
    
    while (!firebaseOk && retryCount < maxRetries) {
        if (checkFirebaseReady()) {
            firebaseOk = true;
            console.log('✅ Firebase pronto! Prosseguindo...');
            break;
        }
        // Atualiza status a cada 5 segundos
        if (retryCount % 50 === 0 && retryCount > 0) {
            const segundos = Math.floor(retryCount / 10);
            console.log(`⏳ Ainda aguardando Firebase... ${segundos}s`);
            submitBtn.innerHTML = `<span class="spinner"></span><span class="btn-text">Preparando... ${segundos}s</span>`;
        }
        // Aguarda 100ms e tenta novamente
        await new Promise(resolve => setTimeout(resolve, 100));
        retryCount++;
    }

    if (!firebaseOk) {
        console.error(`❌ Firebase não inicializou após 30 segundos (${retryCount} tentativas)`);
        showError('recaptcha', 'Erro: Firebase não carregou após 30 segundos. Recarregue a página e tente novamente.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Criar Conta (Retry)';
        return;
    }

    try {
        const email = inputs.email.value;
        const senha = inputs.senha.value;
        const nome = inputs.nome.value;
        const telefone = inputs.telefone.value;

        // Atualiza status do botão
        submitBtn.innerHTML = '<span class="spinner"></span><span class="btn-text">Criando conta...</span>';

        // 1. Cria o usuário no Firebase Auth
        console.log('📝 Criando usuário no Firebase...');
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, senha);
        const userId = userCredential.user.uid;
        console.log('✅ Usuário criado:', userId);

        // 2. Atualiza o perfil do usuário
        await userCredential.user.updateProfile({
            displayName: nome
        });
        console.log('✅ Perfil atualizado');

        // 3. Salva dados adicionais no Firestore
        console.log('💾 Salvando dados no Firestore...');
        await firebase.firestore().collection('users').doc(userId).set({
            nome: nome,
            email: email,
            telefone: telefone,
            dataCadastro: new Date(),
            recaptchaToken: grecaptcha.getResponse(),
            status: 'ativo'
        });
        console.log('✅ Dados salvos no Firestore');

        // 4. Sucesso! Mostra mensagem e redireciona
        form.style.display = 'none';
        successMessage.style.display = 'block';

        // Log dos dados salvos
        console.log('📊 Dados do usuário salvos:');
        console.log({
            userId: userId,
            nome: nome,
            email: email,
            telefone: telefone,
            dataCadastro: new Date()
        });

        // Redireciona após 3 segundos
        setTimeout(() => {
            console.log('Redirecionando...');
            // Descomente a linha abaixo para redirecionar para uma página de sucesso
            // window.location.href = '/dashboard';
        }, 3000);

    } catch (error) {
        console.error('❌ Erro:', error.code, error.message);
        
        // Tratamento de erros específicos
        let mensagemErro = 'Erro ao criar conta. Tente novamente.';
        
        if (error.code === 'auth/email-already-in-use') {
            mensagemErro = 'Este email já está cadastrado';
        } else if (error.code === 'auth/weak-password') {
            mensagemErro = 'Senha muito fraca';
        } else if (error.code === 'auth/invalid-email') {
            mensagemErro = 'Email inválido';
        } else if (error.code === 'auth/operation-not-allowed') {
            mensagemErro = 'Cadastro desabilitado. Configure o Firebase corretamente';
        }
        
        showError('recaptcha', mensagemErro);
        grecaptcha.reset();
    } finally {
        // Restaura o botão
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
});

/**
 * Reset do reCAPTCHA quando o formulário é resetado
 */
form.addEventListener('reset', () => {
    grecaptcha.reset();
    Object.keys(errors).forEach(field => clearError(field));
});

/**
 * FUNÇÕES ÚTEIS PARA USAR COM FIREBASE
 */

/**
 * Faz login de um usuário
 * @param {string} email 
 * @param {string} senha 
 */
async function fazerLogin(email, senha) {
    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, senha);
        console.log('✅ Login realizado:', userCredential.user.email);
        return userCredential.user;
    } catch (error) {
        console.error('❌ Erro ao fazer login:', error.message);
        throw error;
    }
}

/**
 * Faz logout do usuário
 */
async function fazerLogout() {
    try {
        await firebase.auth().signOut();
        console.log('✅ Logout realizado');
    } catch (error) {
        console.error('❌ Erro ao fazer logout:', error.message);
        throw error;
    }
}

/**
 * Obtém dados do usuário atual do Firestore
 */
async function obterDadosUsuario() {
    try {
        const user = firebase.auth().currentUser;
        
        if (!user) {
            console.warn('Nenhum usuário autenticado');
            return null;
        }

        const docSnapshot = await firebase.firestore()
            .collection('users')
            .doc(user.uid)
            .get();

        if (docSnapshot.exists) {
            console.log('✅ Dados do usuário:', docSnapshot.data());
            return docSnapshot.data();
        } else {
            console.warn('Documento do usuário não encontrado');
            return null;
        }
    } catch (error) {
        console.error('❌ Erro ao obter dados:', error.message);
        throw error;
    }
}

/**
 * Atualiza dados do usuário no Firestore
 * @param {object} dados - Objeto com os dados a atualizar
 */
async function atualizarDadosUsuario(dados) {
    try {
        const user = firebase.auth().currentUser;
        
        if (!user) {
            throw new Error('Usuário não autenticado');
        }

        await firebase.firestore()
            .collection('users')
            .doc(user.uid)
            .update(dados);

        console.log('✅ Dados atualizados');
        return true;
    } catch (error) {
        console.error('❌ Erro ao atualizar dados:', error.message);
        throw error;
    }
}

/**
 * Monitora o estado de autenticação
 */
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('👤 Usuário autenticado:', user.email);
    } else {
        console.log('👤 Nenhum usuário autenticado');
    }
});

console.log('Script carregado com sucesso!');

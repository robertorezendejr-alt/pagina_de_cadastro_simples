// Aguarda o Firebase estar carregado
let firebaseReady = false;
setTimeout(() => {
    if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
        firebaseReady = true;
        console.log('✅ Firebase disponível!');
        inicializarDashboard();
    } else {
        console.warn('⚠️ Firebase não inicializado. Verifique firebase-config.js');
    }
}, 1000);

const loading = document.getElementById('loading');
const notAuthenticated = document.getElementById('notAuthenticated');
const dashboard = document.getElementById('dashboard');
const editForm = document.getElementById('editForm');
const formEditar = document.getElementById('formEditar');

let userAtual = null;

/**
 * Inicializa o dashboard
 */
async function inicializarDashboard() {
    // Monitora o estado de autenticação
    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
            console.log('👤 Usuário autenticado:', user.email);
            userAtual = user;
            loading.style.display = 'none';
            notAuthenticated.style.display = 'none';
            dashboard.style.display = 'grid';
            editForm.style.display = 'none';

            // Carrega dados do usuário
            await carregarDados();

            // Monitora atualizações em tempo real
            monitorarAtualizacoes();

        } else {
            console.log('👤 Nenhum usuário autenticado');
            loading.style.display = 'none';
            notAuthenticated.style.display = 'block';
            dashboard.style.display = 'none';
            editForm.style.display = 'none';
        }
    });
}

/**
 * Carrega dados do usuário
 */
async function carregarDados() {
    try {
        const doc = await firebase.firestore()
            .collection('users')
            .doc(userAtual.uid)
            .get();

        if (doc.exists) {
            const dados = doc.data();
            console.log('📊 Dados carregados:', dados);

            // Preenche os campos
            document.getElementById('nomePerfil').textContent = dados.nome || '-';
            document.getElementById('emailPerfil').textContent = userAtual.email;
            document.getElementById('telefonePerfil').textContent = dados.telefone || '-';
            document.getElementById('statusPerfil').textContent = dados.status || 'Ativo';
            document.getElementById('userIdPerfil').textContent = userAtual.uid;

            // Formata data
            if (dados.dataCadastro) {
                const data = dados.dataCadastro.toDate();
                const dataFormatada = new Intl.DateTimeFormat('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }).format(data);
                document.getElementById('dataCadastroPerfil').textContent = dataFormatada;
            } else {
                document.getElementById('dataCadastroPerfil').textContent = '-';
            }

            // Preenche form de edição
            document.getElementById('editNome').value = dados.nome || '';
            document.getElementById('editTelefone').value = dados.telefone || '';

        } else {
            console.warn('Documento não encontrado');
        }
    } catch (error) {
        console.error('❌ Erro ao carregar dados:', error.message);
    }
}

/**
 * Monitora atualizações em tempo real
 */
function monitorarAtualizacoes() {
    firebase.firestore()
        .collection('users')
        .doc(userAtual.uid)
        .onSnapshot((doc) => {
            if (doc.exists) {
                console.log('📊 Dados atualizados em tempo real:', doc.data());
                const dados = doc.data();

                // Atualiza a tela
                document.getElementById('nomePerfil').textContent = dados.nome || '-';
                document.getElementById('telefonePerfil').textContent = dados.telefone || '-';
                document.getElementById('statusPerfil').textContent = dados.status || 'Ativo';
            }
        });
}

/**
 * Atualiza dados do servidor
 */
async function atualizarDados() {
    console.log('🔄 Atualizando dados...');
    await carregarDados();
    alert('✅ Dados atualizados!');
}

/**
 * Abre o formulário de edição
 */
function abrirEditar() {
    dashboard.style.display = 'none';
    editForm.style.display = 'block';
}

/**
 * Cancela a edição
 */
function cancelarEdicao() {
    dashboard.style.display = 'grid';
    editForm.style.display = 'none';
}

/**
 * Salva alterações
 */
formEditar.addEventListener('submit', async (e) => {
    e.preventDefault();

    const novoNome = document.getElementById('editNome').value.trim();
    const novoTelefone = document.getElementById('editTelefone').value.trim();

    if (!novoNome) {
        alert('Nome é obrigatório');
        return;
    }

    try {
        // Atualiza no Auth
        await userAtual.updateProfile({
            displayName: novoNome
        });

        // Atualiza no Firestore
        await firebase.firestore()
            .collection('users')
            .doc(userAtual.uid)
            .update({
                nome: novoNome,
                telefone: novoTelefone
            });

        console.log('✅ Dados atualizados com sucesso!');
        alert('✅ Perfil atualizado com sucesso!');

        // Volta para a visão de dados
        dashboard.style.display = 'grid';
        editForm.style.display = 'none';

    } catch (error) {
        console.error('❌ Erro ao atualizar:', error.message);
        alert('❌ Erro ao atualizar perfil: ' + error.message);
    }
});

/**
 * Faz logout
 */
async function fazerLogout() {
    if (confirm('Tem certeza que deseja sair?')) {
        try {
            await firebase.auth().signOut();
            console.log('✅ Logout realizado');
            window.location.href = 'login.html';
        } catch (error) {
            console.error('❌ Erro ao sair:', error.message);
        }
    }
}

console.log('Script do dashboard carregado!');

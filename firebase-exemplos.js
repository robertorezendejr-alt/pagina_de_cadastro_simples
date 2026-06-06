/**
 * EXEMPLOS DE USO DO FIREBASE
 * 
 * Copie e cole esses exemplos em suas páginas para usar Firebase
 */

// ==========================================
// EXEMPLO 1: Página de Login
// ==========================================

/*
async function fazerLoginExemplo() {
    try {
        const email = 'usuario@exemplo.com';
        const senha = 'Senha123!';
        
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, senha);
        console.log('✅ Login realizado para:', userCredential.user.email);
        
        // Redireciona para o dashboard
        window.location.href = '/dashboard';
        
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            console.error('Usuário não encontrado');
        } else if (error.code === 'auth/wrong-password') {
            console.error('Senha incorreta');
        } else {
            console.error('Erro:', error.message);
        }
    }
}
*/

// ==========================================
// EXEMPLO 2: Dashboard - Mostrar Dados do Usuário
// ==========================================

/*
// Espera o usuário fazer login e mostra seus dados
firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
        console.log('Usuário autenticado:', user.email);
        
        // Pega dados do Firestore
        const dados = await firebase.firestore()
            .collection('users')
            .doc(user.uid)
            .get();
        
        if (dados.exists) {
            const userData = dados.data();
            console.log('Nome:', userData.nome);
            console.log('Telefone:', userData.telefone);
            
            // Atualiza a página com os dados
            document.getElementById('nomeUsuario').textContent = userData.nome;
            document.getElementById('emailUsuario').textContent = user.email;
            document.getElementById('telefoneUsuario').textContent = userData.telefone;
        }
    } else {
        console.log('Usuário não autenticado');
        // Redireciona para login
        window.location.href = '/login.html';
    }
});
*/

// ==========================================
// EXEMPLO 3: Atualizar Perfil do Usuário
// ==========================================

/*
async function atualizarPerfil(novoNome, novoTelefone) {
    try {
        const user = firebase.auth().currentUser;
        
        if (!user) {
            throw new Error('Usuário não autenticado');
        }
        
        // Atualiza nome no Firebase Auth
        await user.updateProfile({
            displayName: novoNome
        });
        
        // Atualiza dados no Firestore
        await firebase.firestore()
            .collection('users')
            .doc(user.uid)
            .update({
                nome: novoNome,
                telefone: novoTelefone
            });
        
        console.log('✅ Perfil atualizado com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao atualizar perfil:', error.message);
    }
}
*/

// ==========================================
// EXEMPLO 4: Logout
// ==========================================

/*
async function sair() {
    try {
        await firebase.auth().signOut();
        console.log('✅ Logout realizado');
        window.location.href = '/index.html'; // Redireciona para cadastro
    } catch (error) {
        console.error('❌ Erro ao sair:', error.message);
    }
}
*/

// ==========================================
// EXEMPLO 5: Verificar se Usuário está Autenticado
// ==========================================

/*
firebase.auth().onAuthStateChanged((user) => {
    const botaoLogout = document.getElementById('botaoLogout');
    const botaoLogin = document.getElementById('botaoLogin');
    
    if (user) {
        // Usuário autenticado
        botaoLogout.style.display = 'block';
        botaoLogin.style.display = 'none';
    } else {
        // Usuário não autenticado
        botaoLogout.style.display = 'none';
        botaoLogin.style.display = 'block';
    }
});
*/

// ==========================================
// EXEMPLO 6: Resetar Senha
// ==========================================

/*
async function resetarSenha(email) {
    try {
        await firebase.auth().sendPasswordResetEmail(email);
        console.log('✅ Email de reset enviado para:', email);
        alert('Verifique seu email para resetar a senha');
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            console.error('Email não encontrado');
        } else {
            console.error('Erro:', error.message);
        }
    }
}
*/

// ==========================================
// EXEMPLO 7: Listar Todos os Usuários (ADMIN)
// ==========================================

/*
async function listarUsuarios() {
    try {
        const usuarios = await firebase.firestore()
            .collection('users')
            .get();
        
        usuarios.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
        });
        
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
    }
}

// Nota: Isso funcionará apenas se você ajustar as regras do Firestore
// para permitir leitura de todos os documentos (apenas para testes!)
*/

// ==========================================
// EXEMPLO 8: Deletar Conta de Usuário
// ==========================================

/*
async function deletarConta() {
    try {
        const user = firebase.auth().currentUser;
        
        if (!user) {
            throw new Error('Usuário não autenticado');
        }
        
        // Deleta dados no Firestore
        await firebase.firestore()
            .collection('users')
            .doc(user.uid)
            .delete();
        
        // Deleta conta do Firebase Auth
        await user.delete();
        
        console.log('✅ Conta deletada com sucesso');
        window.location.href = '/index.html';
        
    } catch (error) {
        console.error('❌ Erro ao deletar conta:', error.message);
        
        if (error.code === 'auth/requires-recent-login') {
            console.error('Por segurança, faça login novamente antes de deletar a conta');
        }
    }
}
*/

// ==========================================
// EXEMPLO 9: Sincronizar Dados em Tempo Real
// ==========================================

/*
firebase.firestore()
    .collection('users')
    .doc(userUID)
    .onSnapshot((doc) => {
        if (doc.exists) {
            console.log('Dados atualizados:', doc.data());
            // Atualiza a página em tempo real conforme os dados mudam
            document.getElementById('nomeUsuario').textContent = doc.data().nome;
        }
    });
*/

// ==========================================
// EXEMPLO 10: Buscar Usuários por Email
// ==========================================

/*
async function buscarPorEmail(email) {
    try {
        const usuarios = await firebase.firestore()
            .collection('users')
            .where('email', '==', email)
            .get();
        
        if (usuarios.empty) {
            console.log('Nenhum usuário encontrado');
            return null;
        }
        
        usuarios.forEach((doc) => {
            console.log('Usuário encontrado:', doc.data());
        });
        
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
    }
}

// Nota: Isso requer um índice Firestore para a coleção 'users'
// O Firebase vai sugerir criar o índice automaticamente
*/

console.log('Exemplos de Firebase carregados!');

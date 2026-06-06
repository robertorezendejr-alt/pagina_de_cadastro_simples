/**
 * CONFIGURAÇÃO DO FIREBASE
 * 
 * PASSO A PASSO PARA CONSEGUIR ESSAS CREDENCIAIS:
 * 
 * 1. Acesse: https://firebase.google.com
 * 2. Clique em "Ir para console"
 * 3. Clique em "Criar projeto"
 * 4. Escolha um nome (ex: "tela-cadastro") e próximo
 * 5. Desabilite "Analytics" e criar projeto
 * 6. Quando criado, clique no ícone de engrenagem (Configurações) no canto superior esquerdo
 * 7. Vá para a aba "Configurações do projeto"
 * 8. Role até a seção "Seus apps"
 * 9. Clique em "</> (Web)" se não estiver criado um app web
 * 10. Copie o objeto "firebaseConfig" e substitua os valores abaixo
 * 
 * ALÉM DISSO:
 * 11. No console do Firebase, vá para "Autenticação" (menu esquerdo)
 * 12. Clique em "Ativar método de login"
 * 13. Escolha "Email/Senha" e ative
 * 14. Vá para "Firestore Database"
 * 15. Clique em "Criar banco de dados"
 * 16. Escolha "Iniciar no modo de teste" (depois você muda para produção)
 * 17. Escolha a localização (ex: us-central1 ou asia-southeast1)
 * 18. Pronto! Seu Firebase está configurado
 */

// ⬇️ SUBSTITUA PELOS SEUS VALORES DO FIREBASE ⬇️

/**
 * CONFIGURAÇÃO DO FIREBASE - SUAS CREDENCIAIS
 */

const firebaseConfig = {
  apiKey: "AIzaSyCIzPWiKjJiDk2EGubtJoOrWk5SmTkGvYo",
  authDomain: "tela-cadastro-77959.firebaseapp.com",
  projectId: "tela-cadastro-77959",
  storageBucket: "tela-cadastro-77959.firebasestorage.app",
  messagingSenderId: "881419833650",
  appId: "1:881419833650:web:f004aa19b97d830b68872b"
};

// Inicializa Firebase - Aguarda o SDK estar pronto
function initializeFirebase() {
    if (typeof firebase === 'undefined') {
        console.warn('⏳ Firebase SDK ainda não carregou, aguardando...');
        setTimeout(initializeFirebase, 100);
        return;
    }

    try {
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }
        console.log('✅ Firebase inicializado com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao inicializar Firebase:', error);
        console.error('Verifique se as credenciais em firebase-config.js estão corretas');
    }
}

// Chama a inicialização
initializeFirebase();

// Define regras de segurança do Firestore (TESTE APENAS - mude em produção!)
// Quando criar o Firestore Database, use essas regras na aba "Regras":
/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permite leitura/escrita apenas de documentos do usuário autenticado
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
  }
}
*/

console.log('Firebase Config carregado');

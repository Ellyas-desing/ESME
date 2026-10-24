# ESME

Vitrine web de produtos para casa inteligente, feita com React Native, TypeScript, Expo e Expo Router.

## Executar no navegador

```bash
npm install
npm run web
```

O site é exportado como app web sem renderização no servidor para evitar divergências de hidratação entre o navegador e o Expo.

## Telas

- **Início:** apresenta a marca e as categorias em destaque.
- **Loja:** mostra produtos e permite filtrar por categoria.
- **Detalhes:** abre as informações do produto escolhido.
- **Entrar:** autenticação por e-mail e senha do Firebase, com sessão persistente e opção de mostrar ou ocultar a senha.

O catálogo é de demonstração; os espaços das imagens estão prontos para receber os arquivos dos produtos.

## Configurar o Firebase

1. Copie `.env.example` para `.env.local` e preencha os dados de configuração do app Web do Firebase.
2. No Firebase Console, ative **Authentication > Sign-in method > E-mail/Senha**.
3. Reinicie o Expo depois de alterar as variáveis de ambiente.

O login usa Firebase Authentication. Senhas não são consultadas nem armazenadas no Realtime Database; contas existentes somente no nó `usuario` precisam ser cadastradas no Authentication. Não coloque senhas de usuários em arquivos `.env` ou no código.

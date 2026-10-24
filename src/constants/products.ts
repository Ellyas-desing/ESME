export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
};

export const categories = ['Todos', 'Segurança', 'Iluminação', 'Energia'];

export const products: Product[] = [
  {
    id: '1',
    name: 'Fechadura Smart F-Pro',
    category: 'Segurança',
    price: 'R$ 899,00',
    description:
      'Acesso por biometria, senhas temporárias e aplicativo. Estrutura resistente com vidro temperado e alerta anti-arrombamento.',
  },
  {
    id: '2',
    name: 'Câmera Mibo 360º',
    category: 'Segurança',
    price: 'R$ 349,00',
    description:
      'Monitoramento em tempo real Full HD com detecção de movimento e áudio bidirecional.',
  },
  {
    id: '3',
    name: 'Lâmpada LED Smart',
    category: 'Iluminação',
    price: 'R$ 89,00',
    description:
      'Iluminação personalizável com 16 milhões de cores, comando de voz e programação de rotinas.',
  },
  {
    id: '4',
    name: 'Tomada Inteligente',
    category: 'Energia',
    price: 'R$ 119,00',
    description:
      'Controle e acompanhe o consumo elétrico dos seus aparelhos pelo smartphone.',
  },
];

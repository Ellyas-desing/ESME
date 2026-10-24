export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  image: number;
};

export const categories = ['Todos', 'Limpeza', 'Segurança', 'Automação', 'Iluminação', 'Energia'];

export const products: Product[] = [
  {
    id: 'robo-aspirador',
    name: 'Robô aspirador com base',
    category: 'Limpeza',
    price: 'R$ 1.200,00',
    description:
      'Robô aspirador com base de carregamento para apoiar a rotina de limpeza da casa.',
    image: require('@/assets/images/product-robot-vacuum.png'),
  },
  {
    id: 'camera-externa',
    name: 'Câmera externa Wi-Fi',
    category: 'Segurança',
    price: 'R$ 176,00',
    description:
      'Câmera Wi-Fi externa com corpo móvel e antenas para acompanhar áreas do lado de fora.',
    image: require('@/assets/images/product-outdoor-camera.png'),
  },
  {
    id: 'controle-infravermelho',
    name: 'Controle universal i2GO',
    category: 'Automação',
    price: 'R$ 101,15',
    description:
      'Controle universal infravermelho para centralizar o comando de aparelhos compatíveis em um único dispositivo.',
    image: require('@/assets/images/product-infrared-hub.png'),
  },
  {
    id: 'fechadura-digital',
    name: 'Fechadura digital Kuanttum',
    category: 'Segurança',
    price: 'R$ 325,00',
    description:
      'Fechadura digital com teclado numérico e leitura biométrica integrada à maçaneta.',
    image: require('@/assets/images/product-smart-lock.png'),
  },
  {
    id: 'lampada-rgb',
    name: 'Lâmpada inteligente RGB',
    category: 'Iluminação',
    price: 'R$ 63,00',
    description:
      'Lâmpada LED inteligente com iluminação RGB para colorir e personalizar seus ambientes.',
    image: require('@/assets/images/product-rgb-bulb.png'),
  },
  {
    id: 'interruptor-inteligente',
    name: 'Interruptor touch com tomada',
    category: 'Energia',
    price: 'R$ 185,00',
    description:
      'Interruptor inteligente de parede com painel touch e tomada integrada.',
    image: require('@/assets/images/product-touch-switch.png'),
  },
];

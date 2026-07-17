# Especificações Técnicas de Implementação: Engaslider 2.0

Esta especificação técnica detalha a arquitetura final e os componentes implementados no **Engaslider 2.0**. O projeto foi modernizado para seguir padrões de mercado (como Swiper.js e Slick), dividindo-se em uma arquitetura limpa de **CSS Headless/Modular** e **JavaScript Orientado a Objetos (ES6)**.

---

## 1. Arquitetura Física e Estrutura de Arquivos

A base de código está organizada sob a seguinte estrutura na pasta `src/slider-min/`:

```
src/slider-min/
├── css/
│   ├── engaslider-core.css   <-- Layout estrutural e posicionamento (Headless)
│   ├── engaslider-theme.css  <-- Tema visual padrão (Cores, Bordas, Sombras)
│   └── slider-darkTheme.css  <-- Tema escuro customizado (Exemplo 3)
└── js/
    ├── engaslider.js         <-- Classe ES6 principal (Motor do Slider)
    └── slidershow.js         <-- Script legado para compatibilidade reversa
```

---

## 2. Especificação do Motor JavaScript (`Engaslider`)

Toda a inteligência do componente reside na classe `Engaslider` definida em [engaslider.js](file:///c:/Users/wsric/OneDrive/Documentos/GitHub/engaslider/src/slider-min/js/engaslider.js).

### A. Construtor e Parâmetros
O construtor aceita o seletor do container principal e um objeto opcional de configurações do usuário:

```javascript
new Engaslider(containerSelector, userOptions = {});
```

#### Opções de Configuração (`userOptions`):
- `autoplay` (boolean, padrão: `false`): Define se as transições devem ocorrer automaticamente.
- `speed` (number, padrão: `3000`): O tempo em milissegundos que cada slide é exibido. Aceita o alias legado `timespeed` como fallback.
- `loop` (boolean, padrão: `true`): Define se o slider deve retornar ao primeiro item após o último, em um loop circular infinito.

### B. Métodos Públicos
- `init()`: Mapeia elementos do DOM, configura atributos de acessibilidade, anexa ouvintes de eventos e inicia o autoplay.
- `mvImage(direction)`: Avança (`1`) ou retrocede (`-1`) imagens, recalculando índices e reiniciando o loop de autoplay para evitar interrupções precoces.
- `goToSlide(index)`: Navega diretamente para a imagem no índice informado (base zero).
- `startAutoplay()` / `stopAutoplay()` / `resetAutoplay()`: Controladores do temporizador.
- `destroy()`: Desmonta o componente com segurança. Remove todos os event listeners, para o autoplay e limpa referências a nós DOM, evitando vazamentos de memória.

### C. Eventos Customizados
A classe dispara o evento `slideChange` nativamente no nó HTML do container principal do slider. A propriedade `detail` contém o índice ativo atual:

```javascript
// Exemplo de captura de evento customizado
document.querySelector('#slider').addEventListener('slideChange', (event) => {
    const activeIndex = event.detail.activeIndex;
    console.log(`Slide mudou para o índice: ${activeIndex}`);
});
```

---

## 3. Especificações Visuais (CSS Headless/Modular)

### A. Arquivo Estrutural: [engaslider-core.css](file:///c:/Users/wsric/OneDrive/Documentos/GitHub/engaslider/src/slider-min/css/engaslider-core.css)
- Configura o modelo de caixa (`box-sizing: border-box`).
- Define posicionamentos de layout (flexbox) para miniaturas verticais (`.slider-main-thumbnail`) e horizontais (`.slider-main-thumbnail-horizontal`).
- Posiciona de forma absoluta as setas de navegação (`.slider-previous-button`, `.slider-next-button`).
- Controla a proporção das imagens e esconde slides inativos (`display: none`).

### B. Arquivo Estético: [engaslider-theme.css](file:///c:/Users/wsric/OneDrive/Documentos/GitHub/engaslider/src/slider-min/css/engaslider-theme.css)
Declara variáveis CSS prefixadas para fácil customização através do bloco `:root`:

```css
:root {
  --engaslider-bg-color: whitesmoke;       /* Cor de fundo do container */
  --engaslider-body-bg: #ddd;             /* Cor do body do exemplo */
  --engaslider-container-bg: white;        /* Fundo dos painéis */
  --engaslider-border-color: #adababab;   /* Borda das sombras */
  --engaslider-shadow-color: rgba(7, 7, 7, 0.48); /* Cor da sombra */
  --engaslider-caption-color: black;      /* Cor da legenda */
  --engaslider-button-color: #ffffffa9;   /* Cor das setas de navegação */
  --engaslider-button-hover-bg: rgba(0, 0, 0, 0.4); /* Hover das setas */
  --engaslider-dot-bg: #aaa;              /* Fundo das bolinhas */
  --engaslider-dot-active-bg: #777;       /* Fundo da bolinha ativa */
  --engaslider-thumb-active-border: 3px solid #ddd; /* Borda da miniatura ativa */
  --engaslider-transition-speed: 0.3s;    /* Velocidade da transição de escala/opacidade */
}
```

- **Transição Acelerada por Hardware**: A transição padrão dos slides (`engaslider-fade-zoom`) aplica animação combinada de opacidade e escala para suavidade de visualização.
- **Escala de Dots**: O dot ativo é escalado para `transform: scale(1.4)` via GPU em vez de mudar o padding, evitando reflow do layout.

---

## 4. Especificações de Acessibilidade (a11y)

Para atender aos padrões semânticos de acessibilidade (WCAG/WAI-ARIA), o script injeta em tempo de execução:
- `role="region"` com `aria-roledescription="carousel"` e `aria-live="polite"` no container do slider.
- `role="button"` e `aria-label` nas setas direcionais e miniaturas.
- `aria-selected` (sendo `true` ou `false`) dinâmico nos dots indicadores de página.

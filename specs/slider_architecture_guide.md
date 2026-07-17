# Guia de Arquitetura Moderna para Sliders (Vanilla JS & CSS Puro)

Este guia serve como referência para o desenvolvimento de bibliotecas UI (como o **Engaslider**) baseadas nas melhores práticas de mercado (utilizadas por gigantes como o Swiper.js). O objetivo é garantir máxima flexibilidade, performance e facilidade de manutenção usando **apenas JavaScript e CSS puros**, sem bibliotecas de terceiros.

---

## 1. Solução Baseada em Variáveis CSS (Custom Properties)

### O Conceito
Transferir a responsabilidade do design visual (cores, tamanhos fixos, transições) do JavaScript para o CSS através de variáveis. O JS nunca deve injetar cores como `element.style.backgroundColor = 'red'`. 

### A Implementação
No arquivo CSS principal do seu plugin, você define as variáveis no seletor `:root` (ou com escopo na classe principal do plugin). É importante usar um prefixo único (ex: `--engaslider-`) para não conflitar com variáveis do projeto do usuário.

```css
/* engaslider-theme.css */

/* 1. Definição das variáveis padrão (Fallbacks) */
:root {
  --engaslider-theme-color: #777;
  --engaslider-bg-color: whitesmoke;
  --engaslider-nav-size: 16px;
  --engaslider-transition-speed: 0.5s;
}

/* 2. Aplicação das variáveis na estrutura */
.slider-main-container {
  background-color: var(--engaslider-bg-color);
}

.slider-dots-nav {
  width: var(--engaslider-nav-size);
  height: var(--engaslider-nav-size);
  background-color: #bbb; /* Cor inativa fixa ou por variável */
  transition: background-color var(--engaslider-transition-speed) ease;
}

.slider-dots-nav.active {
  background-color: var(--engaslider-theme-color);
}
```

> [!TIP]
> **Como o usuário customiza:** O desenvolvedor final não precisará tocar no seu JavaScript. No arquivo CSS do projeto dele, ele apenas fará:
> `:root { --engaslider-theme-color: #ff0000; }`

---

## 2. Configuração via JavaScript (Options Object)

### O Conceito
O JavaScript deve lidar estritamente com **comportamento** (lógica, matemática e estrutura), e não com estética. Para permitir flexibilidade, a classe principal deve receber um objeto de "Opções" (`options`) no construtor.

### A Implementação (Vanilla JS)
Usamos Classes ES6 e a funcionalidade `Object.assign` ou desestruturação para mesclar opções padrão com as opções do usuário.

```javascript
// engaslider.js

class Engaslider {
  constructor(selector, userOptions = {}) {
    this.container = document.querySelector(selector);
    
    // 1. Definição dos valores padrão (Defaults)
    const defaultOptions = {
      autoplay: false,
      speed: 3000,
      loop: true,
      showThumbnails: false
    };

    // 2. Mesclando padrões com as escolhas do usuário
    this.options = { ...defaultOptions, ...userOptions };

    this.slideIndex = 0;
    this.init();
  }

  init() {
    // A lógica de inicialização usa apenas o THIS.OPTIONS
    if (this.options.autoplay) {
      this.startAutoPlay();
    }
    
    // Configura os ouvintes de eventos (listeners) dinamicamente
    this.bindEvents();
  }

  startAutoPlay() {
    setInterval(() => this.next(), this.options.speed);
  }
  
  // ... resto da lógica (next, prev, bindEvents)
}
```

> [!NOTE]
> **Estilos Inline Temporários no JS:** O único momento em que o JS deve usar propriedades `style` (ex: `element.style.transform`) é para calcular distâncias na tela, como deslocamento de pixels durante uma animação (ex: `transform: translateX(-100%)`).

---

## 3. Arquitetura Modular de Estilos (Design Headless)

### O Conceito
Separar radicalmente o que é "estilo estrutural vital" daquilo que é "perfumaria visual". Isso permite que usuários avançados construam visuais 100% originais sem lutar contra o código CSS do plugin.

### A Implementação
O plugin fornecerá dois (ou mais) arquivos CSS:

#### Arquivo A: `engaslider-core.css`
Contém apenas o que faz o motor funcionar e quebrar se for retirado. Não possui cores, sombras ou bordas arredondadas.

```css
/* engaslider-core.css */
.slider-main-container {
  display: flex;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
}

.slider-image {
  flex-shrink: 0;
  width: 100%; /* Força cada slide a ter 100% do container */
  /* display: none / block para fading, ou position absolute, dependendo da sua engine */
}
```

#### Arquivo B: `engaslider-theme.css`
Contém o visual. O usuário importa isso apenas se quiser o slider pronto para uso e bonito desde o início.

```css
/* engaslider-theme.css (Requer o core) */
.slider-mold-basic {
  border: 8px solid white;
  border-radius: 6px;
  box-shadow: 2px 2px 4px 4px rgba(7, 7, 7, 0.48);
}
```

#### Arquivos de Módulos (Opcional):
Se o slider possuir paginação (dots) ou miniaturas, é recomendável que isso fique em arquivos separados como `engaslider-navigation.css`.

---

## 4. Como Unir Tudo (O Fluxo de Uso Moderno)

Com as 3 soluções aplicadas, veja como outro desenvolvedor consumiria o seu projeto profissionalmente no arquivo `index.html` dele:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <!-- 1. Importa a estrutura base (Modular) -->
  <link rel="stylesheet" href="engaslider-core.css">
  <!-- 2. Importa o tema padrão (Modular) -->
  <link rel="stylesheet" href="engaslider-theme.css">
  
  <style>
    /* 3. Customização via Variáveis CSS (Sem tocar no JS) */
    :root {
      --engaslider-theme-color: #007bff; /* Bolinhas azuis ao invés de cinzas */
    }
  </style>
</head>
<body>

  <!-- Estrutura limpa, sem onclick="...", sem IDs duplicados -->
  <div class="engaslider slider-mold-basic">
    <!-- Imagens... -->
  </div>

  <script src="engaslider.js"></script>
  <script>
    // 4. Configuração via Objeto JavaScript (Opções Lógicas)
    const meuSlider = new Engaslider('.engaslider', {
      autoplay: true,
      speed: 5000 // 5 segundos
    });
  </script>
</body>
</html>
```

## Resumo das Melhores Práticas
* **Regra de Ouro do CSS:** Nunca defina cores, bordas, sombras ou fontes dentro do seu arquivo JavaScript.
* **Regra de Ouro do JS:** O código deve assumir que o usuário pode querer dois sliders na mesma página. Use Classes e instâncias fechadas em seus próprios seletores (`this.container.querySelectorAll(...)` e nunca `document.querySelectorAll(...)`).
* **Regra de Ouro do HTML:** Forneça a marcação mais enxuta possível e faça o JavaScript amarrar a funcionalidade nos bastidores.

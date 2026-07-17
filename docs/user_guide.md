# Manual de Uso Geral: Engaslider 2.0

O **Engaslider 2.0** é um plugin leve, rápido e moderno para criação de carrosséis e sliders de imagens responsivos. Construído com **Vanilla JS (JavaScript Puro)** e **CSS Puro**, ele não possui nenhuma dependência de terceiros (zero dependências) e foi desenvolvido sob o conceito de *Design Headless/Modular*.

Este guia ensinará você a integrar, configurar e estender o Engaslider no seu projeto.

---

## 1. Instalação e Integração

Para começar a usar o Engaslider, basta baixar e incluir os arquivos de estilo e script na sua página HTML.

### Links de Importação
No cabeçalho (`<head>`) do seu HTML, adicione os arquivos CSS:
```html
<!-- Estrutura física essencial (obrigatório) -->
<link rel="stylesheet" href="src/slider-min/css/engaslider-core.css">

<!-- Tema visual padrão com as cores e sombras (opcional, mas recomendado) -->
<link rel="stylesheet" href="src/slider-min/css/engaslider-theme.css">
```

Antes de fechar a tag `</body>`, inclua o arquivo JavaScript principal:
```html
<!-- Motor principal em classe ES6 -->
<script src="src/slider-min/js/engaslider.js"></script>
```

---

## 2. Estrutura HTML Recomendada

O Engaslider mapeia o DOM através de seletores de classes estruturadas. A estrutura básica recomendada deve seguir a hierarquia abaixo:

```html
<div id="meu-slider" class="slider-main-container slider-mold-basic">
    <!-- Bloco Opcional: Painel de Miniaturas -->
    <div class="slider-main-thumbnail">
        <img src="imgs/mini-01.jpg" alt="Miniatura 1">
        <img src="imgs/mini-02.jpg" alt="Miniatura 2">
    </div>

    <!-- Bloco Obrigatório: Área Principal do Carrossel -->
    <div class="slider-container">
        
        <!-- Slide 1 -->
        <div class="slider-image">
            <img src="imgs/01.jpg" style="width: 100%;" alt="Slide 1">
            <div class="slider-text-caption">Legenda descritiva do slide 1</div>
        </div>

        <!-- Slide 2 -->
        <div class="slider-image">
            <img src="imgs/02.jpg" style="width: 100%;" alt="Slide 2">
            <div class="slider-text-caption">Legenda descritiva do slide 2</div>
        </div>

        <!-- Botões de Navegação das Setas (Opcional) -->
        <a class="slider-previous-button">&#10094;</a>
        <a class="slider-next-button">&#10095;</a>

        <!-- Bloco de Paginação por Dots/Bolinhas (Opcional) -->
        <!-- O número de divs .slider-dots-nav deve bater com o número de slides -->
        <div class="slider-dots-nav"></div>
        <div class="slider-dots-nav"></div>
    </div>
</div>
```

---

## 3. Inicialização no JavaScript

Após carregar o DOM, você pode instanciar o slider informando o seletor ID ou classe do container pai e um objeto de opções.

```javascript
document.addEventListener("DOMContentLoaded", function() {
    const slider = new Engaslider("#meu-slider", {
        autoplay: true, // Inicia rotação automática
        speed: 3000,    // Exibe cada imagem por 3 segundos (3000ms)
        loop: true      // Retorna ao início ao chegar no último slide
    });
});
```

### Opções de Inicialização

| Opção | Tipo | Valor Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `autoplay` | Boolean | `false` | Se ativo (`true`), o slider rotaciona os slides automaticamente de tempos em tempos. |
| `speed` | Number | `3000` | O intervalo de tempo (em milissegundos) para exibição de cada imagem. (*Aceita o parâmetro antigo `timespeed` como fallback*). |
| `loop` | Boolean | `true` | Habilita a navegação infinita. Quando desativado, o slider trava na primeira imagem (ao voltar) ou na última imagem (ao avançar). |

---

## 4. Métodos e APIs Dinâmicas

Se você precisar controlar o slider de forma programática ou integrá-lo em aplicações SPA modernas (React, Vue, etc.), pode utilizar a API pública da instância:

### Mudar de Slide Manualmente
```javascript
// Avança 1 slide
slider.mvImage(1);

// Retrocede 1 slide
slider.mvImage(-1);

// Pula diretamente para o slide de índice 3 (base zero)
slider.goToSlide(3);
```

### Controlar o Temporizador
```javascript
// Para o autoplay temporariamente
slider.stopAutoplay();

// Retoma o autoplay
slider.startAutoplay();
```

### Ouvir Mudanças de Slide (Eventos Customizados)
O Engaslider dispara o evento `slideChange` nativamente sempre que uma transição ocorre. Você pode anexar escutadores no próprio container do slider:

```javascript
const sliderEl = document.querySelector('#meu-slider');
sliderEl.addEventListener('slideChange', function(e) {
    const slideAtual = e.detail.activeIndex;
    console.log("O slide mudou para o índice: " + slideAtual);
});
```

### Desmontagem de Instância (Evitando Vazamentos de Memória)
Se você estiver removendo o slider do DOM dinamicamente, execute o método `.destroy()` para limpar todos os ouvintes de clique e cronômetros ativos da memória:

```javascript
// Destrói timers e desvincula os eventos de cliques nos botões
slider.destroy();
```

---

## 5. Customização e Variáveis CSS

Toda a parte de cores, efeitos de hover, bordas e transições são mapeadas por variáveis CSS customizadas declaradas no `:root` do tema. Você pode sobrescrevê-las em seu arquivo CSS local para criar designs totalmente diferentes sem alterar a estrutura física central.

```css
/* Exemplo de sobrescrita local de tema */
#meu-slider {
  --engaslider-bg-color: #1e1e1e;          /* Fundo escuro */
  --engaslider-caption-color: #fff;        /* Texto de legenda branca */
  --engaslider-button-color: #ff6b6b;      /* Setas em tom avermelhado */
  --engaslider-dot-active-bg: #ff6b6b;     /* Dot ativo vermelho */
  --engaslider-transition-speed: 0.5s;     /* Transição mais suave (0.5s) */
}
```

---

## 6. Acessibilidade (a11y) Integrada

O Engaslider atribui automaticamente atributos fundamentais do padrão **W3C WAI-ARIA** para leitura acessível por leitores de tela:
- `role="region"` com `aria-roledescription="carousel"` demarcando a seção.
- `aria-live="polite"` que avisa o leitor sobre a troca de slides sem interromper a fala principal.
- `role="button"` e `aria-label` descritivos atribuídos dinamicamente para setas, miniaturas e dots.
- `aria-selected="true/false"` atualizado no dot ativo em tempo real.

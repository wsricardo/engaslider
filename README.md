# Engaslider 2.0

Plugin leve e moderno para criação de sliders de imagem responsivos utilizando apenas **JavaScript Puro (Vanilla JS)** e **CSS Puro**, sem nenhuma dependência externa (Zero Dependencies).

![Screenshot do slider](screenshots/screenshot1.jpg)
![Screenshot do slider v0.2](screenshots/engaslider2.jpg)

---

## 🚀 Novidades na versão 2.0

O projeto foi totalmente reformulado para atender às melhores práticas modernas de desenvolvimento web:
- **Programação Orientada a Objetos (POO)**: Toda a lógica estruturada antiga foi encapsulada na classe ES6 `Engaslider`.
- **Isolamento de Escopo**: Múltiplas instâncias do slider podem rodar na mesma página sem conflitos de variáveis globais.
- **HTML Limpo**: Remoção completa de eventos inline (`onclick`, `onload`). Toda a atribuição de escutas é feita dinamicamente no JS.
- **Temas e Customização com CSS Variables**: O design agora é controlado por propriedades customizadas CSS (`:root`), facilitando a alteração de cores, transições e bordas sem tocar na lógica do script.
- **API de Eventos & Destruição**: Métodos integrados para desmontagem limpa e eventos customizados (`slideChange`).

---

## 🛠️ Como Utilizar

### 1. Estrutura HTML Necessária
O slider precisa de uma estrutura de classes específicas dentro de um container principal:

```html
<div id="meu-slider-container" class="slider-main-container slider-mold-basic">
    <!-- Miniaturas (Opcional) -->
    <div class="slider-main-thumbnail">
        <img src="thumbnails/01.jpg" alt="Miniatura 1">
        <img src="thumbnails/02.jpg" alt="Miniatura 2">
    </div>

    <!-- Container do Slider Principal -->
    <div class="slider-container">
        <!-- Slides -->
        <div class="slider-image">
            <img src="imgs/01.jpg" style="width:100%;" alt="Imagem 1">
            <div class="slider-text-caption">Legenda da Imagem 1</div>
        </div>
        <div class="slider-image">
            <img src="imgs/02.jpg" style="width:100%;" alt="Imagem 2">
            <div class="slider-text-caption">Legenda da Imagem 2</div>
        </div>

        <!-- Botões de Navegação (Anterior/Próximo) -->
        <a class="slider-previous-button">&#10094;</a>
        <a class="slider-next-button">&#10095;</a>

        <!-- Paginação por Dots (Bolinhas) -->
        <div class="slider-dots-nav"></div>
        <div class="slider-dots-nav"></div>
    </div>
</div>
```

### 2. Incluir CSS e JS (Modular)
Importe a estrutura funcional básica (`core`) e o tema visual padrão (`theme`):

```html
<link rel="stylesheet" href="src/slider-min/css/engaslider-core.css">
<link rel="stylesheet" href="src/slider-min/css/engaslider-theme.css">
<script src="src/slider-min/js/engaslider.js"></script>
```

### 3. Inicializar o Slider
Instancie o slider informando o seletor do container principal e as opções desejadas:

```html
<script>
    document.addEventListener("DOMContentLoaded", function() {
        const slider = new Engaslider("#meu-slider-container", {
            autoplay: true,      // Transição automática (true/false)
            speed: 3000,         // Tempo por slide em milissegundos (padrão: 3000)
            loop: true           // Rotação infinita (padrão: true)
        });
    });
</script>
```

---

## 🎨 Customização de Estilos (CSS Variables)

Você pode personalizar o visual do slider definindo variáveis no seu próprio arquivo CSS ou alterando o bloco `:root` no seu tema:

```css
:root {
  --engaslider-bg-color: whitesmoke;       /* Fundo do container principal */
  --engaslider-body-bg: #ddd;             /* Fundo do body da página */
  --engaslider-container-bg: white;        /* Fundo dos painéis e thumbnails */
  --engaslider-border-color: #adababab;   /* Cor de borda da moldura */
  --engaslider-shadow-color: rgba(7, 7, 7, 0.48); /* Cor da sombra */
  --engaslider-caption-color: black;      /* Cor da legenda de texto */
  --engaslider-button-color: #ffffffa9;   /* Cor das setas de navegação */
  --engaslider-button-hover-bg: rgba(0, 0, 0, 0.4); /* Fundo da seta no hover */
  --engaslider-dot-bg: #aaa;              /* Cor padrão das bolinhas (dots) */
  --engaslider-dot-active-bg: #777;       /* Cor da bolinha ativa */
  --engaslider-thumb-active-border: 3px solid #ddd; /* Borda da miniatura ativa */
  --engaslider-transition-speed: 0.3s;    /* Tempo das transições de fade/escala */
}
```

---

## 📂 Exemplos Disponíveis no Projeto

A pasta `/examples` contém demonstrações práticas dos diversos modos de uso da arquitetura modular:
1. **[index.html](examples/index.html)**: Demonstração clássica com o tema visual padrão.
2. **[example1.html](examples/example1.html)**: Configuração de miniaturas alinhadas horizontalmente no topo do slider.
3. **[example2.html](examples/example2.html)**: Slider simples (Design Headless), carregando apenas o arquivo `engaslider-core.css` e customizando estilos em um bloco de estilo isolado.
4. **[example3.html](examples/example3.html)**: Integração com o tema escuro customizado (`slider-darkTheme.css`).
5. **[example4.html](examples/example4.html)**: Múltiplas instâncias independentes rodando em paralelo sem colisão de escopo.
6. **[example5.html](examples/example5.html)**: Navegação avançada via setas do teclado e transição suave de zoom aplicada via CSS GPU.
7. **[example6.html](examples/example6.html)**: Slider integrado de portal de notícias com uma caixa lateral contendo manchete, descrição e links de leitura dinâmicos (Layout News Hero).
8. **[example7.html](examples/example7.html)**: Galeria minimalista sem dots indicativos de navegação, focada inteiramente na imagem.
9. **[example8.html](examples/example8.html)**: Barra fina de topo promocional de e-commerce integrada a um cabeçalho web realístico.
10. **[example9.html](examples/example9.html)**: Banner de luxo responsivo de tela cheia (100vh) com animações dinâmicas e efeito parallax suave (Ken Burns).

---

## 🧑‍💻 Guia do Desenvolvedor & Extensibilidade

Para entender melhor os fluxos internos de inicialização, escutar eventos customizados (`slideChange`), destruir instâncias (`destroy()`) ou estender com novos recursos (swipe mobile, navegação por teclado, transições 3D), confira o nosso **[Guia do Desenvolvedor](docs/developer_guide.md)**.

---

## 📝 Licença

Este projeto é distribuído sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para obter mais informações.

Desenvolvido por **Wandeson Ricardo** - [Blog: wsricardo.blogspot.com](https://wsricardo.blogspot.com/search/label/techcodes)

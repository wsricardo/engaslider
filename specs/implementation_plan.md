# Especificações Técnicas de Implementação: Engaslider 2.0

Esta especificação técnica traduz as melhorias sugeridas em um plano de ação concreto. O objetivo é modernizar o código base do projeto mantendo suas dependências em zero (Vanilla JS / CSS Puro).

## Visão Geral das Mudanças

As mudanças abrangem três focos principais:
1. **Refatoração do JavaScript para POO (Programação Orientada a Objetos):** Eliminação de variáveis globais.
2. **Separação de Preocupações no HTML/JS:** Remoção de eventos inline (ex: `onclick`) no HTML.
3. **Escalabilidade CSS:** Implementação de variáveis (Custom Properties) e separação de lógica estrutural e estética.

---

> [!IMPORTANT]
> **User Review Required:** Por favor, revise as mudanças de arquitetura abaixo. O novo formato mudará levemente a forma como você "chama" o slider no seu HTML. Verifique se o design da nova classe ES6 está de acordo com suas expectativas antes de iniciarmos a programação.

---

## Proposed Changes

Abaixo estão detalhados os arquivos que serão modificados, deletados ou criados.

---

### 1. Estrutura e Estilização (CSS)
Vamos atualizar o arquivo CSS para usar variáveis, facilitando a customização por terceiros.

#### [MODIFY] [slidershow.css](file:///c:/Users/wsric/OneDrive/Documentos/GitHub/engaslider/src/slider-min/css/slidershow.css)
- **Adição do bloco `:root`:**
  - Criação de variáveis para cores globais (Ex: `--slider-bg`, `--dot-active`, `--arrow-hover`).
- **Remoção de manipulação visual no JS:**
  - A cor das bolinhas (`dots`) e bordas das miniaturas hoje mudam pelo JS (`dotsNav[j].style.backgroundColor = "#777"`). O JS deverá apenas adicionar uma classe `.active`, e o CSS lidará com a mudança de cor baseada nas variáveis do `:root`.

---

### 2. Lógica Principal (JavaScript)
A mudança mais drástica ocorrerá no motor do slider.

#### [MODIFY] [slidershow.js](file:///c:/Users/wsric/OneDrive/Documentos/GitHub/engaslider/src/slider-min/js/slidershow.js)
- **Refatoração Total (Classes ES6):**
  - Todo o código atual (funções `initSlider`, `showImage`, `autoSlide`, variáveis globais) será descartado e substituído pela classe `Engaslider`.
- **Construtor Inteligente:**
  - `constructor(containerSelector, options = {})` - Aceitará o ID/Classe da DIV principal do slider e opções (autoplay, velocidade).
- **Injeção de Eventos Dinâmica:**
  - A classe possuirá um método `bindEvents()` que procurará os botões "próximo", "anterior", "miniaturas" e "bolinhas" *somente dentro* do `containerSelector` atual, adicionando `addEventListener('click')` neles dinamicamente.
- **Isolamento de Escopo:**
  - Todas as variáveis viram propriedades da classe (ex: `this.slideIndex`, `this.slides`).

---

### 3. Integração (HTML e Exemplos)
Os arquivos de exemplo precisarão ser atualizados para testar e refletir o novo modelo de uso limpo.

#### [MODIFY] [index.html](file:///c:/Users/wsric/OneDrive/Documentos/GitHub/engaslider/examples/index.html)
- **Remoção de Inlines:**
  - Retirada de todos os `onclick="..."` das miniaturas, setas e dots.
  - Retirada do `onload="initSlider(0)"` na tag `<script>`.
- **Nova Instanciação:**
  - Adição de um pequeno bloco `<script>` no final do arquivo:
    ```javascript
    document.addEventListener("DOMContentLoaded", function() {
        const meuSlider = new Engaslider("#slider-main-container", {
            autoplay: false
        });
    });
    ```

#### [MODIFY] [example1.html](file:///c:/Users/wsric/OneDrive/Documentos/GitHub/engaslider/examples/example1.html)
- Mesmas remoções e atualizações do `index.html`.
- Remoção corretiva final dos atributos `id="slider-image"` duplicados.

#### [MODIFY] [example2.html](file:///c:/Users/wsric/OneDrive/Documentos/GitHub/engaslider/examples/example2.html)
- Mesmas remoções e atualizações.
- Instanciação do slider com `autoplay: true`.

---

## Verification Plan
Se aprovado, o plano seguirá com as seguintes validações:

### Testes Manuais
- Abriremos `index.html`, `example1.html` e `example2.html` para confirmar que a navegação por setas, bolinhas e miniaturas funciona perfeitamente.
- Validaremos se o console do navegador não apresenta erros de colisão de variáveis.
- (Opcional) Poderemos duplicar um slider na mesma página do `index.html` para provar que a refatoração para Classes isolou com sucesso a lógica (um não interfere no outro).

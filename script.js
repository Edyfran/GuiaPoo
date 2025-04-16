document.addEventListener('DOMContentLoaded', function() {
    // Gerenciar módulos colapsáveis
    const moduleTitles = document.querySelectorAll('.module-title');
    
    moduleTitles.forEach(title => {
        title.addEventListener('click', function() {
            // Toggle a classe 'active' no elemento irmão (module-items)
            const moduleItems = this.nextElementSibling;
            moduleItems.classList.toggle('active');
            
            // Atualizar o ícone de expansão/colapso
            const icon = this.querySelector('.icon');
            if (moduleItems.classList.contains('active')) {
                icon.textContent = '−'; // Sinal de menos para módulo expandido
            } else {
                icon.textContent = '+'; // Sinal de mais para módulo colapsado
            }
        });
    });
    
    // Gerenciar o botão de execução do código
    const executeButtons = document.querySelectorAll('.execute-btn');
    
    executeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.closest('.code-block');
            const output = codeBlock.querySelector('.code-output');
            
            // Mostrar a saída se estiver escondida
            if (output.style.display === 'none' || !output.style.display) {
                output.style.display = 'block';
                this.textContent = 'Ocultar Saída';
            } else {
                output.style.display = 'none';
                this.textContent = 'Executar >';
            }
        });
    });
    
    // Gerenciar o menu mobile
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            const sidebarNav = document.querySelector('.sidebar-nav');
            sidebarNav.classList.toggle('show');
            
            if (sidebarNav.classList.contains('show')) {
                this.textContent = 'Fechar Menu';
            } else {
                this.textContent = 'Menu';
            }
        });
    }
    
    // Marcar o link ativo com base na URL atual
    const currentUrl = window.location.pathname;
    const sidebarLinks = document.querySelectorAll('.module-items a');
    
    sidebarLinks.forEach(link => {
        if (link.getAttribute('href') === currentUrl) {
            link.classList.add('active');
            
            // Expandir o módulo que contém o link ativo
            const moduleItems = link.closest('.module-items');
            moduleItems.classList.add('active');
            
            // Atualizar o ícone do módulo
            const moduleTitle = moduleItems.previousElementSibling;
            const icon = moduleTitle.querySelector('.icon');
            if (icon) {
                icon.textContent = '−';
            }
        }
    });
    
    // Função para carregar conteúdo dinamicamente (opcional)
    function loadContent(url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.querySelector('.content').innerHTML = data;
                // Reinicializar os botões de execução para o novo conteúdo
                initializeExecuteButtons();
            })
            .catch(error => {
                console.error('Erro ao carregar o conteúdo:', error);
            });
    }
    
    function initializeExecuteButtons() {
        const executeButtons = document.querySelectorAll('.execute-btn');
        
        executeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const codeBlock = this.closest('.code-block');
                const output = codeBlock.querySelector('.code-output');
                
                if (output.style.display === 'none' || !output.style.display) {
                    output.style.display = 'block';
                    this.textContent = 'Ocultar Saída';
                } else {
                    output.style.display = 'none';
                    this.textContent = 'Executar >';
                }
            });
        });
    }
    
    // Opcional: Adicionar sintaxe highlighting para blocos de código
    // Se você incluir uma biblioteca como highlight.js ou Prism
    if (typeof hljs !== 'undefined') {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });
    }
}); 
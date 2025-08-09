document.addEventListener('DOMContentLoaded', function() {
  // Atualiza o ano atual no footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Inicializa o particles.js
  if (typeof particlesJS !== 'undefined') {
    particlesJS.load('particles-bg', 'assets/particles-config.json');
  }
  
  // Observador de interseção para animações
  const sections = document.querySelectorAll('section');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
        entry.target.classList.remove('section-hidden');
      }
    });
  }, { threshold: 0.1 });
  
  sections.forEach(section => {
    section.classList.add('section-hidden');
    sectionObserver.observe(section);
  });
  
  // FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentNode;
      item.classList.toggle('active');
      
      // Fecha outros itens quando um é aberto (comportamento accordion)
      if (item.classList.contains('active')) {
        document.querySelectorAll('.faq-item').forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });
      }
    });
  });
  
  // Filtro mobile para tabela comparativa
  if (window.innerWidth <= 767) {
    const table = document.querySelector('.comparison-table');
    if (table) {
      const headers = table.querySelectorAll('thead th:not(:first-child)');
      
      const filterContainer = document.createElement('div');
      filterContainer.className = 'mobile-filter';
      
      const select = document.createElement('select');
      select.innerHTML = '<option value="">Selecione um plano para comparar</option>';
      
      headers.forEach((header, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = header.textContent.trim();
        select.appendChild(option);
      });
      
      select.addEventListener('change', function() {
        const allColumns = table.querySelectorAll('th, td');
        allColumns.forEach(cell => cell.classList.remove('active-column'));
        
        if (this.value) {
          const selectedIndex = parseInt(this.value);
          const rows = table.querySelectorAll('tr');
          
          rows.forEach(row => {
            const cells = row.querySelectorAll('th, td');
            if (cells.length > selectedIndex) {
              cells[0].classList.add('active-column');
              cells[selectedIndex].classList.add('active-column');
            }
          });
        }
      });
      
      filterContainer.appendChild(select);
      table.parentNode.insertBefore(filterContainer, table);
      
      // Mostra a primeira coluna por padrão
      const firstRow = table.querySelector('tr');
      if (firstRow) {
        const firstCells = firstRow.querySelectorAll('th, td');
        if (firstCells.length > 1) {
          select.value = "1";
          select.dispatchEvent(new Event('change'));
        }
      }
    }
  }
  
  // Tooltips
  document.querySelectorAll('.tooltip').forEach(tooltip => {
    tooltip.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  });
  
  // Fecha tooltips ao clicar em qualquer lugar
  document.addEventListener('click', function() {
    document.querySelectorAll('.tooltip').forEach(tooltip => {
      tooltip.blur();
    });
  });
  
  // Lazy loading para iframes
  const lazyIframes = [].slice.call(document.querySelectorAll("iframe.lazy"));
  
  if ("IntersectionObserver" in window) {
    let lazyIframeObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyIframe = entry.target;
          lazyIframe.src = lazyIframe.dataset.src;
          lazyIframeObserver.unobserve(lazyIframe);
        }
      });
    });
    
    lazyIframes.forEach(function(lazyIframe) {
      lazyIframeObserver.observe(lazyIframe);
    });
  }
});

// Resize observer para recalcular filtro mobile
window.addEventListener('resize', function() {
  if (window.innerWidth > 767) {
    const table = document.querySelector('.comparison-table');
    if (table) {
      const allColumns = table.querySelectorAll('th, td');
      allColumns.forEach(cell => cell.classList.remove('active-column'));
      
      const filter = document.querySelector('.mobile-filter');
      if (filter) {
        filter.remove();
      }
    }
  } else if (window.innerWidth <= 767 && !document.querySelector('.mobile-filter')) {
    // Recria o filtro se redimensionar para mobile
    const table = document.querySelector('.comparison-table');
    if (table) {
      const headers = table.querySelectorAll('thead th:not(:first-child)');
      
      const filterContainer = document.createElement('div');
      filterContainer.className = 'mobile-filter';
      
      const select = document.createElement('select');
      select.innerHTML = '<option value="">Selecione um plano para comparar</option>';
      
      headers.forEach((header, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = header.textContent.trim();
        select.appendChild(option);
      });
      
      select.addEventListener('change', function() {
        const allColumns = table.querySelectorAll('th, td');
        allColumns.forEach(cell => cell.classList.remove('active-column'));
        
        if (this.value) {
          const selectedIndex = parseInt(this.value);
          const rows = table.querySelectorAll('tr');
          
          rows.forEach(row => {
            const cells = row.querySelectorAll('th, td');
            if (cells.length > selectedIndex) {
              cells[0].classList.add('active-column');
              cells[selectedIndex].classList.add('active-column');
            }
          });
        }
      });
      
      filterContainer.appendChild(select);
      table.parentNode.insertBefore(filterContainer, table);
      
      // Mostra a primeira coluna por padrão
      const firstRow = table.querySelector('tr');
      if (firstRow) {
        const firstCells = firstRow.querySelectorAll('th, td');
        if (firstCells.length > 1) {
          select.value = "1";
          select.dispatchEvent(new Event('change'));
        }
      }
    }
  }
});
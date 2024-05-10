document.addEventListener('DOMContentLoaded', function() {
    const imagesPerPage = 12;
    const images = document.querySelectorAll('.gallery-item');
    const pagination = document.getElementById('pagination');
    const modalImage = document.getElementById('modalImage');
    let currentImageIndex = 0;
  
    function setupPagination(images, wrapper, rowsPerPage) {
      wrapper.innerHTML = "";
      let pageCount = Math.ceil(images.length / rowsPerPage);
  
      for (let i = 1; i < pageCount + 1; i++) {
        let btn = paginationButton(i, images);
        wrapper.appendChild(btn);
      }
    }
  
    function paginationButton(page, images) {
      let button = document.createElement('li');
      button.classList.add('page-item');
      let link = document.createElement('a');
      link.href = 'javascript:void(0);';
      link.innerText = page;
      link.classList.add('page-link');
      link.addEventListener('click', function() {
        displayPage(images, page);
      });
      button.appendChild(link);
      return button;
    }
  
    function displayPage(images, page) {
      images.forEach(img => img.style.display = 'none'); // Oculta todas as imagens
      page--;
  
      let start = imagesPerPage * page;
      let end = start + imagesPerPage;
      let paginatedItems = Array.from(images).slice(start, end);
  
      paginatedItems.forEach(img => {
        img.style.display = 'block'; // Mostra apenas as imagens desta página
        img.addEventListener('click', () => {
          currentImageIndex = Array.from(images).indexOf(img);
          modalImage.src = img.src; // Define o src da imagem no modal
          new bootstrap.Modal(document.getElementById('imageModal')).show();
        });
      });
    }
  
    displayPage(images, 1); // Mostra a primeira página inicialmente
    setupPagination(images, pagination, imagesPerPage);
  
    document.querySelector('[data-bs-slide="prev"]').addEventListener('click', function() {
      if (currentImageIndex > 0) {
        currentImageIndex--;
      } else {
        currentImageIndex = images.length - 1;
      }
      modalImage.src = images[currentImageIndex].src;
    });
  
    document.querySelector('[data-bs-slide="next"]').addEventListener('click', function() {
      if (currentImageIndex < images.length - 1) {
        currentImageIndex++;
      } else {
        currentImageIndex = 0;
      }
      modalImage.src = images[currentImageIndex].src;
    });
  });
  
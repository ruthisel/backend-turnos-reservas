const socket = io();

// Escuchar evento de actualización de lista de servicios en tiempo real
socket.on('servicesUpdated', (services) => {
    const container = document.getElementById('servicesList');
    if (!container) return;

    container.innerHTML = services
        .map(
            (s) => `
    <div class="card" id="service-${s._id}">
      <h4>${s.name}</h4>
      <p><strong>Descripción:</strong> ${s.description}</p>
      <p><strong>Duración:</strong> ${s.duration} min</p>
      <p><strong>Precio:</strong> $${s.price}</p>
      <p><strong>Categoría:</strong> ${s.category}</p>
      <p><strong>Estado:</strong> ${s.available
                    ? '<span class="badge-active">Disponible</span>'
                    : '<span class="badge-inactive">No disponible</span>'
                }</p>
    </div>
  `
        )
        .join('');
});

// Emitir evento al enviar el formulario
const form = document.getElementById('createServiceForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newService = {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            duration: Number(document.getElementById('duration').value),
            price: Number(document.getElementById('price').value),
            category: document.getElementById('category').value,
            available: true
        };

        socket.emit('newService', newService);
        form.reset();
    });
}
 // DASHBOARD CODES


 $('#how-to-play').click(function() {
    introJs().setOptions({
      steps: [{
        title: 'Bienvenido',
        intro: '¡Hola 👋 aprende a reciclar jugando!'
      },
      {
        element: document.querySelector('.start-button'),
        title: '¡Iniciar!',
        intro: 'Toca iniciar 🏁 para correr el modelo de inteligencia artifical que detecta tus botellas'
      },
      {
        title: '¡Detener!',
        element: document.querySelector('.stop-button'),
        intro: 'Toca detener 🛑 para parar el modelo de inteligencia artifical que detecta tus botellas'
      }]
    }).start();

  })

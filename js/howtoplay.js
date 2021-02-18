 // DASHBOARD CODES


 $('#how-to-play').click(function() {
    introJs().setOptions({
      steps: [{
        title: 'Bienvenido',
        intro: 'Hola 👋 te demostraremos usar...'
      },
      {
        element: document.querySelector('.start-button'),
        intro: 'This step focuses on an image'
      },
      {
        title: 'Farewell!',
        element: document.querySelector('.stop-button'),
        intro: 'And this is our final step!'
      }]
    }).start();

  })

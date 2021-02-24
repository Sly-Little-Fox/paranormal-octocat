document.addEventListener('DOMContentLoaded', async () => {
  document.addEventListener("dragenter", dragenter, false);
  document.addEventListener("dragover", dragover, false);
  document.addEventListener("drop", drop, false);

  function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function drop(e) {
    e.stopPropagation();
    e.preventDefault();
    document.querySelector('#drop').remove();
    var dt = e.dataTransfer;
    var files = dt.files;
    files[0].text().then(r => {
      const app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        transparent: true,
        resolution: window.devicePixelRatio || 1,
      });

      document.body.appendChild(app.view);

      const container = new PIXI.Container();

      app.stage.addChild(container);

      const rock = PIXI.Texture.from('rock.png');
      const ground = PIXI.Texture.from('ground.png');
      const grass = PIXI.Texture.from('grass.png');

      for (let y in JSON.parse(r)) {
        for (let x in JSON.parse(r)) {
          let block;
          if (JSON.parse(r)[x][y] === 'grass') {
            block = new PIXI.Sprite(grass);
          } else if (JSON.parse(r)[x][y] === 'rock') {
            block = new PIXI.Sprite(rock);
          } else {
            block = new PIXI.Sprite(ground);
          }
          // bunny = new PIXI.Sprite(ground);
          block.anchor.set(0.5);
          block.x = x * 100;
          block.y = y * 72;
          // bunny.y = Math.floor(i / 40) * 40;
          container.addChild(block);
        }
      }

      container.x = app.screen.width / 2;
      container.y = app.screen.height / 2;
      container.pivot.x = container.width / 2;
      container.pivot.y = container.height / 2;

      window.addEventListener('keypress', (e) => {
        e.preventDefault();
        switch (e.code) {
          case 'KeyW':
            container.y += 10;
            break;
          case 'KeyS':
            container.y -= 10;
            break;
          case 'KeyA':
            container.x += 10;
            break;
          case 'KeyD':
            container.x -= 10;
            break;
        }
      });
      window.addEventListener('resize', (e) => {
        app.renderer.resize(e.target.innerWidth, e.target.innerHeight);
      });
      // app.ticker.add(() => {
      // });
    });
  }
});
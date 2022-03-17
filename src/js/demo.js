
const passwordMinLength = 4; // TODO:

function createHashifyDiv(loginFieldsDiv) {
  const hashifyDiv = document.createElement('div');
  hashifyDiv.setAttribute('id', 'hashifyDiv');
  loginFieldsDiv.append(hashifyDiv);
  hashifyDiv.style.display = 'none';
}

function displayHashifyDiv() {
  const hashifyDiv = document.getElementById('hashifyDiv');
  if (hashifyDiv.style.display === 'block') {
    hashifyDiv.style.display = 'none';
  }
  else {
    hashifyDiv.style.display = 'block';
    regenAnimation();
  }
}

// Problema: A função recebe um hash, não uma string. Eu quero então pegar minha
// string e passar pelo hash e só depois criar o objeto.
function regenAnimation() {
  	const password = document.getElementById('passwordField').value;
    const username = document.getElementById('usernameField').value;
		const parent = "#hashifyDiv";
    if (document.getElementById('hashifyDiv').style.display === 'none') {
      return;
    }
		// Password vazio nao carrega animacao
		if (password === "" || username === "") {
			$(parent).empty()
			return;
		}
	  console.log(password)

    const hashAlgorithm = "SHA-256";
    const animation = hashify.seed(hash=password, salt=username, hashAlgorithm, "TEXT");
    animation.prepAnimation(parent, [1, 4], [2, 2],
        { ...DEFAULT_OPTS,
          loop: 0, // create infinite loop
          x: 0,
          y: 0,
          masks: {
            ...DEFAULT_OPTS.masks,
            animate: true,
            thinLine: true,
            movingLine: true
        }
      });

    const tl = new mojs.Timeline();
    tl.add(animation.timeline);
    tl.play();
}

const loginFieldsDiv = document.getElementById('loginFields');
createHashifyDiv(loginFieldsDiv);
const hashifyButton = document.getElementById('hashifyButton');
hashifyButton.addEventListener('click', displayHashifyDiv);
const passField = document.getElementById('passwordField');
passField.addEventListener('input', regenAnimation);
const usernameField = document.getElementById('usernameField');
usernameField.addEventListener('input', regenAnimation);

// TODO: A ideia 'e desenhar os objetos SVG em um canvas usando as informacoes
// que ja constam nos objetos. Depois, exportar isso como GIF usando uma lib.
// const exportButton = document.getElementById('exportButton');
// exportButton.addEventListener('click', exportToGIF);

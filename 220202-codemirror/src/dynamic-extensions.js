import Copy from 'clipboard-copy';
import { showPanel} from "@codemirror/panel";

function customPanel(view) {

	var templateEl = document.createElement('template');
	let html = `
		<div>
			<button style="margin: 4px 6px;" class="cm-button" name="prev" type="button">translate: PT to EN</button>
		<div>
	`;

	templateEl.innerHTML = html.trim();
	let containerEl = templateEl.content.firstChild;
	let buttonEl = containerEl.querySelector('button');

	buttonEl.addEventListener('click', async function(ev) {

		let text = view.state.doc.toString();

		let setDisabled = (el) => {

			el.style.opacity = 0.5;
			el.setAttribute('disabled', '');
		}

		let removeDisabled = (el) => {

			el.style.opacity = 1;
			el.removeAttribute('disabled');
		}

		try {
			setDisabled(ev.target);
			let response = await fetch('https://api-free.deepl.com/v2/translate', {
			    method: 'POST',
			    body: new URLSearchParams({
			    	text: text,
			    	auth_key: 'e85352e6-72e2-7250-3efb-de1247055fe1:fx',
			    	source_lang: 'PT',
			    	target_lang: 'EN-GB',
			    	tag_handling: 'xml',
			    })
			});

			let data = await response.json();
			let wasCopied = await Copy(JSON.stringify(data, null, 2));
			console.log(data)
			removeDisabled(ev.target);
		}
		catch(err) {
			alert(err.message)
			removeDisabled(ev.target);
		}


	})

  return {
    dom: containerEl,
    // update(update) {
    //   if (update.docChanged)
    //     dom.textContent = countWords(update.state.doc)
    // }
  }
}

export default function (editorViewInstance) {
	console.log('export default for dynamic module')

	let extensions = [
		showPanel.of(customPanel)
	];

	return extensions;
}

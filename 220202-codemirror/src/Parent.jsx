import React, { useState, useEffect, useRef } from 'react';

import Codemirror from './Codemirror.jsx';
import SomethingElse from './SomethingElse.jsx';

function Banner({ title, body }) {

	console.log('Banner component')
	debugger;
	let [isEditing, setIsEditing] = useState(false);
	let [prop1, setProp1] = useState(0);
	let [prop2, setProp2] = useState(10);
	let [doc, setDoc] = useState('initial doc');
	let [lang, setLang] = useState('html');
	let [theme, setTheme] = useState('light');

	function toggleEditor(ev) {

		setIsEditing(ie => !ie);
	}

	function changeDoc(ev) {

		let newDoc = `
${Date.now()}
<div class="fixed inset-x-0 bottom-0 bg-gray-500 py-8 text-white 2xl:pb-14 btn">

  <div class="flex justify-center">
    <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Loading...
  </div>
  
</div>


  		`;
  		debugger;
		setDoc(newDoc);
	}
	/*
	useEffect(function effect_0a() {

		let x1 = prop1;
		let x2 = prop2;

		console.log('Banner effect_0a', x1, x2)

		if (prop1 === 0 && prop2 === 10) {
			setTimeout(() => {

				console.log('Banner setTimeout 1', x1, x2)
				//setProp1(p1 => p1 + 1)
				setProp1(p1 => p1 + 1)
			}, 1000);
		}

		if (prop1 === 1 && prop2 === 10) {
			setTimeout(() => {

				console.log('Banner setTimeout 2', x1, x2)
				//setProp1(p1 => p1 + 1)
				setProp2(p2 => p2 + 1)
			}, 1000);
		}

		return function onDestroy() { console.log('Banner effect_0a onDestroy') }
	})

	useEffect(function effect_0b() {

		let x1 = prop1;
		let x2 = prop2;
		
		console.log('Banner effect_0b', x1, x2);

		return function onDestroy() { console.log('Banner effect_0b onDestroy') }
	}, [])


	useEffect(function effect_1() {

		let x1 = prop1;
		let x2 = prop2;
		
		console.log('Banner effect_1', x1, x2);

		return function onDestroy() { console.log('Banner effect_1 onDestroy') }
	}, [prop1])

	useEffect(function effect_2() {

		let x1 = prop1;
		let x2 = prop2;
		
		console.log('Banner effect_2', x1, x2)

		return function onDestroy() { console.log('Banner effect_2 onDestroy') }
	}, [prop2])
*/

	return (
		<>

		<h1>{title}</h1>
		<p>{body}</p>

		<button onClick={toggleEditor}>click to {isEditing ? 'show the editor' : 'hide the editor'}</button>
		

		{isEditing 
			? 
			<>
				<p>something here</p>
				<p>
					<label>something else</label>
					<SomethingElse prop1={prop1} prop2={prop2} />
				</p>
			</>
			: 
			<>
				<p>
					<label>long text</label>
					<Codemirror doc={doc} lang={lang} theme={theme} />
					<button onClick={changeDoc}>update the doc from outside (update the prop)</button>

					<select value={lang} onChange={ev => { setLang(ev.target.value) }}>
						<option value="html">html lang</option>
						<option value="markdown">markdown lang</option>
					</select>

					<select value={theme} onChange={ev => { setTheme(ev.target.value) }}>
						<option value="light">light theme</option>
						<option value="dark">dark theme</option>
					</select>
					
				</p>
			</>
	
		}

		</>
	)
}

export default Banner;


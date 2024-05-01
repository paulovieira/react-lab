import React, { useState, useEffect, useRef } from 'react';

import {EditorState, basicSetup} from "@codemirror/basic-setup";
import {EditorView, keymap } from "@codemirror/view";
import {indentWithTab} from "@codemirror/commands";
import {html} from "@codemirror/lang-html";
import {markdown} from "@codemirror/lang-markdown";
//import {javascript} from "@codemirror/lang-javascript";
import {oneDark} from "@codemirror/theme-one-dark";
import { indentationMarkers } from '@replit/codemirror-indentation-markers';



import { abbreviationTracker, expandAbbreviation } from '@emmetio/codemirror6-plugin';

function Codemirror({ doc, lang, theme }) {

	console.log('Codemirror component')

	let editorParentEl = useRef(null);
	let editorViewInstance = useRef(null);
	let [dynamicExtensions, setDynamicExtensions] = useState(null);
	let [dynamicModuleWasLoaded, setDynamicModuleWasLoaded] = useState(false);

	useEffect(function effect_0a() {
		
		console.log('Codemirror effect_0a', editorParentEl, editorViewInstance)
		
		if (editorViewInstance.current) {
			debugger;

			let fixedHeightEditor = EditorView.theme({
			  "&": {height: "200px"},
			  ".cm-scroller": {overflow: "auto"},
			  //".cm-line": {fontFamily: "'Fira Mono', monospace", fontSize: '1em'}
			  //".cm-line": {fontFamily: "'Fira Mono', monospace", fontSize: '1em'}

			})

			let extensions = [
		    basicSetup,
		    keymap.of([
		    	indentWithTab,
		    	{
  	                key: 'Ctrl-e',
  	                run: expandAbbreviation
  	            }
	    	]),
		    EditorView.lineWrapping,
		    fixedHeightEditor,
		    EditorView.updateListener.of(viewUpdate => { console.log(viewUpdate.docChanged, viewUpdate) }),
		    EditorView.domEventHandlers({
		        blur: () => {  },
		    }),
		    indentationMarkers(),
		    abbreviationTracker(),
		    //EditorState.transactionFilter.of(tr => { console.log({ tr, 'tr.newDoc.lines': tr.newDoc.lines }); return tr; })  // tr.newDoc.lines > 1 ? [] : tr }
		    EditorState.transactionFilter.of(tr => tr.newDoc.lines > 1 ? [] : tr)
			];

			// lang is given as prop
			if (lang === 'html') {
				extensions.push(html());
			}
			else if (lang === 'markdown') {
				extensions.push(markdown());
			}

			// theme is given as prop

			if (theme === 'dark') {
				extensions.push(oneDark);
			}

			if (dynamicExtensions != null) {
			  console.log('   extensions = extensions.concat(dynamicExtensions)')
			  extensions = extensions.concat(dynamicExtensions);
			}

			if (true && dynamicModuleWasLoaded === false) {
			  console.log('   loadDynamicModule(...)')
			  loadDynamicModule('./dynamic-extensions.js')
			}

			async function loadDynamicModule(path) {

			  console.log('loadDynamicModule path', path);

			  let dynamicModule = await import(path);
		    let extensions = dynamicModule.default();

		    setDynamicModuleWasLoaded(true);
		    setDynamicExtensions(extensions);
			}


			let newState = EditorState.create({
			  doc: doc,
			  extensions
			});
			
			editorViewInstance.current.setState(newState)
		}

		return function onDestroy() { debugger; console.log('Codemirror effect_0a onDestroy') }
	}, [doc, lang, theme, dynamicExtensions, dynamicModuleWasLoaded])

	useEffect(function effect_0b() {
		
		console.log('Codemirror effect_0b', editorParentEl, editorViewInstance)
		debugger;
		editorViewInstance.current = new EditorView({
		  
		  // state: EditorState.create({
		  //   doc,
		  //   extensions: [
		  //     basicSetup,
		  //     keymap.of([indentWithTab]),
		  //     EditorView.lineWrapping,
		  //     html(),
		  //     fixedHeightEditor,
		  //     EditorView.updateListener.of(viewUpdate => {  }),
		  //     EditorView.domEventHandlers({
		  //         blur: () => {  },
		  //     })
		      
		  //   ]

		  // }),
		  parent: editorParentEl.current
		})

		return function onDestroy() { 
			debugger; 
			console.log('Codemirror effect_0b onDestroy');

			if (editorViewInstance.current){
				editorViewInstance.current.destroy();
			}
			
		}
	}, [])



	return (
		<div style={{ border: 'red solid 1px' }} ref={editorParentEl}></div>
	)
}

// function countWords(doc) {
//   let count = 0, iter = doc.iter()
//   while (!iter.next().done) {
//     let inWord = false
//     for (let i = 0; i < iter.value.length; i++) {
//       let word = /\w/.test(iter.value[i])
//       if (word && !inWord) count++
//       inWord = word
//     }
//   }
//   return `Word count: ${count}`
// }

export default Codemirror;
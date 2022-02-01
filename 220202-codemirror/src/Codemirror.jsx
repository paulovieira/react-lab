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

	useEffect(function effect_0a() {
		
		console.log('Codemirror effect_0a', editorParentEl, editorViewInstance)
		debugger;
		if (editorViewInstance.current) {
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

			let newState = EditorState.create({
			  doc: doc,
			  extensions
			});
			
			editorViewInstance.current.setState(newState)
		}

		return function onDestroy() { debugger; console.log('Codemirror effect_0a onDestroy') }
	}, [doc, lang, theme])

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

export default Codemirror;
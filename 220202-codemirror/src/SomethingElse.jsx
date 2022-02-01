import React, { useState, useEffect, useRef } from 'react';

function SomethingElse({ prop1, prop2 }) {

	console.log('SomethingElse component')

	useEffect(function effect_0a() {

		console.log('SomethingElse effect_0a')

		return function onDestroy() { console.log('SomethingElse effect_0a onDestroy') }
	})

	useEffect(function effect_0b() {

		console.log('SomethingElse effect_0b')

		return function onDestroy() { console.log('SomethingElse effect_0b onDestroy') }
	}, [])

	useEffect(function effect_1() {

		console.log('SomethingElse effect_1')

		return function onDestroy() { console.log('SomethingElse effect_1 onDestroy') }
	}, [prop1])

	useEffect(function effect_2() {

		console.log('SomethingElse effect_2')

		return function onDestroy() { console.log('SomethingElse effect_2 onDestroy') }
	}, [prop2])

	return (
		<ul>
			<li>prop1: {prop1}</li>
			<li>prop2: {prop2}</li>
			<li>two</li>
		</ul>
	)
}

export default SomethingElse;


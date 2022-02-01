# react-lab

Some experiments with reactjs.

To create a new experimental project:

```sh
npm init vite@latest 220202-some-description --template react
cd 220202-codemirror
npm install 
npm run dev
```

In `main.jsx` we probably want to remove the `<React.StrictMode>` wrapper, to better understand the code flow when debugging (with `<React.StrictMode>` some function will be double-invoked, see https://reactjs.org/docs/strict-mode.html)
# react-lab

Some experiments with reactjs.

To create a new experimental project:

```sh
npm init vite@latest YYMMDD-some-description --template react
cd YYMMDD-some-description
npm install 
npm run dev
```

The template used by vite will have a `main.jsx` in which the `<React.StrictMode>` wrapper is used. We probably want to remove it to better understand the code flow when debugging (`<React.StrictMode>` will make some functions execute twice, see https://reactjs.org/docs/strict-mode.html)
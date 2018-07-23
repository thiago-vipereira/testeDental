#### **Example**

```jsx
const links = [
    { text: 'Perfil e Conta', path: '', exact: true },
    { text: 'Clínicas', path: '/clinics' },
    { text: 'Listas de Procedimentos', path: '/procedures' },
    { text: 'Modelos', path: '/models' },
    { text: 'Importação', path: '/importing' },
];

<ViewNavBar match={{ url: '/url' }} links={links} />
```
#### **Usage**

You should implement an ReactTooltip together with the action button. Check the TopBar component for an example on how to do it

```jsx
function onClick() {
    console.log('click!');
}

<ActionButton onClick={onClick} icon="newPatient" tip="Novo Paciente" />
```
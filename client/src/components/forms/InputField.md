#### **Usage**

The input component, normally, is going to be passed to the Field component of a Redux Form.

```jsx
<InputField
    label="Label for input"
    placeholder="Placeholder..."

    // this meta prop is passed by Redux
    meta={{ error: 'error message', touched: false }}
/>
```
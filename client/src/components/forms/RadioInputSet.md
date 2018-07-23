#### **Usage**

Very simple way to implement a set of radio inputs. You just need to pass an array of options.

```jsx
const reduxForm = require('redux-form').reduxForm;

const OPTIONS = [
	{ label: 'Option 1', value: 'option1' },
	{ label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' }
];

<RadioInputSet
    setLabel="Radio set"
    name="radioset"
    options={OPTIONS}
/>
```
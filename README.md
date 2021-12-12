# Input validator

Validador de formularios implementando reglas de validación independientes para cada campo por tipo de dato.

## Installation

Install cgc-validator with npm or yarn.

```bash
NPM
npm install cgc-validator
```

```bash
YARN
yarn add cgc-validator
```

## Usage/Examples

```javascript
import validator from "cgc-validator";

function App() {
  const postData = () => {
    const params = { numericInput: "213jdjd", stringInput: "Hola mundo" };

    const rules = {
      numericInput: "required;type=number;alias=área",
      stringInput: "required;type=string;alias=mensaje",
    };

    const validation = validator(params, rules);

    if (validation.success) {
      // DO POST REQUEST
    } else {
      // SEND SOME MESSAGE
    }
  };

  return <Component />;
}
```

## Documentation

- required: opcional.
- type: [number,string,email,rut,any] tipo de dato a validar.
- alias: nombre del campo a mostrar en caso de error.

## Badges

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

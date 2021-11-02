/**
 *
 * @param {Object} params
 * @param {Object} rules
 */
export default function validator(params, rules, customErrorMessages = null) {
  if (typeof params === "undefined" || typeof rules === "undefined") {
    console.error("Validator: Debe ingresar todos los parámetros.");
    return { messages: {}, keys: [], success: false };
  }

  const getRuleAttributeValue = function (ruleAttribute) {
    const parts = ruleAttribute.split("=");
    return parts[1];
  };

  let messages = {};
  let keys = [];

  for (const key in rules) {
    let message = `Debe ingresar __KEY__`,
      required = false,
      alias = key,
      type = "any";

    //Obtener valores de reglas de validación
    if (rules[key].indexOf(";")) {
      const ruleAttributes = rules[key].split(";");

      for (const ruleAttribute of ruleAttributes) {
        if (ruleAttribute.indexOf("alias") == 0) {
          alias = getRuleAttributeValue(ruleAttribute);
        } else if (ruleAttribute.indexOf("required") == 0) {
          required = true;
        } else if (ruleAttribute.indexOf("type") == 0) {
          type = getRuleAttributeValue(ruleAttribute);
        }
      }
    }

    if (required) {
      if (
        typeof params[key] === "undefined" ||
        params[key] == null ||
        params[key] == ""
      ) {
        messages[key] = message.replace("__KEY__", alias);
        keys.push(key);
      } else {
        if (type != "any") {
          if (
            (type == "number" && isNaN(params[key])) ||
            (type == "string" && !isNaN(params[key]))
          ) {
            messages[
              key
            ] = `El valor ingresado para ${alias} no es el correcto.`;
            keys.push(key);
          }
        }
      }
    }
  }

  return { messages, keys, success: keys.length == 0 };
}

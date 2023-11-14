/**
 *
 * @param {Object} params
 * @param {Object} rules
 */
function validator (params, rules) {
  if (typeof params === "undefined" || typeof rules === "undefined") {
    console.error("Validator: Debe ingresar todos los parámetros.")
    return { messages: {}, keys: [], success: false }
  }

  const getRuleAttributeValue = function (ruleAttribute) {
    const parts = ruleAttribute.split("=")
    return parts[1]
  }

  const isValidEmail = (value) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(value).toLowerCase())
  }

  const isValidPhone = (value) => {
    const re = /^\d{9}$/
    return re.test(String(value))
  }

  const isValidDate = (value) => {
    //clean in case that the user has entered a date with time
    const cleanValue = value.replace(/\//g, "-").split(" ")[0]
    let date = null

    const dmYFormat = /^\d{2}-\d{2}-\d{4}$/
    const YmdFormat = /^\d{4}-\d{2}-\d{2}$/

    if (dmYFormat.test(String(cleanValue))) {
      const parts = cleanValue.split("-")
      date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`)
    } else if (YmdFormat.test(String(cleanValue))) {
      date = new Date(cleanValue)
    }
    return date && !isNaN(date.getTime())
  }

  const isValidRut = (value) => {
    value = value.replace(/\./g, "")
    return /^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(String(value))
  }

  let messages = {}
  let keys = []

  for (const key in rules) {
    let message = `Debe ingresar __KEY__`,
      required = false,
      alias = key,
      _in = null,
      type = "any"
    //in => in=string1|string2|string3

    //Obtener valores de reglas de validación
    if (rules[key].indexOf(";")) {
      const ruleAttributes = rules[key].split(";")

      for (const ruleAttribute of ruleAttributes) {
        if (ruleAttribute.indexOf("alias") == 0) {
          alias = getRuleAttributeValue(ruleAttribute)
        } else if (ruleAttribute.indexOf("required") == 0) {
          required = true
        } else if (ruleAttribute.indexOf("type") == 0) {
          type = getRuleAttributeValue(ruleAttribute)
        } else if (ruleAttribute.indexOf("in") == 0) {
          _in = getRuleAttributeValue(ruleAttribute)
        }
      }
    }

    const validate = (isRequired) => {
      const shouldValidate =
        typeof params[key] === "undefined" ||
        params[key] == null ||
        params[key] == ""

      if (shouldValidate) {
        if (isRequired) {
          messages[key] = message.replace("__KEY__", alias)
          keys.push(key)
        }
      } else {
        if (type != "any") {
          let message = null
          if (
            (type === "number" && isNaN(params[key])) ||
            (type === "string" && !isNaN(params[key]))
          ) {
            message = `El valor ingresado para ${alias} no es el correcto.`
          }
          if (type === "email" && !isValidEmail(params[key])) {
            message = `El valor ingresado para ${alias} no es el correcto.`
          }
          if (type === "phone" && !isValidPhone(params[key])) {
            message = `El valor ingresado para ${alias} no es el correcto.`
          }
          if (type === "rut" && !isValidRut(params[key])) {
            message = `El valor ingresado para ${alias} no es el correcto. P.e: XXXXXXXX-X o XX.XXX.XXX-X`
          }
          if (type === "date" && !isValidDate(params[key])) {
            message = `El valor ingresado para ${alias} no es el correcto.`
          }

          if (message) {
            messages[key] = message
            keys.push(key)
          }
        }
        if (_in) {
          const inValues = _in.toLowerCase().split("|")
          if (!inValues.includes(params[key].toLowerCase())) {
            messages[
              key
            ] = `El valor ingresado para ${alias} no es el correcto.`
            keys.push(key)
          }
        }
      }
    }

    validate(required)
  }

  return { messages, keys, success: keys.length == 0 }
}

module.exports = validator

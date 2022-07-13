import { describe, expect, test } from "@jest/globals";
import validator from "../index.js";

const successfullResult = {
  messages: {},
  keys: [],
  success: true,
};

describe("check string input", () => {
  test("check required;type=string;alias=mensaje", () => {
    const params = {
        stringInput: "Hola mundo",
      },
      rules = {
        stringInput: "required;type=string;alias=mensaje",
      },
      customErrorMessages = null;

    const validatorResult = validator(params, rules, customErrorMessages);
    // console.log({ validatorResult });
    expect(validatorResult).toMatchObject(successfullResult);
  });
  test("check empty required;type=string;alias=mensaje", () => {
    const params = {
        stringInput: "",
      },
      rules = {
        stringInput: "required;type=string;alias=mensaje",
      },
      customErrorMessages = null;

    const expectedResult = {
      messages: { stringInput: "Debe ingresar mensaje" },
      keys: ["stringInput"],
      success: false,
    };
    const validatorResult = validator(params, rules, customErrorMessages);
    // console.log({ validatorResult });
    expect(validatorResult).toMatchObject(expectedResult);
    expect(validatorResult.messages.stringInput).toBe(
      expectedResult.messages.stringInput
    );
    expect(validatorResult.success).toBe(expectedResult.success);
  });
  test("check empty string and required numeric value", () => {
    const params = {
        stringInput: "",
        numericInput: "213jdjd",
      },
      rules = {
        stringInput: "type=string;alias=mensaje",
        numericInput: "required;type=number;alias=área",
      },
      customErrorMessages = null;

    const expectedResult = {
      messages: {
        numericInput: "El valor ingresado para área no es el correcto.",
      },
      keys: ["numericInput"],
      success: false,
    };
    const validatorResult = validator(params, rules, customErrorMessages);
    // console.log("check empty string and required numeric value", {
    //   validatorResult,
    // });
    expect(validatorResult).toMatchObject(expectedResult);
    expect(validatorResult.messages.numericInput).toBe(
      expectedResult.messages.numericInput
    );
    expect(validatorResult.success).toBe(expectedResult.success);
  });
});

describe("check numeric input", () => {
  test("check incorrect number format type=number;alias=área", () => {
    const params = {
        numericInput: "324g534",
      },
      rules = {
        numericInput: "type=number;alias=área",
      },
      customErrorMessages = null;

    const expectedResult = {
      messages: {
        numericInput: "El valor ingresado para área no es el correcto.",
      },
      keys: ["numericInput"],
      success: false,
    };
    const validatorResult = validator(params, rules, customErrorMessages);
    // console.log({ validatorResult });
    expect(validatorResult).toMatchObject(expectedResult);
    expect(validatorResult.messages.numericInput).toBe(
      expectedResult.messages.numericInput
    );
    expect(validatorResult.success).toBe(expectedResult.success);
  });
});

describe("check rut input", () => {
  test("check 11.11g.11-1 rut format type=rut,alias=RUT", () => {
    const params = {
        input: "11.11g.11-1",
      },
      rules = {
        input: "type=rut;alias=RUT",
      },
      customErrorMessages = null;

    const expectedResult = {
      messages: {
        input:
          "El valor ingresado para RUT no es el correcto. P.e: XXXXXXXX-X o XX.XXX.XXX-X",
      },
      keys: ["input"],
      success: false,
    };
    const validatorResult = validator(params, rules, customErrorMessages);
    expect(validatorResult).toMatchObject(expectedResult);
    expect(validatorResult.messages.input).toBe(expectedResult.messages.input);
    expect(validatorResult.success).toBe(expectedResult.success);
  });
  test("check 324g534 rut format type=rut,alias=RUT", () => {
    const params = {
        input: "324g534",
      },
      rules = {
        input: "type=rut;alias=RUT",
      },
      customErrorMessages = null;

    const expectedResult = {
      messages: {
        input:
          "El valor ingresado para RUT no es el correcto. P.e: XXXXXXXX-X o XX.XXX.XXX-X",
      },
      keys: ["input"],
      success: false,
    };
    const validatorResult = validator(params, rules, customErrorMessages);
    expect(validatorResult).toMatchObject(expectedResult);
    expect(validatorResult.messages.input).toBe(expectedResult.messages.input);
    expect(validatorResult.success).toBe(expectedResult.success);
  });
  test("check 11.111.111-1 rut format type=rut,alias=RUT", () => {
    const params = {
        input: "11.111.111-1",
      },
      rules = {
        input: "type=rut;alias=RUT",
      },
      customErrorMessages = null;

    const validatorResult = validator(params, rules, customErrorMessages);

    expect(validatorResult).toMatchObject(successfullResult);
    expect(validatorResult.success).toBe(successfullResult.success);
  });
});

describe("check email input", () => {
  test("check gfgd@dsd email format type=email,alias=email", () => {
    const params = {
        input: "gfgd@dsd",
      },
      rules = {
        input: "type=email;alias=EMAIL",
      },
      customErrorMessages = null;

    const expectedResult = {
      messages: {
        input: "El valor ingresado para EMAIL no es el correcto.",
      },
      keys: ["input"],
      success: false,
    };
    const validatorResult = validator(params, rules, customErrorMessages);
    expect(validatorResult).toMatchObject(expectedResult);
  });
  test("check my.email@email.com email format type=email,alias=email", () => {
    const params = {
        input: "my.email@email.com",
      },
      rules = {
        input: "type=email;alias=EMAIL",
      },
      customErrorMessages = null;

    const validatorResult = validator(params, rules, customErrorMessages);
    expect(validatorResult).toMatchObject(successfullResult);
  });
});

describe("check date input", () => {
  test("check 2000-20-50 date format type=date,alias=fecha", () => {
    const params = {
        input: "2000-20-50",
      },
      rules = {
        input: "type=date;alias=fecha",
      },
      customErrorMessages = null;

    const expectedResult = {
      messages: {
        input: "El valor ingresado para fecha no es el correcto.",
      },
      keys: ["input"],
      success: false,
    };
    const validatorResult = validator(params, rules, customErrorMessages);
    expect(validatorResult).toMatchObject(expectedResult);
  });
  test("check 23/23/1984 date format type=date,alias=fecha", () => {
    const params = {
        input: "23/23/1984",
      },
      rules = {
        input: "type=date;alias=fecha",
      },
      customErrorMessages = null;

    const expectedResult = {
      messages: {
        input: "El valor ingresado para fecha no es el correcto.",
      },
      keys: ["input"],
      success: false,
    };
    const validatorResult = validator(params, rules, customErrorMessages);
    expect(validatorResult).toMatchObject(expectedResult);
  });

  test("check 2020-02-23 date format type=date,alias=fecha", () => {
    const params = {
        input: "2020-02-23",
      },
      rules = {
        input: "type=date;alias=fecha",
      },
      customErrorMessages = null;

    const validatorResult = validator(params, rules, customErrorMessages);
    expect(validatorResult).toMatchObject(successfullResult);
  });
  test("check 2020-02-23 15:35:47 date format type=date,alias=fecha", () => {
    const params = {
        input: "2020-02-23 15:35:47",
      },
      rules = {
        input: "type=date;alias=fecha",
      },
      customErrorMessages = null;

    const validatorResult = validator(params, rules, customErrorMessages);
    expect(validatorResult).toMatchObject(successfullResult);
  });
  test("check 23/02/2001 15:35:47 date format type=date,alias=fecha", () => {
    const params = {
        input: "23/02/2001 15:35:47",
      },
      rules = {
        input: "type=date;alias=fecha",
      },
      customErrorMessages = null;

    const validatorResult = validator(params, rules, customErrorMessages);
    expect(validatorResult).toMatchObject(successfullResult);
  });
});

describe("check in input", () => {
  test("check required;type=string;in=hola|chao|adios;alias=mensaje", () => {
    const params = {
        stringInput: "Hola",
      },
      rules = {
        stringInput: "required;type=string;in=hola|chao|adios;alias=mensaje",
      },
      customErrorMessages = null;

    const validatorResult = validator(params, rules, customErrorMessages);
    // console.log({ validatorResult });
    expect(validatorResult).toMatchObject(successfullResult);
  });
  test("check required;type=string;in=hola|chao|adios;alias=mensaje", () => {
    const params = {
        stringInput: "Hola mundo",
      },
      rules = {
        stringInput: "required;type=string;in=hola|chao|adios;alias=mensaje",
      },
      customErrorMessages = null;
    const expectedResult = {
      messages: {
        stringInput: "El valor ingresado para mensaje no es el correcto.",
      },
      keys: ["stringInput"],
      success: false,
    };

    const validatorResult = validator(params, rules, customErrorMessages);
    // console.log({ validatorResult });
    expect(validatorResult).toMatchObject(expectedResult);
  });
});

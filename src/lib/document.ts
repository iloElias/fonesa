import { CSSProperties } from "react";

export const docMandatoryStates: string[] = ["RR"];

interface ConditionalFunctionParams {
  state: string | null;
}

type ConditionalFunction = (params: ConditionalFunctionParams) => boolean;
type MaskFunction = (input: string) => string;
type ValidateFunction = (input: string) => string | null;

interface ClassNames {
  base?: string;
}

interface Styles {
  base?: CSSProperties | undefined;
}

export type Field = {
  id: string;
  label: string;
  type: "text" | "barcode" | "number" | "select" | "date";
  className?: string;
  classNames?: ClassNames;
  style?: CSSProperties | undefined;
  styles?: Styles;
  data?: string | string[];
  mandatory?: boolean;
  conditional?: ConditionalFunction;
  mask?: MaskFunction;
  validate?: ValidateFunction;
};

export type Document = {
  type: string;
  path: string;
  label: string;
  fields: Field[];
};

const fieldsGta: Field[] = [
  {
    id: "barcode",
    label: "Código de Barras",
    type: "barcode",
    className: "flex-1",
    classNames: {
      base: "flex-1",
    },
    mandatory: true,
    mask: (value) => {
      return value.replace(/\D/g, "");
    },
    validate: (input: string) => {
      if (input.length < 10) {
        return "Código de barras inválido";
      }
      return null;
    },
  },
  // {
  //   id: "serie",
  //   label: "Serie",
  //   type: "select",
  //   className: "flex-1",
  //   data: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  //   mandatory: true,
  // },
  // {
  //   id: "document",
  //   label: "CPF/CNPJ da Origem",
  //   type: "text",
  //   className: "flex-1",
  //   mandatory: true,
  //   conditional: ({state}) => {
  //     if (state) {
  //       return !docMandatoryStates?.find((val) => val === state);
  //     }
  //     return false;
  //   },
  //   mask: cpfCnpjMask,
  //   validate: (input: string) => {
  //     if (input.replace(/\D/g, "").length < 11) {
  //       return "CPF/CNPJ inválido";
  //     }
  //     return null;
  //   },
  // },
];

const fieldsPtv: Field[] = [
  {
    id: "number",
    label: "Número da PTV",
    type: "text",
    mandatory: true,
    mask: (value) => {
      return value.replace(/\D/g, "");
    },
    validate: (input: string) => {
      if (input.length < 10) {
        return "Numero invalido";
      }
      return null;
    },
  },
];

export const Documents: Document[] = [
  {
    type: "gta",
    path: "sem-login/gta/listar",
    label: "GTA (Guia de Transito Animal)",
    fields: fieldsGta,
  },
  {
    type: "ptv",
    path: "sem-login/validar-gta/visualizarPtv",
    label: "PTV (Permissão de Trânsito Vegetal)",
    fields: fieldsPtv,
  },
];

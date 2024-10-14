export type Field = {
  id: string;
  label: string;
  type: "text" | "number" | "date";
  mask?: string;
};

const fieldsGta: Field[] = [
  {
    id: "number",
    label: "Número da GTA",
    type: "number",
  },
  {
    id: "serie",
    label: "Código de Serie",
    type: "text",
  },
  {
    id: "document",
    label: "CPF/CNPJ da Origem",
    type: "text",
    mask: "###.###.###-##",
  },
];

const fieldsPtv: Field[] = [
  {
    id: "number",
    label: "Número da PTV",
    type: "number",
  },
];

export type Document = {
  type: string;
  label: string;
  fields: Field[];
};

export const Documents: Document[] = [
  {
    type: "gta",
    label: "GTA (Guia de Transito Animal)",
    fields: fieldsGta,
  },
  {
    type: "ptv",
    label: "PTV (Permissão de Trânsito Vegetal)",
    fields: fieldsPtv,
  },
];

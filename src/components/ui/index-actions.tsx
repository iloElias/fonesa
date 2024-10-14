"use client";
import { ReactElement } from "react";
import { Validate } from "@components/ui/actions/document-validate";
import { Manual } from "@components/ui/actions/document-manual";
import { Contacts } from "@components/ui/actions/state-contacts";
import { Transparency } from "@components/ui/actions/state-transparency";

export interface StateActions {
  key: string;
  name: string;
  description: string;
  icon: string;
  component: () => ReactElement;
}

export const stateActions: StateActions[] = [
  {
    key: "validate",
    name: "Validação",
    description: "Validação de documentos emitidos pelo estado",
    icon: "check_circle",
    component: () => <Validate />,
  },
  {
    key: "manual",
    name: "Manual",
    description: "Manuais de criação de documentos",
    icon: "import_contacts",
    component: () => <Manual />,
  },
  {
    key: "contacts",
    name: "Telefones",
    description: "Consultar telefones de agências",
    icon: "call",
    component: () => <Contacts />,
  },
  {
    key: "transparency",
    name: "Transparência",
    description: "Portal da transparência do estado",
    icon: "info",
    component: () => <Transparency />,
  },
];

"use client";
import { ReactElement } from "react";
import { Validate } from "@components/ui/actions/document-validate";
import { Manual } from "@components/ui/actions/document-manual";
import { Contacts } from "@components/ui/actions/state-contacts";
import { Transparency } from "@components/ui/actions/state-transparency";
import { BookFill, CheckFill, InfoFill, PhoneFill } from "./fonesa-icons";

export interface StateActions {
  key: string;
  name: string;
  description: string;
  icon: () => ReactElement;
  component: () => ReactElement;
}

export const stateActions: StateActions[] = [
  {
    key: "validate",
    name: "Validação",
    description: "Validação de documentos emitidos pelo estado",
    icon: () => <CheckFill />,
    component: () => <Validate />,
  },
  {
    key: "manual",
    name: "Manual",
    description: "Manuais de criação de documentos",
    icon: () => <BookFill />,
    component: () => <Manual />,
  },
  {
    key: "contacts",
    name: "Telefones",
    description: "Consultar telefones de agências",
    icon: () => <PhoneFill />,
    component: () => <Contacts />,
  },
  {
    key: "transparency",
    name: "Transparência",
    description: "Portal da transparência do estado",
    icon: () => <InfoFill />,
    component: () => <Transparency />,
  },
];

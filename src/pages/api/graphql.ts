import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
  }
  res.status(200).json([
    {
      data: {
        pages: {
          tree: [
            {
              id: 26,
              path: "defesa-animal",
              title: "Módulo de Defesa Animal",
              isFolder: true,
              pageId: 48,
              parent: 0,
              locale: "pt-br",
              __typename: "PageTreeItem",
            },
            {
              id: 29,
              path: "GTA",
              title:
                "Anexo 3 - IN 46/2018 - Manual de Procedimento Operacional Padrão para Exportação de Bovinos, Bubalinos, Ovinos e Caprinos Vivos, Destinados ao Abate ou à Reprodução",
              isFolder: false,
              pageId: 30,
              parent: 0,
              locale: "pt-br",
              __typename: "PageTreeItem",
            },
            {
              id: 30,
              path: "GTI",
              title:
                "Aves e ovos férteis - Manual de procedimentos para o trânsito de aves de produção e ovos férteis com finalidade de produção de carne, ovos e material genético",
              isFolder: false,
              pageId: 31,
              parent: 0,
              locale: "pt-br",
              __typename: "PageTreeItem",
            },
            {
              id: 28,
              path: "EQUÍDEOS",
              title:
                "Equídeos - Manual de Procedimento para o Trânsito de Equídeos",
              isFolder: false,
              pageId: 32,
              parent: 0,
              locale: "pt-br",
              __typename: "PageTreeItem",
            },
            {
              id: 21,
              path: "Abelhas",
              title:
                "GTA de Abelhas, Bicho-da-seda e outros invertebrados terrestres - Manual para emissão de GTA",
              isFolder: false,
              pageId: 33,
              parent: 0,
              locale: "pt-br",
              __typename: "PageTreeItem",
            },
            {
              id: 22,
              path: "Aquáticos",
              title: "GTA de Animais Aquáticos - Manual para emissão de GTA",
              isFolder: false,
              pageId: 34,
              parent: 0,
              locale: "pt-br",
              __typename: "PageTreeItem",
            },
            {
              id: 37,
              path: "Silvestre",
              title: "GTA de Animais Silvestres - Manual para emissão de GTA",
              isFolder: false,
              pageId: 35,
              parent: 0,
              locale: "pt-br",
              __typename: "PageTreeItem",
            },
            {
              id: 23,
              path: "BOVINOS",
              title: "GTA de Bovinos e bubalinos - Manual para emissão de GTA",
              isFolder: false,
              pageId: 36,
              parent: 0,
              locale: "pt-br",
              __typename: "PageTreeItem",
            },
            {
              id: 24,
              path: "CAPRINOS",
              title: "GTA de Caprinos e Ovinos - Manual para emissão de GTA",
              isFolder: false,
              pageId: 37,
              parent: 0,
              locale: "pt-br",
              __typename: "PageTreeItem",
            },
            {
              id: 36,
              path: "SANIDADE",
              title:
                "Manual Aquicultura com Sanidade - Versão Orientada ao Órgão Executor de Sanidade Agropecuária",
              isFolder: false,
              pageId: 39,
              parent: 0,
              locale: "pt-br",
              __typename: "PageTreeItem",
            },
            {
              id: 32,
              path: "INVESTIGAÇÃO",
              title: "Manual de investigação de doença vesicular",
              isFolder: false,
              pageId: 38,
              parent: 0,
              locale: "pt-br",
              __typename: "PageTreeItem",
            },
            {
              id: 35,
              path: "PADRONIZAÇÃO",
              title:
                "Manual de Padronização do Cadastro Agropecuário Definição ",
              isFolder: false,
              pageId: 45,
              parent: 0,
              locale: "pt-br",
              __typename: "PageTreeItem",
            },
            {
              id: 34,
              path: "OPERACIONAL",
              title:
                "Manual de Procedimento Operacional Padrão para o trânsito de subprodutos de origem animal, emissão de CIS-E e credenciamento de médicos veterinários particulares",
              isFolder: false,
              pageId: 44,
              parent: 0,
              locale: "pt-br",
              __typename: "PageTreeItem",
            },
            {
              id: 31,
              path: "home",
              title: "Manual de Procedimentos",
              isFolder: false,
              pageId: 29,
              parent: 0,
              locale: "pt-br",
              __typename: "PageTreeItem",
            },
            {
              id: 33,
              path: "MANUAL",
              title:
                "Manual do Programa Nacional de Controle Higiênico-Sanitário de Moluscos Bivalves – PNCMB",
              isFolder: false,
              pageId: 43,
              parent: 0,
              locale: "pt-br",
              __typename: "PageTreeItem",
            },
            {
              id: 40,
              path: "TUTORIAL",
              title:
                "PREENCHIMENTO DE DADOS DO MATERIAL ESPECIFICADO DE RISCO - MER NO SIDAGO",
              isFolder: false,
              pageId: 46,
              parent: 0,
              locale: "pt-br",
              __typename: "PageTreeItem",
            },
            {
              id: 25,
              path: "CREDENCIAMENTO",
              title:
                "Procedimento para Credenciamento e Controle de Quarentenários de Animais Aquáticos",
              isFolder: false,
              pageId: 41,
              parent: 0,
              locale: "pt-br",
              __typename: "PageTreeItem",
            },
            {
              id: 38,
              path: "SUÍDEOS",
              title:
                "Suídeos - Manual de procedimentos para o trânsito de suídeos",
              isFolder: false,
              pageId: 40,
              parent: 0,
              locale: "pt-br",
              __typename: "PageTreeItem",
            },
            {
              id: 39,
              path: "teste",
              title: "teste sandra",
              isFolder: false,
              pageId: 47,
              parent: 0,
              locale: "pt-br",
              __typename: "PageTreeItem",
            },
          ],
          __typename: "PageQuery",
        },
      },
    },
  ]);
}

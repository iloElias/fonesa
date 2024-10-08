import type { NextApiRequest, NextApiResponse } from "next";

export type State = {
  uf: string;
  name: string;
  sysName: string;
  sysShortName: string;
  prodUrl: string;
  flagUrl: string;
};

// Agro management systems
const states: State[] = [{
    uf: "AC",
    name: "Acre",
    sysName: "Sistema de Defesa Agropecuária do Acre",
    sysShortName: "SIDAC",
    prodUrl: "https://www.ac.gov.br/",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Bandeira_do_Acre.svg/500px-Bandeira_do_Acre.svg.png",
  },{
    uf: "AL",
    name: "Alagoas",
    sysName: "Sistema de Gestão Agropecuária de Alagoas",
    sysShortName: "SIGEAL",
    prodUrl: "https://sigeal.al.gov.br/",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Bandeira_de_Alagoas.svg/1920px-Bandeira_de_Alagoas.svg.png",
  },{
    uf: "AP",
    name: "Amapá",
    sysName: "Sistema da Agência de Defesa e Inspeção Agropecuária do Estado do Amapá",
    sysShortName: "SISDIAGRO",
    prodUrl: "https://sidap.sedap.pb.gov.br/",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Bandeira_do_Amap%C3%A1.svg/800px-Bandeira_do_Amap%C3%A1.svg.png",
  },{
    uf: "AM",
    name: "Amazonas",
    sysName: "Secretaria de Produção Rural do Amazonas",
    sysShortName: "SEPROR",
    prodUrl: "https://www.am.gov.br/",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Bandeira_do_Amazonas.svg/1280px-Bandeira_do_Amazonas.svg.png",
  },{
    uf: "BA",
    name: "Bahia",
    sysName: "Sistema de Defesa Agropecuária da Bahia",
    sysShortName: "SIDAB",
    prodUrl: "https://sidab.adab.ba.gov.br/",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Bandeira_da_Bahia.svg/1920px-Bandeira_da_Bahia.svg.png",
  },{
    uf: "CE",
    name: "Ceará",
    sysName: "Agência de Defesa Agropecuária do Estado do Ceará",
    sysShortName: "ADAGRI",
    prodUrl: "https://www.adagri.ce.gov.br/",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Bandeira_do_Cear%C3%A1.svg/1280px-Bandeira_do_Cear%C3%A1.svg.png",
  },{
    uf: "DF",
    name: "Distrito Federal",
    sysName: "Sistema de Defesa Agropecuária do Distrito Federal",
    sysShortName: "SIAGRO",
    prodUrl: "https://www.df.gov.br/",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Bandeira_do_Distrito_Federal_%28Brasil%29.svg/800px-Bandeira_do_Distrito_Federal_%28Brasil%29.svg.png",
  },{
    uf: "ES",
    name: "Espírito Santo",
    sysName: "Sistema de Defesa Agropecuária do Espírito Santo",
    sysShortName: "SIDAG",
    prodUrl: "https://www.es.gov.br/",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Bandeira_do_Esp%C3%ADrito_Santo.svg/800px-Bandeira_do_Esp%C3%ADrito_Santo.svg.png",
  },{
    uf: "GO",
    name: "Goiás",
    sysName: "Sistema de Defesa Agropecuária de Goiás",
    sysShortName: "SIDAGO",
    prodUrl: "https://www.go.gov.br/",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Flag_of_Goi%C3%A1s.svg/560px-Flag_of_Goi%C3%A1s.svg.png",
  },{
    uf: "MA",
    name: "Maranhão",
    sysName: "Sistema de Gestão Agropecuária do Maranhão",
    sysShortName: "SIGAMA",
    prodUrl: "https://sigama.aged.ma.gov.br/",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Bandeira_do_Maranh%C3%A3o.svg/800px-Bandeira_do_Maranh%C3%A3o.svg.png",
  },{
    uf: "MT",
    name: "Mato Grosso",
    sysName: "Sistema de Defesa Agropecuária de Mato Grosso",
    sysShortName: "SIDAM",
    prodUrl: "https://www.mt.gov.br/",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Bandeira_de_Mato_Grosso.svg/800px-Bandeira_de_Mato_Grosso.svg.png",
  },{
    uf: "MS",
    name: "Mato Grosso do Sul",
    sysName: "Sistema de Defesa Agropecuária de Mato Grosso do Sul",
    sysShortName: "SIDAF",
    prodUrl: "https://www.ms.gov.br/",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Bandeira_de_Mato_Grosso_do_Sul.svg/800px-Bandeira_de_Mato_Grosso_do_Sul.svg.png",
  },{
    uf: "MG",
    name: "Minas Gerais",
    sysName: "Sistema de Defesa Agropecuária de Minas Gerais",
    sysShortName: "SIDAMG",
    prodUrl: "https://www.mg.gov.br/",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Bandeira_de_Minas_Gerais.svg/600px-Bandeira_de_Minas_Gerais.svg.png",
  },{
    uf: "PA",
    name: "Pará",
    sysName: "Sistema de Defesa Agropecuária do Pará",
    sysShortName: "SIDAPA",
    prodUrl: "https://www.pa.gov.br/",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Bandeira_do_Par%C3%A1.svg/800px-Bandeira_do_Par%C3%A1.svg.png",
  },{
    uf: "PB",
    name: "Paraíba",
    sysName: "Sistema de Defesa Agropecuária da Paraíba",
    sysShortName: "SIDAP",
    prodUrl: "https://www.pb.gov.br/",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Bandeira_da_Para%C3%ADba.svg/800px-Bandeira_da_Para%C3%ADba.svg.png",
  },{
    uf: "PR",
    name: "Paraná",
    sysName: "Sistema de Defesa Agropecuária do Paraná",
    sysShortName: "SIDAPR",
    prodUrl: "https://www.pr.gov.br/",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Bandeira_do_Paran%C3%A1.svg/800px-Bandeira_do_Paran%C3%A1.svg.png",
  },{
    uf: "PE",
    name: "Pernambuco",
    sysName: "Sistema de Defesa Agropecuária de Pernambuco",
    sysShortName: "SIDAPE",
    prodUrl: "https://www.pe.gov.br/",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Bandeira_de_Pernambuco.svg/540px-Bandeira_de_Pernambuco.svg.png",
  },{
    uf: "PI",
    name: "Piauí",
    sysName: "Sistema de Defesa Agropecuária do Piauí",
    sysShortName: "SIDAPI",
    prodUrl: "https://www.pi.gov.br/",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Bandeira_do_Piau%C3%AD.svg/800px-Bandeira_do_Piau%C3%AD.svg.png",
  },{
    uf: "RJ",
    name: "Rio de Janeiro",
    sysName: "Sistema de Defesa Agropecuária do Rio de Janeiro",
    sysShortName: "",
    prodUrl: "https://www.rj.gov.br/",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Bandeira_do_estado_do_Rio_de_Janeiro.svg/800px-Bandeira_do_estado_do_Rio_de_Janeiro.svg.png",
  },{
    uf: "RN",
    name: "Rio Grande do Norte",
    sysName: "Sistema de Defesa Agropecuária do Rio Grande do Norte",
    sysShortName: "SIDIARN",
    prodUrl: "https://www.rn.gov.br/",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Bandeira_do_Rio_Grande_do_Norte.svg/800px-Bandeira_do_Rio_Grande_do_Norte.svg.png",
  },{
    uf: "RS",
    name: "Rio Grande do Sul",
    sysName: "Sistema de Defesa Agropecuária",
    sysShortName: "SDA",
    prodUrl: "https://www.rs.gov.br/",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Bandeira_do_Rio_Grande_do_Sul.svg/800px-Bandeira_do_Rio_Grande_do_Sul.svg.png",
  },{
    uf: "RO",
    name: "Rondônia",
    sysName: "ADERR (Agência de Defesa Agropecuária de Roraima)",
    sysShortName: "SIGADERR",
    prodUrl: "https://www.ro.gov.br/",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Bandeira_de_Rond%C3%B4nia.svg/800px-Bandeira_de_Rond%C3%B4nia.svg.png",
  },{
    uf: "RR",
    name: "Roraima",
    sysName: "Sistema de Gerenciamento Agropecuário do Estado de Roraima",
    sysShortName: "SIGADERR",
    prodUrl: "https://sigaderr.aderr.com.br/",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Bandeira_de_Roraima.svg/800px-Bandeira_de_Roraima.svg.png",
  },{
    uf: "SC",
    name: "Santa Catarina",
    sysName: "Sistema de Defesa Agropecuária de Santa Catarina",
    sysShortName: "SIDASC",
    prodUrl: "https://www.sc.gov.br/",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Bandeira_de_Santa_Catarina.svg/800px-Bandeira_de_Santa_Catarina.svg.png",
  },{
    uf: "SP",
    name: "São Paulo",
    sysName: "Sistema de Defesa Agropecuária de São Paulo",
    sysShortName: "SIDASP",
    prodUrl: "https://www.sp.gov.br/",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Bandeira_do_estado_de_S%C3%A3o_Paulo.svg/780px-Bandeira_do_estado_de_S%C3%A3o_Paulo.svg.png",
  },{
    uf: "SE",
    name: "Sergipe",
    sysName: "Sistema de Defesa Agropecuária de Sergipe",
    sysShortName: "SIDASE",
    prodUrl: "https://www.se.gov.br/",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Bandeira_de_Sergipe.svg/800px-Bandeira_de_Sergipe.svg.png",
  },{
    uf: "TO",
    name: "Tocantins",
    sysName: "Sistema de Defesa Agropecuária de Tocantins",
    sysShortName: "SIDATO",
    prodUrl: "https://sidato-hom.adapec.to.gov.br/",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Bandeira_do_Tocantins.svg/512px-Bandeira_do_Tocantins.svg.png",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
  }
  if (req.query.uf) {
    const state = states.find((state) => state.uf === req.query.uf);
    res.status(200).json(state);
  }
  res.status(200).json(states);
}

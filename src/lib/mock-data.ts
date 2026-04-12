export interface Cliente {
  id: string;
  nome: string;
  endereco: string;
  consumoKwh: number;
  percentual: number;
  receitaBruta: number;
  custoEnel: number;
  lucro: number;
}

export interface Usina {
  id: string;
  nome: string;
  potenciaKwp: number;
  taxaMinima: number;
  tarifaEnel: number;
  medidor: string;
}

export interface RelatorioMensal {
  id: string;
  mesReferencia: string;
  mesPagamento: string;
  resultadoLiquido: number;
  receitaBruta: number;
  geracaoTotal: number;
  energiaVendidaKwh: number;
  energiaDisponivelKwh: number;
  percentualVendido: number;
  excedenteKwh: number;
  custosEnel: number;
  taxasMinimas: number;
  lucroBruto: number;
  clientes: Cliente[];
  usinas: Usina[];
}

export interface Investidor {
  id: string;
  nome: string;
  email: string;
  localizacao: string;
  investimentoTotal: number;
  dataInicio: string;
  paybackMeses: number;
  rentabilidadeAnual: number;
  mesesDecorridos: number;
  totalRecuperado: number;
}

export const investidor: Investidor = {
  id: "1",
  nome: "Rafael Sindeaux",
  email: "rafael@email.com",
  localizacao: "Aracoiaba-CE",
  investimentoTotal: 180000,
  dataInicio: "2026-01-01",
  paybackMeses: 56,
  rentabilidadeAnual: 21.72,
  mesesDecorridos: 2,
  totalRecuperado: 6502.44,
};

export const relatorios: RelatorioMensal[] = [
  {
    id: "2",
    mesReferencia: "Fevereiro 2026",
    mesPagamento: "Março 2026",
    resultadoLiquido: 3251.22,
    receitaBruta: 6341.36,
    geracaoTotal: 7500,
    energiaVendidaKwh: 6291,
    energiaDisponivelKwh: 7500,
    percentualVendido: 83.9,
    excedenteKwh: 1209,
    custosEnel: 2958.07,
    taxasMinimas: 132.07,
    lucroBruto: 3383.29,
    clientes: [
      {
        id: "c1",
        nome: "Boho Studio",
        endereco: "Rua das Flores, 123 - Fortaleza",
        consumoKwh: 2150,
        percentual: 34.2,
        receitaBruta: 2021.00,
        custoEnel: 892.40,
        lucro: 1128.60,
      },
      {
        id: "c2",
        nome: "Maria Helena Costa",
        endereco: "Av. Santos Dumont, 456 - Fortaleza",
        consumoKwh: 1380,
        percentual: 21.9,
        receitaBruta: 1297.20,
        custoEnel: 587.30,
        lucro: 709.90,
      },
      {
        id: "c3",
        nome: "Restaurante Sabor & Arte",
        endereco: "Rua do Comércio, 789 - Aracoiaba",
        consumoKwh: 1120,
        percentual: 17.8,
        receitaBruta: 1052.80,
        custoEnel: 498.60,
        lucro: 554.20,
      },
      {
        id: "c4",
        nome: "João Pedro Almeida",
        endereco: "Rua Nova, 321 - Aracoiaba",
        consumoKwh: 890,
        percentual: 14.1,
        receitaBruta: 836.60,
        custoEnel: 412.50,
        lucro: 424.10,
      },
      {
        id: "c5",
        nome: "Farmácia Popular Plus",
        endereco: "Av. Principal, 654 - Aracoiaba",
        consumoKwh: 751,
        percentual: 11.9,
        receitaBruta: 1133.76,
        custoEnel: 567.27,
        lucro: 566.49,
      },
    ],
    usinas: [
      {
        id: "u1",
        nome: "Usina Aracoiaba I",
        potenciaKwp: 30,
        taxaMinima: 66.04,
        tarifaEnel: 0.94,
        medidor: "MED-001",
      },
      {
        id: "u2",
        nome: "Usina Aracoiaba II",
        potenciaKwp: 30,
        taxaMinima: 66.03,
        tarifaEnel: 0.94,
        medidor: "MED-002",
      },
    ],
  },
  {
    id: "1",
    mesReferencia: "Janeiro 2026",
    mesPagamento: "Fevereiro 2026",
    resultadoLiquido: 3251.22,
    receitaBruta: 6200.10,
    geracaoTotal: 7200,
    energiaVendidaKwh: 6050,
    energiaDisponivelKwh: 7200,
    percentualVendido: 84.0,
    excedenteKwh: 1150,
    custosEnel: 2820.50,
    taxasMinimas: 132.07,
    lucroBruto: 3247.53,
    clientes: [
      {
        id: "c1",
        nome: "Boho Studio",
        endereco: "Rua das Flores, 123 - Fortaleza",
        consumoKwh: 2080,
        percentual: 34.4,
        receitaBruta: 1955.20,
        custoEnel: 865.00,
        lucro: 1090.20,
      },
      {
        id: "c2",
        nome: "Maria Helena Costa",
        endereco: "Av. Santos Dumont, 456 - Fortaleza",
        consumoKwh: 1320,
        percentual: 21.8,
        receitaBruta: 1240.80,
        custoEnel: 560.10,
        lucro: 680.70,
      },
      {
        id: "c3",
        nome: "Restaurante Sabor & Arte",
        endereco: "Rua do Comércio, 789 - Aracoiaba",
        consumoKwh: 1080,
        percentual: 17.9,
        receitaBruta: 1015.20,
        custoEnel: 478.40,
        lucro: 536.80,
      },
      {
        id: "c4",
        nome: "João Pedro Almeida",
        endereco: "Rua Nova, 321 - Aracoiaba",
        consumoKwh: 850,
        percentual: 14.0,
        receitaBruta: 799.00,
        custoEnel: 395.20,
        lucro: 403.80,
      },
      {
        id: "c5",
        nome: "Farmácia Popular Plus",
        endereco: "Av. Principal, 654 - Aracoiaba",
        consumoKwh: 720,
        percentual: 11.9,
        receitaBruta: 1189.90,
        custoEnel: 521.80,
        lucro: 536.03,
      },
    ],
    usinas: [
      {
        id: "u1",
        nome: "Usina Aracoiaba I",
        potenciaKwp: 30,
        taxaMinima: 66.04,
        tarifaEnel: 0.94,
        medidor: "MED-001",
      },
      {
        id: "u2",
        nome: "Usina Aracoiaba II",
        potenciaKwp: 30,
        taxaMinima: 66.03,
        tarifaEnel: 0.94,
        medidor: "MED-002",
      },
    ],
  },
];

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("pt-BR").format(value);
}

interface dataCons {
  id: number;
  code: string;
  immat: string;
  typeVeh: string;
  marque: string;
  qte: number;
}

interface dataconsDate {
  id: number;
  code: string;
  immat: string;
  typeVeh: string;
  marque: string;
  qte: number;
  datej: Date;
}

export type { dataCons, dataconsDate };

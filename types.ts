export interface ApologyData {
  recipientName: string;
  reason: string;
  tone: ApologyTone;
  imageUrl: string | null;
}

export enum ApologyTone {
  SINCERE = 'Tulus & Mendalam',
  FUNNY = 'Lucu & Gemas',
  POETIC = 'Puitis & Romantis',
  FORMAL = 'Serius & Formal'
}

export interface GeneratedApology {
  text: string;
  timestamp: number;
}
export interface Character {
  id: number;
  name: string;
  field:
    | "Político"
    | "Deportista"
    | "Músico"
    | "Actor"
    | "Comediante"
    | "Periodista"
    | "Presentador de TV"
    | "Escritor";
  gender: "Masculino" | "Femenino" | "Non-binario";
  birthYear: number;
  stateOfOrigin: string;
  status: "Vivo" | "Fallecido";
  internationalReach: "Local" | "Latinoamérica" | "Global";
  peakEra: string;
  disciplineGenre: string;
  imageUrl?: string;
}

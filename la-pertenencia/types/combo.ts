export interface ComboWine {
  id: string;
  marca: string;
  image: string;
}

export interface Combo {
  id: string;
  name: string;
  description: string[];
  wines: ComboWine[];
  price: number;
  image: string; // Imagen de los vinos del combo
  backgroundImage: string; // Imagen de fondo
}

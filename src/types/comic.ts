export interface Person {
  name: string;
}

export interface ComicBook {
  id: number;
  title: string;
  authors: Person[];
  languages: string[];
  download_count: number;
  pointCost: number;
  formats: {
    'image/jpeg'?: string;
  };
  subjects: string[];
  synopsis?: string;
  bookshelves?: string[];
  copyright?: boolean;
  media_type?: string;
}
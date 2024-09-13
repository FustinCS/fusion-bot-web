export interface Watch {
    Show: {
        show_id: number;
        name: string | null;
        season: number;
        episodes: number | null;
        image: string;
    };
    user_id: string;
    show_id: number;
    current_episode: number;
    date_updated: Date | null;
    current_season: number;
    total_seasons: number;
  }

export interface TVShow {
    show_id: number,
    name: string,
    image: string;
    totalSeasons: number; 
    seasons: {season: number, episodeCount: number}[];
}
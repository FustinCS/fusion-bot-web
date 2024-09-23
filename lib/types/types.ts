export interface WatchedTVShow {
    Show: {
        name: string | null;
        season: number;
        episode_count: number | null;
        image: string | null;
    };
    current_episode: number | null;
    current_season: number;
    show_id: number;
}

export interface TVShow {
    show_id: number,
    name: string,
    image: string;
    totalSeasons: number; 
    seasons: {season: number, episodeCount: number}[];
}
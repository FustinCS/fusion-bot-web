export interface WatchedTVShow {
    Show: {
        name: string | null;
        season: number;
        episodeCount: number | null;
        image: string | null;
    };
    currentEpisode: number | null;
    currentSeason: number;
    showId: number;
    updatedAt: Date;
}

export interface TVShow {
    showId: number,
    name: string,
    image: string;
    totalSeasons: number; 
    seasons: {season: number, episodeCount: number}[];
}
export interface WatchedTVShow {
    TVShow: {
        showId: number;
        name: string;
        season: number;
        totalEpisodes: number;
        totalSeasons: number;
        image: string;
        
    }
    userId: string;
    currentEpisode: number;
    dateUpdated: Date;
    currentSeason: number;
}

export interface TVShow {
    show_id: number,
    name: string,
    image: string;
    totalSeasons: number; 
    seasons: {season: number, episodeCount: number}[];
}
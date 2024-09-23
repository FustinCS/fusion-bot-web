import { TVShow } from "../lib/types/types";

export default async function fetchShowData(showName: string): Promise<TVShow> {
    // Fetch show data
    const showResponse = await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${showName}`);
    const showData = await showResponse.json();

    const showId = showData.id;
    const name = showData.name;
    const image = showData.image?.medium || ""; // Handle case where image might be undefined

    // Fetch season data
    const seasonResponse = await fetch(`https://api.tvmaze.com/shows/${showId}/seasons`);
    const seasonData = await seasonResponse.json();

    const totalSeasons = seasonData.length;

    const seasons = []

    for (const season of seasonData) {
        const seasonNumber = season.number;
        const episodes = season.episodeOrder;

        seasons.push({
            season: seasonNumber,
            episodeCount: episodes
        });
    }

    const result: TVShow = {
        showId: showId,
        name: name,
        image: image,
        totalSeasons: totalSeasons,
        seasons: seasons
    };

    return result;
}


const sortTweets = (tweetData, sortKey = 'numRetweets', asc = true) => {

    sortKey = sortKey ? sortKey : 'numRetweets';

    return tweetData.sort((tweet1, tweet2) => {
        return asc ? tweet1[sortKey] - tweet2[sortKey] : tweet2[sortKey] - tweet1[sortKey];
    });
}

export {
    sortTweets,
}



const sortTweets = (tweetData, sortKey = 'numRetweets', asc = true) => {
    return tweetData.sort((tweet1, tweet2) => {
        return asc ? tweet1[sortKey] - tweet2[sortKey] : tweet2[sortKey] - tweet1[sortKey];
    });
}

export {
    sortTweets,
}

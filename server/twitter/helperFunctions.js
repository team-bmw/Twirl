
// Shared functions for twitter API backend

// createSearchArray: create an array of search objects, each with query term and search_id
const createSearchArray = metadata => {

    const searchObj = metadata.reduce((acc, m) => {
        if (!acc[m.search_id]) acc[m.search_id] = m.query;
        return acc;
    }, {});

    return Object.keys(searchObj).map(key => {
        return {
            search_id: Number(key),
            query: searchObj[key],
        }
    });
};

// createQueryString: create full query string, based on search terms and type of search
const createQueryString = (q, searchType) => {
    if (searchType === 'or') return q.split(' ').join(' OR ');
    if (searchType === 'exact') return `"${q}"`;
    if (searchType === 'hashtag') return `#${q}`;
    if (searchType === 'userFrom') return `from:${q}`;
    if (searchType === 'userTo') return `to:${q}`;
    if (searchType === 'mention') return `@${q}`;
    return q;
};

// getNextMaxId: parse tweet to get "next_results", to use as max_id for next fetch
const getNextMaxId = str => {
    if (str) {
        const terms = str.replace('?', '').split('&');
        const maxIdTerm = terms.find(term => term.includes('max_id'));
        return maxIdTerm ? maxIdTerm.split('=')[1] : null;
    } else {
        return -1;
    }
};

// subtractDays: calculate date and return twitter style date string
const subtractDays = (startingDate, days) => {
    startingDate.setDate(startingDate.getDate() - days);
    const dateArr = new Date(startingDate).toLocaleDateString().split('/');
    return `${dateArr[2]}-${dateArr[0]}-${dateArr[1]}`;
}

module.exports = {
    createSearchArray,
    createQueryString,
    getNextMaxId,
    subtractDays,
}

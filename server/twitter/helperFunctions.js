
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

const createQueryString = (q, searchType) => {
    if (searchType === 'or') return q.split(' ').join(' OR ');
    if (searchType === 'exact') return `"${q}"`;
    if (searchType === 'hashtag') return `#${q}`;
    if (searchType === 'userFrom') return `from:${q}`;
    if (searchType === 'userTo') return `to:${q}`;
    if (searchType === 'mention') return `@${q}`;
    return q;
};

// // parse "next_results" string from search_metadata to get max_id term for next search
const getNextMaxId = str => {
    if (str) {
        const terms = str.replace('?', '').split('&');
        const maxIdTerm = terms.find(term => term.includes('max_id'));
        return maxIdTerm ? maxIdTerm.split('=')[1] : null;
    } else {
        return -1;
    }
};

module.exports = {
    createSearchArray,
    createQueryString,
    getNextMaxId,
}

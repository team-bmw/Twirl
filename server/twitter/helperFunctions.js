
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

module.exports = {
    createSearchArray
}

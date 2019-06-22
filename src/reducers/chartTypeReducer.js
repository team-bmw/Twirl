// Action types
const UPDATE_CHART_TYPE = 'UPDATE_CHART_TYPE'

// Action creators
export const updateChartType = chartType => {
    return {
        type: UPDATE_CHART_TYPE,
        chartType,
    };
};

const initialState = 'wordcloud';

// Reducer
export const chartType = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CHART_TYPE:
            return action.chartType;
        default:
            return state;
    }
};

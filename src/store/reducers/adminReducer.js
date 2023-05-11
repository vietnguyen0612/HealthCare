import actionTypes from "../actions/actionTypes";

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [],
    allRequiredDoctorInfo: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copy = { ...state };
            copy.isLoadingGender = true;
            return {
                ...copy,
            };

        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = { ...state };
            copyState.genders = action.data;
            copyState.isLoadingGender = false;

            return {
                ...copyState,
            };
        case actionTypes.FETCH_GENDER_FAILED:
            let stateCopy = { ...state };
            stateCopy.isLoadingGender = false;
            stateCopy.gender = [];
            return {
                ...stateCopy,
            };
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;

            return {
                ...state,
            };
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;

            return {
                ...state,
            };
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.dataDoctors;
            return {
                ...state,
            };
        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            state.topDoctors = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctors = action.dataDr;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            state.allDoctors = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
            state.allRequiredDoctorInfo = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED:
            state.allRequiredDoctorInfo = [];
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default adminReducer;

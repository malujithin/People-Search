import { all, put, take, select, takeEvery } from 'redux-saga/effects';
import {
    getSearchResults,
    getIndividualDetail,
    getDirectReporteeCount,
    getDirectReportee,
    getChainOfCommand,
    getLevelReportee,
    getUpLevelReportee,
    getManagerDetails,
    getLoggedInUser,
    getUserPhoto,
    getLogoutUser,
    changeUserImage
} from '../api/endpoints';
import { actions } from '../state/reducer';

function* watchAndLog() {
    while (true) {
        const action = yield take('*');
        const state = yield select();
        console.log('Action:', action, 'State:', state);
    }
}

function* getLoggedInUsers() {
    try {
        const data = yield getLoggedInUser().then(dataFromAPI => dataFromAPI.data);
        yield put(actions.setLoggedInUser(data));
    } catch (error) {
        console.log(error);
    }
}

function* getUserPhotos(gpid) {
    try {
        const data = yield getUserPhoto(gpid).then(dataFromAPI => dataFromAPI.data);
        yield put(actions.setUserPhoto(data));
    } catch (error) {
        console.log(error);
    }
}

function* getAllLogoutUser() {
    try {
        const data = yield getLogoutUser().then(dataFromAPI => dataFromAPI.data);
        yield put(actions.setLogoutUser(data));
    } catch (error) {
        console.log(error);
    } finally {
        window.location.reload();
    }
}

function* getAllSearchResults(payload) {
    try {
        yield put(actions.setLoader(0));
        const data = yield getSearchResults(payload).then(dataFromAPI => dataFromAPI.data);
        yield put(actions.setSearchResults(data));
        yield put(actions.setLoader(1));
    } catch (error) {
        console.log(error);
    }
}

function* getIndividualDetails(gpid) {
    try {
        yield put(actions.setLoader(0));
        const data = yield getIndividualDetail(gpid).then(dataFromAPI => dataFromAPI.data);
        yield put(actions.setIndividualDetails(data));
        yield put(actions.setLoader(1));
    } catch (error) {
        console.log(error);
    }
}
function* getAllManagerDetails(managerId) {
    try {
        const data = yield getManagerDetails(managerId).then(dataFromAPI => dataFromAPI.data);
        yield put(actions.setManagerDetails(data));
    } catch (error) {
        console.log(error);
    }
}
function* getAllDirectReporteeCount(gpid) {
    try {
        const data = yield getDirectReporteeCount(gpid).then(dataFromAPI => dataFromAPI.data);
        yield put(actions.setDirectReporteeCount(data));
        yield put(actions.setLoader(1));
    } catch (error) {
        console.log(error);
    }
}

function* getAllDirectReportee({ payload }) {
    try {
        // yield put(actions.setLoader(0))
        const data = yield getDirectReportee(payload.gpid).then(dataFromAPI => dataFromAPI.data);
        yield put(actions.setDirectReportee({ data: data, payload: payload }));

       
        // yield put(actions.setLoader(1))
    } catch (error) {
        console.log(error);
    }
}

function* getAllLevelDirectReportee({ payload }) {
    try {
        yield put(actions.setLoader(0));
        const data = yield getLevelReportee(payload.gpid, payload.levelReports).then(dataFromAPI => dataFromAPI.data);
        if(parseInt(data.status) === 200){
            yield put(actions.setLevelReportee({ data: data, gpid: payload.gpid, levelReports: payload.levelReports }));
        } else {
            yield put(actions.setLevelReportee({ data: {result: []}, gpid: payload.gpid, levelReports: payload.levelReports }));
            yield put(actions.setDataNotFound(true))
        }
        // yield put(actions.setLevelReportee(data))
        yield put(actions.setLoader(1));
    } catch (error) {
        console.log(error);
    }
}
function* getAllUpLevelReportee(gpid) {
    try {
        yield put(actions.setLoader(0));
        const data = yield getUpLevelReportee(gpid).then(dataFromAPI => dataFromAPI.data);
        yield put(actions.setUpLevelReportee({ data: data, gpid: gpid.payload }));
        yield put(actions.setLoader(1));
    } catch (error) {
        console.log(error);
    }
}

function* getAllChainOfCommand(gpid) {
    try {
        yield put(actions.setLoader(0));
        const data = yield getChainOfCommand(gpid).then(dataFromAPI => dataFromAPI.data);
        if(parseInt(data.status) === 200) {
            yield put(actions.setChainOfcommand(data));
        } else {
            yield put(actions.setChainOfcommand({data: {result: []}}));
           yield put(actions.setDataNotFound(true)) 
        }
        yield put(actions.setLoader(1));
        
    } catch (error) {
        console.log(error);
    }
}

function* changeImage(payload) {
    try {
        const data = yield changeUserImage(payload).then(dataFromAPI => dataFromAPI.data);
        if (data.message === 'Photo Uploaded successfully') {
               yield put(actions.postSuccess(true));
        }
            alert("Photo Uploaded successfully. Check after some time..!!");        
    } catch (error) {
        alert("Photo upload failed.Try again..!!");
    }
}
export default function* rootSaga() {
    yield all([
        watchAndLog(),
        takeEvery('GET_SEARCH_RESULTS', getAllSearchResults),
        takeEvery('GET_INDIVIDUAL_DETAILS', getIndividualDetails),
        takeEvery('GET_DIRECT_REPORTEE_COUNT', getAllDirectReporteeCount),
        takeEvery('GET_DIRECT_REPORTEE', getAllDirectReportee),
        takeEvery('GET_CHAIN_OF_COMMAND', getAllChainOfCommand),
        takeEvery('GET_LEVEL_REPORTEE', getAllLevelDirectReportee),
        takeEvery('GET_UP_LEVEL_REPORTEE', getAllUpLevelReportee),
        takeEvery('GET_INDIVIDUAL_MANAGER_DETAILS', getAllManagerDetails),
        takeEvery('GET_LOGGED_IN_USERS', getLoggedInUsers),
        takeEvery('GET_USER_PHOTOS', getUserPhotos),
        takeEvery('GET_LOGOUT_USER', getAllLogoutUser),
        takeEvery('UPDATE_PHOTOS', changeImage)
    ]);
}

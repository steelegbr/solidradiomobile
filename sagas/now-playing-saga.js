/**
 * Now Playing Saga.
 */

import crashlytics from '@react-native-firebase/crashlytics';
import { eventChannel, END } from 'redux-saga';
import { select, call, cancelled, takeEvery, all, put, take } from 'redux-saga/effects';
import { nowPlayingFailure, nowPlayingSuccess, nowPlayingUpdate, NOW_PLAYING_FAIL, STATION_LOAD_SUCCESS } from '../reducers/actions';

/**
 * Creates a web socket connection to a station.
 * @param {string} server The server to connect to.
 * @param {string} station The station to open the socket for.
 */

function connectToStationSocket(server, station) {
    return new Promise((resolve, reject) => {

        const uriEncodedStationName = encodeURI(station);
        let socket = new WebSocket(`https://${server}/nowplaying/${uriEncodedStationName}/`);

        socket.onopen = () => {
            resolve(socket);
        };

        socket.onerror = (error) => {
            reject(error);
        };

    });
}

/**
 * Creates a Redux Saga event channel for a web socket.
 * @param {WebSocket} socket The socket to create the event channel from.
 */

function createStationSocketChannel(socket) {
    return eventChannel(emit => {

        // Pass websocket messages straight though

        socket.onmessage = (event) => {
            emit(event.data);
        };

        // Close the channel as appropriate

        socket.onclose = () => {
            emit(END);
        };

        const unsubscribe = () => {
            socket.onmessage = null;
        };

        return unsubscribe;

    });
}

/**
 * The actual now playing saga for a station.
 * @param {action} action The station load success action.
 */

function* nowPlayingSaga(action) {

    // Get some basics together

    let stationName = action.payload.data.name;
    const state = yield select();
    const server = state.api.server;
    let socket;
    let channel;

    try {

        // Make our connection

        socket = yield call(connectToStationSocket, server, stationName);
        channel = yield call(createStationSocketChannel, socket);

        // Let everyone know we're up and running

        yield put(nowPlayingSuccess(stationName));

        // Handle messages as they come in

        while (true) {

            let payload = yield take(channel);
            let songUpdate = JSON.parse(payload);

            let artist = songUpdate.song.display_artist;
            let title = songUpdate.song.title;
            let artUrl = `https://${server}${songUpdate.song.image}`;

            yield put(nowPlayingUpdate(stationName, artist, title, artUrl));

        }

    } catch (error) {
        console.log(error);
        yield put(nowPlayingFailure(stationName, error));
    } finally {

        // Clean up the connection

        if (yield cancelled()) {
            channel.close();
            socket.close();
        } else {
            yield put(nowPlayingFailure(stationName, Error(`Web socket closed for ${stationName}.`)));
        }

    }

}

/**
 * Handles errors from the now playing saga.
 * @param {action} action The now playing failure action.
 */

function* nowPlayingErrorSaga(action) {

    // Record the error locally

    console.log(`Encountered now playing error for ${action.station}.`);
    console.log(action.error);

    // And remotely

    crashlytics().recordError(action.error);

}

/**
 * Watches for launching the now playing saga.
 */

export function* watchNowPlaying() {
    yield all([
        takeEvery(STATION_LOAD_SUCCESS, nowPlayingSaga),
        takeEvery(NOW_PLAYING_FAIL, nowPlayingErrorSaga)
    ]);
}
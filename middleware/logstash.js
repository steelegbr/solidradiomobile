/**
    Solid Radio Mobile App
    Copyright (C) 2020-2021 Marc Steele

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import axios from 'axios';
import crashlytics from '@react-native-firebase/analytics';

const logstashLogger = (store) => (next) => (action) => {

    // Get the current state

    const current = store.getState();

    // Pass the request down the line

    const result = next(action);

    // Get the new state

    const new_state = store.getState();

    // Put it all together and log it out if we're configured

    if ('logstash' in current) {

        const combined = {
            current: JSON.stringify(current),
            action: JSON.stringify(action),
            new: JSON.stringify(new_state)
        };

        const url = `${current.logstash.url}${current.logstash.index}`;

        return axios.post(
            url,
            combined,
            {
                auth: {
                    username: current.logstash.username,
                    password: current.logstash.password
                }
            }
        ).then(function (response) {
            // NOP - Keep the log empty!
            //console.log(`Axios Logstash Response: ${response.data}`);
        }).catch(function (error) {
            console.log(`Axios Logstash Error: ${error}`);
            crashlytics().recordError(error);
        });


    } else {
        return result;
    }

}

export default logstashLogger
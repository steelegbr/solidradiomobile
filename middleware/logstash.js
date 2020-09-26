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
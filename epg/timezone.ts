import { DateTime, Duration } from 'luxon';
import { isNullOrUndefined } from 'util';

/**
 * Helper class for looking up EPG entries by day and time.
 */

export class DayTime {
    day: number;
    time;

    constructor(
        timestamp: Date,
        source_timezone: string,
        target_timezone: string
    ) {

        // Convert our time between zones

        const converted_time = DateTime.fromJSDate(
            timestamp, 
            { 
                zone: source_timezone 
            }
        ).setZone(target_timezone);

        // Work out the interval

        this.day = converted_time.weekday;
        this.time = Duration.fromObject({
            hours: converted_time.hour,
            minutes: converted_time.minute
        });

    }

}

/**
 * Gets the EPG entry for a specified day and time.
 * @param daytime The day and time we want an EPG entry for.
 * @param epg The EPG to search through.
 * @returns The matching EPG entry.
 */

export function getEpgEntry(daytime: DayTime, epg: object) {

    // Sanity checks

    if (isNullOrUndefined(daytime) || isNullOrUndefined(epg)) {
        throw new Error('You must supply a day/time and EPG to get the entry from.');
    }

    if (daytime.day < 0 || daytime.day >= 7) {
        throw new RangeError(`The day you specified ${daytime.day} is not between 0 and 6.`)
    }

    // Perform the lookup

    let entry = null;
    let epg_day = epg[daytime.day];
    const start_regex = /([0-9]{2}):([0-9]{2}):([0-9]{2})/;

    epg_day.forEach(current_entry => {

        // Convert the hours/minutes/seconds to duration

        let start_groups = current_entry.start.match(start_regex);
        let start_duration = Duration.fromObject({
            hours: start_groups[1],
            minutes: start_groups[2],
            seconds: start_groups[3]
        });

        if (start_duration < daytime.time) {
            entry = current_entry;
        }
        
    });

    return entry;

}
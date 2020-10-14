import { DateTime, Duration } from 'luxon';

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

        this.day = converted_time.weekday - 1;
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

    if (daytime == null || epg == null) {
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

/**
 * Converts an EPG time to a human friendly time.
 * @param epgTime The time from the EPG.
 */

export function epgTimeToFriendly(epgTime: string) {

    // Sanity checks

    if (!epgTime) {
        return "";
    }

    // Make the conversion

    const time_regex = /([0-9]{2}):([0-9]{2}):([0-9]{2})/;
    let time_groups = epgTime.match(time_regex);

    return `${time_groups[1]}:${time_groups[2]}`;


}

/**
 * Converts an index to a day of the week.
 * @param index The index for day of the week.
 */

export function dayFromIndex(index: number) {

    let dateTime = DateTime.local();
    
    dateTime = dateTime.set({
        weekday: index + 1
    });

    return dateTime.toFormat('EEE');

}

/**
 * Converts an EPG time to a local, human friendly time.
 * @param epgTime The time fron the EPG.
 * @param day The day the EPG entry is for.
 */

export function epgTimeToLocal(epgTime: string, day: number, localTimezone: string, epgTimezone: string) {

    // Work out when the show will air in the station timezone

    const time_regex = /([0-9]{2}):([0-9]{2}):([0-9]{2})/;
    let time_groups = epgTime.match(time_regex);

    let epgTimeConverted = DateTime.fromJSDate(
        new Date(),
        {
            zone: epgTimezone
        }
    );

    epgTimeConverted = epgTimeConverted.set({
        weekday: day + 1,
        hour: Number.parseInt(time_groups[1]),
        minute: Number.parseInt(time_groups[2])
    });

    // Force a conversion to local time and print it

    epgTimeConverted = epgTimeConverted.setZone(localTimezone);
    return epgTimeConverted.toFormat('EEE HH:mm');

}

/**
 * Generates a time slug for the supplied show.
 * @param show The show to generate the slug for.
 * @param day The day the show is airing.
 * @param userTimezone The user's timezone.
 * @param stationTimezone  The station timezone.
 * @param includeDay Indicates if the day should be included.
 */

export function showTimeSlug(show, day, userTimezone, stationTimezone, includeDay) {

    // Work out if we're in different time zones

    let friendlyTime = null;
            
    if (userTimezone == stationTimezone) {

        // Show a friendly time slug

        friendlyTime = epgTimeToFriendly(show.start);

    } else {

        // Show both the friendly time slug and a conversion to local

        friendlyTime = `${epgTimeToFriendly(show.start)} [${epgTimeToLocal(show.start, day, userTimezone, stationTimezone)}]`;

    }

    // Pre-pend the day as required

    if (includeDay) {
        return `${dayFromIndex(day)} ${friendlyTime}`;
    } else {
        return friendlyTime;
    }

}
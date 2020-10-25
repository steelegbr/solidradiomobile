/**
 * Tests the EPG utilities.
 */

import { DayTime, getEpgEntry, epgTimeToFriendly, epgTimeToLocal, dayFromIndex, showTimeSlug } from '../epg/timezone';
import { Duration } from 'luxon';

describe('day-time', () => {

    it.each`
    unix | src_timezone | tgt_timezone | day | hour | minute
    ${1595950245000} | ${'America/Los_Angeles'} | ${'Europe/London'} | ${1} | ${16} | ${30}
    ${1596025713000} | ${'Europe/London'} | ${'America/New_York'} | ${2} | ${8} | ${28}
    `('day-time-convert-successful', ({ unix, src_timezone, tgt_timezone, day, hour, minute }) => {

        // Arrange

        date = new Date(unix);
        time = Duration.fromObject({
            hours: hour,
            minutes: minute
        });

        // Act

        converted = new DayTime(date, src_timezone, tgt_timezone);

        // Assert

        expect(converted.day).toBe(day);
        expect(converted.time).toStrictEqual(time);

    });

});

describe('epg-lookup', () => {

    it('invalid-daytime', () => {

        // Arrange

        epg = {}

        // Act and Assert

        expect(() => {
            getEpgEntry(null, epg);
        }).toThrow();

    });

    it('invalid-epg', () => {

        // Arrange

        daytime = new DayTime(new Date(), 'Europe/London', 'Europe/London');

        // Act and Assert

        expect(() => {
            getEpgEntry(daytime, null);
        }).toThrow();

    });

    it.each`
    day
    ${-1}
    ${7}
    `('invalid-day', ({ day }) => {

        // Arrange

        epg = {}
        daytime = new DayTime(new Date(), 'Europe/London', 'Europe/London');
        daytime.day = day

        // Act and Assert

        expect(() => {
            getEpgEntry(daytime, epg);
        }).toThrow();

    });

    it.each`
    unix | src_timezone | tgt_timezone | expected_show
    ${1595950245000} | ${'America/Los_Angeles'} | ${'Europe/London'} | ${'Afternoons'}
    ${1596025713000} | ${'Europe/London'} | ${'America/New_York'} | ${'Breakfast Without the Waffle'}
    `('valid-lookup', ({ unix, src_timezone, tgt_timezone, expected_show }) => {

        // Arrange

        daytime = new DayTime(new Date(unix), src_timezone, tgt_timezone)
        epg = require('./Epg-Test.json');

        // Act

        show = getEpgEntry(daytime, epg);

        // Assert

        expect(show).not.toBeNull();
        expect(show.title).toBe(expected_show);

    });

});

describe('friendly-time-conversion', () => {

    it.each`
    epgTime | friendlyTime
    ${'08:00:30'} | ${'08:00'}
    ${'23:59:59'} | ${'23:59'}
    `('friendly-local', ({ epgTime, friendlyTime }) => {

        // Arrange

        // Act

        const converted = epgTimeToFriendly(epgTime);

        // Assert

        expect(converted).toStrictEqual(friendlyTime);

    });

    it('friendly-local-fail', () => {

        // Arrange 

        // Act

        const converted = epgTimeToFriendly(null);

        // Assert

        expect(converted).toStrictEqual('');

    });

    it.each`
    epgTime | day | localTimezone | epgTimezone | expected
    ${"08:00:00"} | ${6} | ${'Europe/London'} | ${'America/Los_Angeles'} | ${'Sun 16:00'}
    ${"16:00:00"} | ${6} | ${'America/Los_Angeles'} | ${'Europe/London'} | ${'Sun 08:00'}
    `('friendly-overseas', ({ epgTime, day, localTimezone, epgTimezone, expected }) => {

        // Arrange

        const referenceDate = new Date(1601456400000)

        // Act

        const converted = epgTimeToLocal(epgTime, day, localTimezone, epgTimezone, referenceDate);

        // Assert

        expect(converted).toStrictEqual(expected)

    });

    it.each`
    index | day
    ${0} | ${'Mon'}
    ${1} | ${'Tue'}
    ${2} | ${'Wed'}
    ${3} | ${'Thu'}
    ${4} | ${'Fri'}
    ${5} | ${'Sat'}
    ${6} | ${'Sun'}
    `('day-from-index', ({ index, day }) => {

        // Arrange

        // Act

        const convertedDay = dayFromIndex(index);

        // Assert

        expect(convertedDay).toBe(day);

    });

    it.each`
    epgTime | day | localTimezone | epgTimezone | expected | includeDay
    ${"08:00:00"} | ${6} | ${'Europe/London'} | ${'America/Los_Angeles'} | ${'08:00 [Sun 16:00]'} | ${false}
    ${"16:00:00"} | ${6} | ${'America/Los_Angeles'} | ${'Europe/London'} | ${'16:00 [Sun 08:00]'} | ${false}
    ${"08:00:00"} | ${6} | ${'Europe/London'} | ${'America/Los_Angeles'} | ${'Sun 08:00 [Sun 16:00]'} | ${true}
    ${"16:00:00"} | ${6} | ${'America/Los_Angeles'} | ${'Europe/London'} | ${'Sun 16:00 [Sun 08:00]'} | ${true}
    ${"16:00:00"} | ${6} | ${'Europe/London'} | ${'Europe/London'} | ${'16:00'} | ${false}
    ${"16:00:00"} | ${6} | ${'Europe/London'} | ${'Europe/London'} | ${'Sun 16:00'} | ${true}
    `('show-time-slug', ({ epgTime, day, localTimezone, epgTimezone, expected, includeDay }) => {

        // Arrange

        const show = {
            start: epgTime
        }

        const referenceDate = new Date(1601456400000)

        // Act

        const converted = showTimeSlug(show, day, localTimezone, epgTimezone, includeDay, referenceDate);

        // Assert

        expect(converted).toStrictEqual(expected)

    });

});
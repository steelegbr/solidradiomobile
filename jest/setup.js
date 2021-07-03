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

/**
 * Various mocks and setup steps that can't be performed automagically.
 */

// Firebase

jest.mock("@react-native-firebase/admob", () => ({
    AdsConsentStatus: {
        UNKNOWN: 0,
        NON_PERSONALIZED: 1,
        PERSONALISED: 2
    },
    TestIds: {
        BANNER: "bannerTestId"
    },
    BannerAdSize: {
        SMART_BANNER: "SMART_BANNER"
    },
    BannerAd: "BannerAd"
}));

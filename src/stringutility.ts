/*
 * Copyright (c) 2018 Yellicode
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
export class StringUtility {
    public static wordWrap(str: string, width: number): string[] {
        const result: string[] = [];

        if (width < 1 || str == null || str.length <= width)
            return result;

        const len = str.length;
        let rangeMax = len - width; // we don't need to split after this position
        let rangeStart = 0;
        let subString: string;
        while (rangeStart < rangeMax) {
            let subLength: number;
            let rangeEnd = rangeStart + width;
            // First test for newlines in this range. If so, don't split on word break but on the newline.
            var ixNewLine = str.indexOf("\n", rangeStart);
            if (ixNewLine > -1 && ixNewLine > rangeStart && ixNewLine < rangeEnd) {
                subLength = ixNewLine - rangeStart;
                subString = str.substr(rangeStart, subLength);
                rangeStart = rangeStart + subLength + 1;
                result.push(subString);
                continue;
            }
            // No newlines. Find the last wordbreak in the range.
            let ix = str.lastIndexOf(" ", rangeEnd); // find the last word break
            let rangeStartNext: number = 0;
            if (ix > -1 && ix != rangeStart - 1) {
                subLength = ix - rangeStart;
                if (subLength > 0) {
                    rangeStartNext = rangeStart + subLength + 1; // +1 to skip the whitespace
                }
                //else { // not needed anymore because of the maxPos check
                //    sub = str.substr(pos);
                //    newPos = len + 1;
                //}
            } else {
                // The range has no whitespace. 
                subLength = width;
                rangeStartNext = rangeStart + width;
            }
            subString = str.substr(rangeStart, subLength);
            rangeStart = rangeStartNext;
            result.push(subString.trim());
        }
        // Add the remainder
        if (rangeStart < len) {
            subString = str.substr(rangeStart);
            result.push(subString);
        }
        //  console.debug(result);
        return result;
    }

    /**
     * Makes the first character of the string uppercase.     
     */
    public static capitalize(str: string): string {
        if (str == null || str.length === 0)
            return str;

        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Makes the first character of the string lowercase.     
     */
    public static unCapitalize(str: string): string {
        if (str == null || str.length === 0)
            return str;

        return str.charAt(0).toLowerCase() + str.slice(1);
    }

    /**
     * Returns a boolean value indicating if the string is upperCase.     
     */
    public static isUpperCase(str: string): boolean {
        if (!str) return false;
        return (str === str.toUpperCase() && str !== str.toLowerCase());
    }

    /**
     * Returns a boolean value indicating if the string is lowerCase.     
     */
    public static isLowerCase(str: string): boolean {
        if (!str) return false;
        return (str === str.toLowerCase() && str !== str.toUpperCase())
    }
}
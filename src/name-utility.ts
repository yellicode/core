/*
 * Copyright (c) 2019 Yellicode
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { StringUtility } from './string-utility';

/**
 * Provides helper functions for converting the casing of names.
 */
export class NameUtility {
    /**
    * Makes the first character of the string uppercase.     
    */
    public static capitalize(input: string): string {
        if (!input) return input;
        return StringUtility.capitalize(input);
    }

    /**
     * Makes the first character of the string lowercase.     
     */
    public static unCapitalize(input: string): string {
        if (!input) return input;
        return StringUtility.unCapitalize(input);
    }

    /**
     * Converts a UpperCamelCase or lowerCamelCase string to a kebab-case (aka dash-case) string.
     * @param input A camelCase or UpperCamelCase string.
     * @returns a kebab-case (aka dash-case) string, meaning all lowercase with a dash separating words.
     */
    public static camelToKebabCase(input: string): string {
        if (!input) return input;

        const result: string[] = [];

        for (var i = 0, len = input.length; i < len; i++) {
            var c = input.charAt(i);
            const upperCase = c.toUpperCase();
            const lowerCase = c.toLowerCase();
            const isUpperCase = (c === upperCase && c !== lowerCase);
            if (isUpperCase && i > 0 && i < len - 1) {
                let insertHyphen = true;
                if (i < len - 1 && StringUtility.isUpperCase(input.charAt(i + 1))) {
                    // The next character is also uppercase
                    insertHyphen = false;
                }
                if (insertHyphen) {
                    result.push('-');
                }
            }
            result.push(lowerCase);
        }
        return result.join('');
    }


    /**
     * Converts a UpperCamelCase string to a lowerCamelCase string.
     * @param input A UpperCamelCase string.
     * @returns a lowerCamelCase string.
     */
    public static upperToLowerCamelCase(input: string): string {
        if (!input) return input;

        let done = false;
        let isPreviousMatch = false;

        const result: string[] = new Array(input.length);
        for (var i = 0, len = input.length; i < len; i++) {
            var c = input.charAt(i);
            if (!done) {
                const upperCase = c.toUpperCase();
                const lowerCase = c.toLowerCase();
                const isMatch = (c === upperCase && c !== lowerCase);
                if (isMatch) {
                    // The character is upperCase, make it lowerCase      
                    c = lowerCase;
                }
                else {
                    // The character is lowerCase. We are done, but..                
                    if (isPreviousMatch && i > 1) {
                        // ... if we converted the previous char to lowercase, make it uppercase again.    
                        // For example: ISBNNumber would become isbnNumber instead of isbnnumber
                        result[i - 1] = result[i - 1].toUpperCase();
                    }
                    done = true;
                }
                isPreviousMatch = isMatch;
            }
            result[i] = c;
        }
        return result.join('');
    }

    /**
   * Converts a lowerCamelCase string to a UpperCamelCase string.
   * @param input A lowerCamelCase string.
   * @returns a UpperCamelCase string.
   */
    public static lowerToUpperCamelCase(input: string): string {
        return StringUtility.capitalize(input);
    }

    /**
     * Converts a kebab-case, lowerCamelCase or UpperCamelCase string to an ALL_UPPER_CASE string.
     * @param input A kebab-case (aka dash-case), lowerCamelCase or UpperCamelCase string.
     * @returns an ALL_UPPER_CASE string.
     */
    public static toAllUpperCase(input: string): string {
        if (!input) return input;

        const result: string[] = [];

        for (var i = 0, len = input.length; i < len; i++) {
            var c = input.charAt(i);
            const upperCase = c.toUpperCase();
            const lowerCase = c.toLowerCase();
            const isUpperCase = (c === upperCase && c !== lowerCase);
            const isDash = c === '-';
            if ((isDash || isUpperCase) && i > 0 && i < len - 1) {
                let insertHyphen = true;
                if (i < len - 1 && StringUtility.isUpperCase(input.charAt(i + 1))) {
                    // The next character is also uppercase
                    insertHyphen = false;
                }
                if (insertHyphen) {
                    result.push('_');
                }
            }
            if (!isDash)
                result.push(upperCase);
        }
        return result.join('');
    }
}
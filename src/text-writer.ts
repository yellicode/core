/*
 * Copyright (c) 2019 Yellicode
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/**
 * Represents a writer that can write a sequential series of characters.
 */
export interface TextWriter {
    /**
     * Gets or sets the end of line string. The default value is platform dependent.
     */
    endOfLineString: string;

    /**
     * Gets or sets the indent string. The default value is a '\t' (tab character).
     */
    indentString: string;

    /**
     * Writes a string value to the output.
     * @param value The string value to be written.     
     */
    write(value: string): this;

    /**
     * Writes a single whitespace character to the output.     
     */
    writeWhiteSpace(): this;

    /**
     * Writes a new line to the output. The line is indented automatically. The line is ended with the endOfLineString.
     * @param value The line to write. When omitted, only the endOfLineString is written.     
     */
    writeLine(value?: string): this;
    
    /**
    * Writes a collection of lines to the output. Each line is indented automatically and ended with the endOfLineString.
    * @param values The lines to write.   
    * @param delimiter An optional delimiter to be written at the end of each line, except for the last one.
    */
    writeLines(values: string[], delimiter?: string): this;

    /**
    * Writes a new line to the output while temporarily increasing the indent. The line is ended with the endOfLineString.
    * @param value The line to write.     
    */
    writeLineIndented(value: string): this;

    /**
     * Writes the endOfLineString to the output.
     * @param value Any value to write before the endOfLineString string is written.
     */
    writeEndOfLine(value?: string): this;

    /**
    * Writes the contents of the specified file to the output. 
    * @param fileName The path of the file, relative to the template.
    * @param encoding Optional: the encoding that is used for the file. The default is 'utf-8'.     
    */
    writeFile(path: string, encoding?: string): this;

    /**
     * Writes the contents of the specified file region to the output. 
     * @param regionName The name of the region to write. The current FileRegionMapper will be used to determine the format of the 
     * region marker (by default: "/// <region>code goes here...</region>").
     * @param fileName The path of the file, relative to the template.
     * @param encoding The encoding that is used for the file. The default is 'utf-8'.     
     * @returns True if the region was found in the specified file and was written successfully.
     */
    writeFileRegion(regionName: string, path: string, encoding?: string): boolean;

    /**
     * Writes the current indentString to the output.     
     */
    writeIndent(): this;

    /**
     * Increases the current indent, which is prefixed to each line of the output. 
     */
    increaseIndent(): this;

    /**
     * Decreases the current indent, which is prefixed to each line of the output.
     */
    decreaseIndent(): this;

    /**
     * Resets any indentation, causing new line writes to start at the first character position.
     */
    clearIndent(): this;
}


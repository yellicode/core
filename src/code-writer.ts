/*
 * Copyright (c) 2019 Yellicode
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { TextWriter } from "./text-writer";

/**
 * The abstract base class for all code writers. This writer implements the TextWriter interface by decorating
 * the TextWriter provided in the constructor.
 */
export abstract class CodeWriter implements TextWriter {
    private writer: TextWriter;

    // NOTE: only documenting the get accessors because the TS compiler we use for doc generation concats the doc
    // comments for the getter and setter.

    /**
    * Gets or sets the end of line string. The default value is platform dependent.
    */
    public get endOfLineString(): string {
        return this.writer.endOfLineString;
    }

    public set endOfLineString(value: string) {
        this.writer.endOfLineString = value;
    }

    /**
     * Gets or sets the indent string. The default value is a '\t' (tab character).
    */
    public get indentString(): string {
        return this.writer.indentString;
    }

    public set indentString(value: string) {
        this.writer.indentString = value;
    }

    /**
     * Constructor. Creates a new CodeWriter that uses the provided TextWriter internally.
     * @param writer A TextWriter object. In a code generation template, a TextWriter instance can be obtained by calling any of the generate...()
     * functions on the current CodeGenerator.
     */
    constructor(writer: TextWriter) {
        this.writer = writer;
    }

    /******************************************************************************
     *                          TextWriter delegation
    ******************************************************************************/
    /**
     * Writes a string value to the output.
     * @param value The string value to be written.
     */
    public write(value: string): this {
        this.writer.write(value);
        return this;
    };

    /**
    * Writes a single whitespace character to the output.
    */
    public writeWhiteSpace(): this {
        this.writer.writeWhiteSpace();
        return this;
    }

    /**
    * Writes a new line to the output. The line is indented automatically. The line is ended with the endOfLineString.
    * @param value The line to write. When omitted, only the endOfLineString is written.
    */
    public writeLine(value?: string): this {
        this.writer.writeLine(value);
        return this;
    };

    /**
   * Writes a collection of lines to the output. Each line is indented automatically and ended with the endOfLineString.
   * @param values The lines to write.
   * @param delimiter An optional delimiter to be written at the end of each line, except for the last one.
   */
    public writeLines(values: string[], delimiter?: string): this {
        this.writer.writeLines(values, delimiter);
        return this;
    }

    /**
     * Writes a new line to the output while temporarily increasing the indent. The line is ended with the endOfLineString.
     * @param value The line to write.
     */
    public writeLineIndented(value: string): this {
        this.writer.writeLineIndented(value);
        return this;
    }

    /**
     * Writes the endOfLineString to the output.
     * @param value Any value to write before the endOfLineString string is written.
     */
    public writeEndOfLine(value?: string): this {
        this.writer.writeEndOfLine(value);
        return this;
    };

    /**
      * Writes the contents of the specified file to the output.
      * @param fileName The path of the file, relative to the template.
      * @param encoding Optional: the encoding that is used for the file. The default is 'utf-8'.
      */
    public writeFile(path: string, encoding?: string): this {
        this.writer.writeFile(path, encoding);
        return this;
    }

    /**
    * Writes the contents of the specified file region to the output.
    * @param regionName The name of the region to write. The region should be marked using "/// <region>code goes here...</region>".
    * @param fileName The path of the file, relative to the template.
    * @param encoding The encoding that is used for the file. The default is 'utf-8'.
    */
    public writeFileRegion(regionName: string, path: string, encoding?: string): boolean {
        return this.writer.writeFileRegion(regionName, path, encoding);
    }

    /**
    * Writes the current indentString to the output.
    */
    public writeIndent(): this {
        this.writer.writeIndent();
        return this;
    };

    /**
    * Increases the current indent, which is prefixed to each line of the output.
    */
    public increaseIndent(): this {
        this.writer.increaseIndent();
        return this;
    }

    /**
    * Decreases the current indent, which is prefixed to each line of the output.
    */
    public decreaseIndent(): this {
        this.writer.decreaseIndent();
        return this;
    }

    /**
     * Resets any indentation, causing new line writes to start at the first character position.
     */
    public clearIndent(): this {
        this.writer.clearIndent();
        return this;
    }

     /**
     * Disables writing any indentation for following writeIndent() and writeLine() calls, until
     * resumeIndent() is called.
     */
    public suppressIndent(): this {
        this.writer.suppressIndent();
        return this;
    }

    /**
     * Resumes writing indentation after a call to suppressIndent().
     */
    public resumeIndent(): this {
        this.writer.resumeIndent();
        return this;
    }

     /**
     * Disables writing any end of line character for following and writeLine() calls, until
     * resumeEndOfLine() is called.
     */
    public suppressEndOfLine(): this {
        this.writer.suppressEndOfLine();
        return this;
    }

    /**
     * Resumes writing end of line characters after a call to suppressEndOfLine().
     */
    public resumeEndOfLine(): this {
        this.writer.resumeEndOfLine();
        return this;
    }

    /**
    * The total number of lines currently written.
    */
    public get loc(): number {
        return this.writer.loc;
    }

    /**
     * The total number of lines currently written, excluding comments and vertical space.
     */
    public get sloc(): number {
        return this.writer.sloc;
    }

    /**
    * Prevents the SLOC (source lines of code) counter from being incremented.
    */
    public freezeSloc(): this {
        this.writer.freezeSloc();
        return this;
    }

    /**
    * Stops preventing the SLOC (source lines of code) counter from being incremented.
    */
    public unfreezeSloc(): this {
        this.writer.unfreezeSloc();
        return this;
    }

    /**
     * Writes the contained contents without counting the lines as SLOC (source lines of code).
     * This is similar to calling freezeSloc() -> contents -> unfreezeSloc().
     * @param contents The code to write without increasing SLOC.
     */
    public withFrozenSloc(contents: (writer: this) => void): this {
        this.writer.withFrozenSloc(() => {
            contents(this);
        });
        return this;
    }

    /******************************************************************************
     *                         End of TextWriter delegation
    ******************************************************************************/
}
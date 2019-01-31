export interface Logger {
    verbose(message: string): void;
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
}

/*
 * Copyright (c) 2019 Yellicode
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
export enum LogLevel {
    None = 0,
    Error = 1,
    Warning = 2,
    Info = 3,
    Verbose = 4
}

export namespace LogLevel {
    export function parse(str: string): LogLevel | null {
        if (!str) return null;
        switch (str.toLowerCase()) {
            case 'none': return LogLevel.None;
            case 'error': return LogLevel.Error;
            case 'warning': return LogLevel.Warning;
            case 'info': return LogLevel.Info;
            case 'verbose': return LogLevel.Verbose;
            default: return null;
        }
    }
}

export class ConsoleLogger implements Logger {
    constructor(private console: Console, private level: LogLevel = LogLevel.Info) {

    }

    public verbose(message: string): void {
        if (this.level < LogLevel.Verbose) return;
        this.write("Verbose", message);
    };

    public info(message: string): void {
        if (this.level < LogLevel.Info) return;
        this.write("Info", message);
    };

    public warn(message: string): void {
        if (this.level < LogLevel.Warning) return;
        this.write("Warning", message);
    };

    public error(message: string): void {
        if (this.level < LogLevel.Error) return;
        this.write("Error", message);
    };

    private write(level: string, message: string): void {
        var d = new Date();
        var n = d.toLocaleTimeString();
        this.console.log(`${n} - ${level}: ${message}`)
    }
}
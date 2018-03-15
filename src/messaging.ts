/*
 * Copyright (c) 2018 Yellicode
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/**
 * Defines the structure of messages that are sent between the client template process and the main process.
 */
export interface IProcessMessage {
    cmd: 'processStarted' | 'generateStarted' | 'generateFinished' | 'getModel' | 'setModel';
}

export interface ISetModelMessage extends IProcessMessage {
    modelData?: any;
}

/*
 * Copyright (c) 2019 Yellicode
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { nanoid } from 'nanoid'

export class UniqueId {
    /**
     * Creates a unique ID using te 'nanoid' package.
     * @param size The size of the ID (defaulted to 21 by nanoid)
     */
    public static create(size?: number): string {
        return nanoid(size);
    }
}
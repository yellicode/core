/*
 * Copyright (c) 2019 Yellicode
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/**
 * The base interface for all model transformations.
 */
export interface ModelTransform<TSource, TTarget = TSource> {
    /**
     * Transforms the source model into the target model.
     */
    transform(source: TSource): TTarget;
}

/**
 * Performs a sequence of model transforms, where the output of each transform is
 * the input of the next transform.
 */
export class ModelTransformPipeline<TModel = any> implements ModelTransform<TModel> {
    private transforms: ModelTransform<TModel>[];

    /**
     * Creates a new ModelTransformPipeline, optionally initialized with a collection of transforms.
     * @param transform sAny transforms to initialize the pipeline with.
     */
    constructor(...transforms: ModelTransform<TModel>[]) {
        this.transforms = transforms || [];
    }

    /**
    * Adds a new collection of transforms to the pipeline.
    * @param transforms The transforms to be added.
    */
    public addRange(...transforms: ModelTransform<TModel>[]): void {
        transforms.forEach(t => {
            this.transforms.push(t);
        });
    }

    /**
     * Adds a new transform to the pipeline.
     * @param transform The transform to be added.
     */
    public add(transform: ModelTransform<TModel>): void {
        if (!transform) return;

        this.transforms.push(transform);
    }

    /**
    * Transforms the source model by applying the specified transforms in sequence.
    * @returns The output of the last transform that was applied.
    */
    public transform(model: TModel): TModel {
        if (this.transforms == null)
            return model;

        let transformedModel = model;
        this.transforms.forEach(t => {
            transformedModel = t.transform(transformedModel);
        });
        return transformedModel;
    }
}
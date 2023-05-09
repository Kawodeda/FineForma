import { IImageContentStorage, Viewer } from 'fine-forma-core';
import { expect } from 'chai';

export function imageStorageDummy(): IImageContentStorage {
    return {
        getImageContent(storageId: string) {
            throw new Error('Not implemented');
        },
    };
}

export function assertViewer(actual: Viewer, expected: Viewer): void {
    expect(actual.design.equals(expected.design)).to.be.true;
    expect(actual.viewport).to.be.eql(expected.viewport);
}
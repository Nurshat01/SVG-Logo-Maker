const { expect } = require('chai');
const sinon = require('sinon');
const { JSDOM } = require('jsdom');
const logoModule = require('./logo');

//I am  Mocking  the window and document----------------------------------------
const { window } = new JSDOM();
global.window = window;
global.document = window.document;

describe('Logo Module', () => {
    const factory = sinon.stub();
    const generateLogo = logoModule.generateLogo;
    const getUserInput = logoModule.getUserInput;
    const main = logoModule.main;

    it('should call factory with window and document in a browser-like environment', () => {
        logoModule.factory = factory;
        main();
        expect(factory.calledWith(window, document)).to.be.true;
    });

    it('should throw an error when document is not available', () => {
        const invalidEnvironment = { document: undefined };
        const errorStub = sinon.stub(console, 'error');

        try {
            logoModule.factory = factory;
            main(invalidEnvironment);
            expect.fail('Expected an error to be thrown');
        } catch (error) {

            expect(error.message).to.include("Document is not available");
        } finally {
            errorStub.restore();
        }
    });

    it('should generate a logo without errors', () => {
        const validEnvironment = { document: window.document };
        logoModule.factory = factory;

        expect(() => generateLogo('text', 'black', 'circle', 'red')).to.not.throw();
    });

    // Restoring ----------------------------------
    afterEach(() => {
        sinon.restore();
    });
});

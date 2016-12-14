import slimStencilTools from '../../src/slim-stencil-tools';

describe('slimStencilTools', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(slimStencilTools, 'greet');
      slimStencilTools.greet();
    });

    it('should have been run once', () => {
      expect(slimStencilTools.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(slimStencilTools.greet).to.have.always.returned('hello');
    });
  });
});

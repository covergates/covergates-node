const os = require('os');
const Binary = require('../binary-install/binary');
const { install } = require('../binary');


jest.mock('../binary-install/binary');

describe('binary', () => {
  const mockInstall = jest.fn();
  const mockType = jest.spyOn(os, 'type');
  const mockArch = jest.spyOn(os, 'arch');
  beforeAll(() => {
    Binary.mockImplementation(() => {
      return {
        install: mockInstall
      };
    });
  });

  beforeEach(() => {
    expect(mockInstall).not.toHaveBeenCalled();
    mockType.mockReset();
    mockArch.mockReset();
  })

  afterEach(() => {
    mockInstall.mockClear();
  })

  it('should detect platform Darwin x32', () => {
    mockType.mockReturnValueOnce('Darwin');
    mockArch.mockReturnValueOnce('x32');
    install();
    expect(Binary).toHaveBeenCalledWith(expect.stringMatching(/.*darwin-10.6-386.tar.gz$/), expect.anything());
    expect(mockInstall).toHaveBeenCalled();
  });

  it('should detect platform Darwin x64', () => {
    mockType.mockReturnValueOnce('Darwin');
    mockArch.mockReturnValueOnce('x64');
    install();
    expect(Binary).toHaveBeenCalledWith(expect.stringMatching(/.*darwin-10.6-amd64.tar.gz$/), expect.anything());
    expect(mockInstall).toHaveBeenCalled();
  });

  it('should detect platform Linux x32', () => {
    mockType.mockReturnValueOnce('Linux');
    mockArch.mockReturnValueOnce('x32');
    install();
    expect(Binary).toHaveBeenCalledWith(expect.stringMatching(/.*linux-386.tar.gz$/), expect.anything());
    expect(mockInstall).toHaveBeenCalled();
  });

  it('should detect platform Linux x64', () => {
    mockType.mockReturnValueOnce('Linux');
    mockArch.mockReturnValueOnce('x64');
    install();
    expect(Binary).toHaveBeenCalledWith(expect.stringMatching(/.*linux-amd64.tar.gz$/), expect.anything());
    expect(mockInstall).toHaveBeenCalled();
  });

  it('should detect platform Windows x32', () => {
    mockType.mockReturnValueOnce('Windows_NT');
    mockArch.mockReturnValueOnce('x32');
    install();
    expect(Binary).toHaveBeenCalledWith(expect.stringMatching(/.*windows-4.0-386.tar.gz$/), expect.anything());
    expect(mockInstall).toHaveBeenCalled();
  });

  it('should detect platform Windows x32', () => {
    mockType.mockReturnValueOnce('Windows_NT');
    mockArch.mockReturnValueOnce('x64');
    install();
    expect(Binary).toHaveBeenCalledWith(expect.stringMatching(/.*windows-4.0-amd64.tar.gz$/), expect.anything());
    expect(mockInstall).toHaveBeenCalled();
  });

});

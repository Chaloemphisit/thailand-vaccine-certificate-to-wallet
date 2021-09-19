class NoVideoInputDevicesError extends Error {
  constructor() {
    super('No video input devices found');
    this.name = 'NoVideoInputDevicesError';
  }
}

export { NoVideoInputDevicesError };

export default Error;

import { useEffect, useState, useCallback } from 'react';
import { NoVideoInputDevicesError } from 'types/error';

const isMediaStream = (candidate: MediaStream | MediaSource | Blob | null): candidate is MediaStream =>
  candidate !== null && 'getTracks' in candidate;

const getFacingModePattern = (facingMode: string) =>
  facingMode === 'environment' ? /rear|back|environment/gi : /front|user|face/gi;

export type FacingMode = 'user' | 'environment';

export type UseUserMediaStatusType = 'pending' | 'resolved' | 'rejected' | 'stopped';
interface UseUserMediaType {
  stream: MediaStream | null;
  error: Error | null;
  status: UseUserMediaStatusType;
  enumerateDevices: MediaDeviceInfo[];
  facingMode: FacingMode;
  isSupportFacingMode: boolean;
  selectedDevice: string | undefined;
  stopMediaStream: () => void;
  switchFacingMode: () => void;
  startMediaStream: (selectedDevice?: string, facingMode?: FacingMode) => void;
}

const useUserMedia = (): UseUserMediaType => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<UseUserMediaStatusType>('pending');
  const [facingMode, setFacingMode] = useState<FacingMode>('environment');
  const [isSupportFacingMode, setIsSupportFacingMode] = useState<boolean>(false);
  const [selectedDevice, setSelectedDevice] = useState<string>();
  const [enumerateDevices, setEnumerateDevices] = useState<MediaDeviceInfo[]>([]);

  const defaultDeviceIdChooser = useCallback(
    (filteredDevices: MediaDeviceInfo[], videoDevices: MediaDeviceInfo[], facingMode: FacingMode) => {
      if (filteredDevices.length > 0) {
        return filteredDevices[0].deviceId;
      }
      if (videoDevices.length === 1 || facingMode === 'user') {
        return videoDevices[0].deviceId;
      }
      return videoDevices[1].deviceId;
    },
    [],
  );

  const getVideoDevices = useCallback(async (facingMode: FacingMode) => {
    let enumerateDevices;
    try {
      enumerateDevices = await navigator.mediaDevices.enumerateDevices();
    } catch (err) {
      throw new NoVideoInputDevicesError();
    }

    // Filter out non-videoinputs
    const videoDevices = enumerateDevices.filter((device) => device.kind === 'videoinput');

    if (videoDevices.length < 1) {
      throw new NoVideoInputDevicesError();
    }

    const pattern = getFacingModePattern(facingMode);

    // Filter out video devices without the pattern
    const filteredDevices = videoDevices.filter(({ label }) => pattern.test(label));

    return { filteredDevices, videoDevices };
  }, []);

  const getDeviceId = useCallback(
    (facingMode: FacingMode, deviceId?: string): Promise<string> =>
      // Get manual deviceId from available devices.
      new Promise((resolve, reject) => {
        getVideoDevices(facingMode)
          .then(({ filteredDevices, videoDevices }) =>
            resolve(deviceId ?? defaultDeviceIdChooser(filteredDevices, videoDevices, facingMode)),
          )
          .catch((err) => reject(err));
      }),
    [defaultDeviceIdChooser, getVideoDevices],
  );

  const startMediaStream = useCallback(
    (selectedDeviceId?: string, facingMode: FacingMode = 'environment') => {
      setStatus('pending');
      setFacingMode(facingMode);
      // Check browser facingMode constraint support
      // Firefox ignores facingMode or deviceId constraints
      const isFirefox = /firefox/i.test(navigator.userAgent);

      let supported: MediaTrackSupportedConstraints = {};
      if (navigator.mediaDevices && typeof navigator.mediaDevices.getSupportedConstraints === 'function') {
        supported = navigator.mediaDevices.getSupportedConstraints();
      }
      const constraints: any = {};

      if (supported.facingMode) {
        constraints.facingMode = { ideal: facingMode };
      }
      if (supported.frameRate) {
        constraints.frameRate = { ideal: 25, min: 10 };
      }

      const vConstraintsPromise =
        supported.facingMode || isFirefox
          ? Promise.resolve(constraints)
          : getDeviceId(facingMode, selectedDeviceId).then((deviceId) => {
              setSelectedDevice(deviceId);
              return { deviceId, constraints };
            });

      vConstraintsPromise
        .then((video) => navigator.mediaDevices.getUserMedia({ video }))
        .then((userStream) => {
          setStream(userStream);
          setStatus('resolved');
        })
        .catch((err) => {
          setError(err);
          setStatus('rejected');
        });

      getVideoDevices(facingMode).then(({ videoDevices, filteredDevices }) => {
        setIsSupportFacingMode(filteredDevices.length > 0);

        setEnumerateDevices(filteredDevices.length ? [] : videoDevices);
      });
    },
    [getDeviceId, getVideoDevices],
  );

  const switchFacingMode = useCallback(() => {
    startMediaStream(selectedDevice, facingMode === 'environment' ? 'user' : 'environment');
  }, [facingMode, selectedDevice, startMediaStream]);

  useEffect(() => {
    startMediaStream();
  }, [startMediaStream]);

  const stopMediaStream = useCallback((): void => {
    if (isMediaStream(stream)) {
      stream.getTracks().forEach((track) => {
        track.stop();
        stream.removeTrack(track);
      });

      setStatus('stopped');
    }
  }, [stream]);

  return {
    stream,
    error,
    status,
    facingMode,
    isSupportFacingMode,
    enumerateDevices,
    selectedDevice,
    stopMediaStream,
    startMediaStream,
    switchFacingMode,
  };
};

export default useUserMedia;

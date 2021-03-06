import React, { ReactElement, useRef, useEffect, useCallback, useMemo, useState, FC } from 'react';
import jsQR from 'jsqr';
import useUserMedia from 'hooks/useUsermedia';
import ScannerBorders from './ScannerBorders';

interface QrScannerProps {
  active: boolean;
  onSuccessfulScan: (data: string) => void;
}

const QrScanner: FC<QrScannerProps> = ({ active, onSuccessfulScan }) => {
  const video = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  const {
    stream,
    error,
    status,
    isSupportFacingMode,
    enumerateDevices,
    facingMode,
    stopMediaStream,
    startMediaStream,
    switchFacingMode,
  } = useUserMedia();

  const startCapturing = (): void => {
    if (canvas === null || canvas.current === null || video === null || video.current === null) {
      return;
    }

    const context = canvas.current.getContext('2d');

    if (context === null) {
      return;
    }

    const { width, height } = canvas.current;

    context.drawImage(video.current, 0, 0, width, height);

    const imageData = context.getImageData(0, 0, width, height);
    const qrCode = jsQR(imageData.data, width, height);

    if (qrCode === null) {
      setTimeout(startCapturing, 500);
    } else {
      onSuccessfulScan(qrCode.data);

      stopMediaStream();
      video.current.srcObject = null;
    }
  };

  const handleCanPlay = (): void => {
    if (canvas === null || canvas.current === null || video === null || video.current === null) {
      return;
    }

    canvas.current.width = video.current.videoWidth;
    canvas.current.height = video.current.videoHeight;

    if (error !== null) {
      // TODO: show dialog to user with an error
    } else {
      startCapturing();
    }
  };

  useEffect(() => {
    if (status !== 'resolved' || video === null || video.current === null) {
      return;
    }

    video.current.srcObject = stream;
    video.current.play().catch(console.error);
  }, [status, stream]);

  useEffect(() => {
    if (active && status === 'stopped') {
      startMediaStream('environment');
    }
  }, [active, status, startMediaStream]);

  return (
    <div className={`scanner ${active ? '' : 'scanner--hidden'}`}>
      <div className="scanner__aspect-ratio-container">
        <canvas ref={canvas} className="scanner__canvas" />
        <video
          ref={video}
          autoPlay
          loop
          muted
          playsInline
          className="scanner__video"
          controls={false}
          onCanPlay={handleCanPlay}
        />
        <ScannerBorders />
      </div>

      <div className="scanner-tip">
        <div>Scan a QR code with your camera to see what it says.</div>
      </div>
    </div>
  );
};

export default QrScanner;

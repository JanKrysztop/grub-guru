//THIS COMPONENT IS CURRENTLY UNUSED

import { useZxing } from "react-zxing";

const BarcodeScannerComponent = ({ onDetected }) => {
  const {
    ref,
    torch: { on, off, isOn, isAvailable },
  } = useZxing({
    onDecodeResult(result) {
      if (result) {
        onDetected(result.getText());
      }
    },
  });

  return (
    <>
      <video ref={ref} />
      {isAvailable ? (
        <button onClick={() => (isOn ? off() : on())}>
          {isOn ? "Turn off" : "Turn on"} torch
        </button>
      ) : (
        <strong>Unfortunately, torch is not available on this device.</strong>
      )}
    </>
  );
};

export default BarcodeScannerComponent;

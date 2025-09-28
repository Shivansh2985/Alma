import React, { useState, useRef, useEffect } from "react";


export default function ImageCropModal({ src, initial = { posX: 50, posY: 50, zoom: 100 }, onCancel, onSave }) {
  const [pos, setPos] = useState(initial); // {posX, posY, zoom}
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => setPos(initial), [initial, src]);

  // convert client movement to percent adjustments based on container size
  function handlePointerDown(e) {
    dragging.current = true;
    const pe = e.touches ? e.touches[0] : e;
    last.current = { x: pe.clientX, y: pe.clientY };
    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
    // for touch
    document.addEventListener("touchmove", handlePointerMove, { passive: false });
    document.addEventListener("touchend", handlePointerUp);
  }

  function handlePointerMove(e) {
    if (!dragging.current) return;
    e.preventDefault();
    const pe = e.touches ? e.touches[0] : e;
    const dx = pe.clientX - last.current.x;
    const dy = pe.clientY - last.current.y;
    last.current = { x: pe.clientX, y: pe.clientY };

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    // convert pixel move to percentage of container
    const deltaXPercent = (dx / rect.width) * 100;
    const deltaYPercent = (dy / rect.height) * 100;

    setPos(prev => {
      let nx = prev.posX + deltaXPercent;
      let ny = prev.posY + deltaYPercent;
      // clamp 0..100
      nx = Math.max(0, Math.min(100, nx));
      ny = Math.max(0, Math.min(100, ny));
      return { ...prev, posX: nx, posY: ny };
    });
  }

  function handlePointerUp() {
    dragging.current = false;
    document.removeEventListener("pointermove", handlePointerMove);
    document.removeEventListener("pointerup", handlePointerUp);
    document.removeEventListener("touchmove", handlePointerMove);
    document.removeEventListener("touchend", handlePointerUp);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-4">
        <h3 className="text-lg font-semibold mb-2">Adjust avatar</h3>

        <div
          ref={containerRef}
          onMouseDown={handlePointerDown}
          onTouchStart={handlePointerDown}
          className="mx-auto mb-4 w-56 h-56 rounded-full overflow-hidden border"
          style={{
            // using background-image makes pan/zoom easy
            backgroundImage: `url(${src})`,
            backgroundPosition: `${pos.posX}% ${pos.posY}%`,
            backgroundSize: `${pos.zoom}%`, // percent of natural size
            backgroundRepeat: "no-repeat",
            cursor: "grab",
          }}
        />

        <div className="flex items-center gap-3 mb-4">
          <label className="text-sm">Zoom</label>
          <input
            type="range"
            min="100"
            max="300"
            value={pos.zoom}
            onChange={(e) => setPos(prev => ({ ...prev, zoom: Number(e.target.value) }))}
            className="flex-1"
          />
          <span className="text-sm w-12 text-right">{Math.round(pos.zoom)}%</span>
        </div>

        <p className="text-xs text-gray-500 mb-3">Drag the image inside the circle to reposition. Use zoom to scale.</p>

        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-3 py-1 rounded-md border">Cancel</button>
          <button
            onClick={() => onSave(pos)}
            className="px-3 py-1 rounded-md bg-gray-800 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";

interface Point {
  x: number;
  y: number;
}

interface CoordSystemSize {
  width: number;
  height: number;
}

export function SVG() {
  const sizes = [
    { width: 5, height: 5 }, // 0 :  90%
    { width: 10, height: 10 }, // 1 :  90%
    { width: 25, height: 25 }, // 2 :  90%
    { width: 50, height: 50 }, // 3 :  90%
    { width: 100, height: 100 }, // 4 :  90%
    { width: 200, height: 200 }, // 5 :  90%
    { width: 300, height: 300 }, // 6 : 100%
    { width: 400, height: 400 }, // 7 :
    { width: 500, height: 500 }, // 9 :
    { width: 600, height: 600 }, // 10:
    { width: 700, height: 700 }, // 11:
    { width: 800, height: 800 }, // 12:
  ];
  const [zoomIndex, setZoomIndex] = useState(5);
  const userSystemSize = sizes[zoomIndex];
  const viewportSize = { width: 800, height: 800 };

  const [isSpaceKeyDown, setSpaceKeyDown] = useState(false);
  const [isMouseDown, setMouseDown] = useState(false);
  const [dragStart, setDragStart] = useState({
    mouseX: 0,
    mouseY: 0,
    centerX: 0,
    centerY: 0,
  });
  // TODO: dragでcenterを動かす？
  const origin = { x: 400, y: 400 };
  const [center, setCenter] = useState(origin);
  const minXY = {
    x: center.x - userSystemSize.width / 2,
    y: center.y - userSystemSize.height / 2,
  };

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.code === "Space") {
        setSpaceKeyDown(true);
      }
    }
    function onKeyUp(e: KeyboardEvent) {
      if (e.code === "Space") {
        setSpaceKeyDown(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return function () {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return (
    <svg
      id="_レイヤー_1"
      data-name="レイヤー_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`${minXY.x} ${minXY.y} ${userSystemSize.width} ${userSystemSize.height}`}
      width={viewportSize.width}
      height={viewportSize.height}
      onWheel={function (e) {
        if (e.deltaY > 0 && zoomIndex < sizes.length - 1) {
          setZoomIndex(zoomIndex + 1);
        } else if (e.deltaY < 0 && zoomIndex > 0) {
          setZoomIndex(zoomIndex - 1);
        }
      }}
      onMouseDown={function (e) {
        setMouseDown(true);
        setDragStart({
          mouseX: e.nativeEvent.offsetX,
          mouseY: e.nativeEvent.offsetY,
          centerX: center.x,
          centerY: center.y,
        });
      }}
      onMouseUp={function () {
        setMouseDown(false);
      }}
      onMouseMove={function (e) {
        if (isMouseDown && isSpaceKeyDown) {
          const diffX = e.nativeEvent.offsetX - dragStart.mouseX;
          const diffY = e.nativeEvent.offsetY - dragStart.mouseY;

          const centerX =
            dragStart.centerX -
            (userSystemSize.width * diffX) / viewportSize.width;

          const centerY =
            dragStart.centerY -
            (userSystemSize.height * diffX) / viewportSize.height;
          setCenter({ x: centerX, y: centerY });
          console.log(diffX, diffY, centerX, centerY);
        }
      }}
    >
      <g id="grid" fill="none" stroke="#9e9e9e" strokeMiterlimit={10}>
        <line x1="1" y1="1" x2="799" y2="1" />
        <line x1="1" y1="200" x2="799" y2="200" />
        <line x1="1" y1="400" x2="799" y2="400" />
        <line x1="1" y1="600" x2="799" y2="600" />
        <line x1="1" y1="799" x2="799" y2="799" />
        <line x1="1" y1="1" x2="1" y2="799" />
        <line x1="600" y1="1" x2="600" y2="801" />
        <line x1="400" y1="1" x2="400" y2="801" />
        <line x1="200" y1="1" x2="200" y2="801" />
        <line x1="799" y1="1" x2="799" y2="799" />
      </g>
      <g id="numbers" fill="#9e9e9e">
        <g>
          <path d="M98.05,79.53h-8.35l4.03-6.77h11.67v48.03h-7.34v-41.26Z" />
          <path d="M314.76,120.79h-32.26l16.63-20.16c1.66-2.02,4.18-5.18,5.76-7.49,1.37-2.02,2.52-4.1,2.52-6.91,0-4.03-2.66-7.78-7.99-7.78s-8.21,4.18-8.5,8.71h-7.06c.22-4.68,2.16-8.42,4.03-10.51,1.73-1.94,5.18-4.68,11.23-4.68,10.23,0,15.48,6.98,15.48,14.47,0,3.96-1.51,7.2-3.46,10.08-1.73,2.59-3.96,5.26-6.84,8.64l-7.49,8.86h17.93v6.77Z" />
          <path d="M484.95,85c.22-3.89,1.87-7.2,4.1-9.36,3.31-3.17,7.34-3.67,10.51-3.67,3.67,0,7.27.72,10.37,3.96,2.52,2.59,3.46,5.69,3.46,9.15,0,2.3-.43,4.32-1.66,6.34-1.3,2.09-2.95,3.31-4.32,4.03,2.45.94,3.96,2.59,4.75,3.82,1.37,2.02,2.02,4.68,2.02,7.42,0,4.75-1.8,8.42-4.1,10.73-3.46,3.46-7.99,4.18-11.74,4.18s-7.63-.72-10.73-4.03c-2.16-2.3-3.74-6.12-4.1-9.79h7.06c.36,2.16,1.37,4.03,2.59,5.18,1.01.94,2.81,2.16,5.83,2.16,2.23,0,4.32-.86,5.62-2.02,1.37-1.3,2.52-3.53,2.52-6.77,0-1.58-.29-3.89-2.16-5.69-2.09-2.02-4.68-2.16-6.19-2.16h-1.44v-6.19h1.01c3.1,0,5.04-1.01,6.12-2.09,1.15-1.15,1.87-2.95,1.87-5.11,0-2.52-1.08-4.03-1.87-4.82-1.66-1.58-3.67-1.8-5.11-1.8-1.73,0-3.74.29-5.33,1.94-1.66,1.73-2.02,4.32-2.02,4.61h-7.06Z" />
          <g>
            <path d="M277.61,679.53h-8.35l4.03-6.77h11.67v48.03h-7.34v-41.26Z" />
            <path d="M332.76,704.94h5.18v6.77h-5.18v9.07h-7.06v-9.07h-23.76l30.82-42.48v35.72ZM325.7,705.09v-15.48l-10.94,15.48h10.94Z" />
          </g>
          <g>
            <path d="M477.61,679.53h-8.35l4.03-6.77h11.67v48.03h-7.34v-41.26Z" />
            <path d="M534.85,679.53h-14.83l-2.38,7.99c.72-.07,1.51-.14,2.23-.14,4.03,0,8.14,1.37,11.09,4.25,2.3,2.23,4.68,6.05,4.68,12.31,0,5.26-1.66,9.51-4.9,12.75-3.82,3.74-8.42,4.9-13.32,4.9-2.81,0-6.12-.36-9.22-2.16-.72-.43-3.46-2.09-5.69-5.54l5.54-4.61c.14.36,1.44,2.74,3.67,4.18,1.58,1.08,3.82,1.66,6.26,1.66,3.89,0,6.12-1.51,7.34-2.66,1.44-1.44,3.1-4.03,3.1-8.14s-1.37-6.34-2.88-7.78c-2.38-2.23-5.54-2.66-7.85-2.66-2.09,0-3.67.29-5.62,1.01-1.51.58-2.88,1.22-4.25,2.16l7.13-24.27h19.87v6.77Z" />
          </g>
          <path d="M712.31,104.94h5.19v6.77h-5.19v9.07h-7.06v-9.07h-23.76l30.82-42.48v35.72ZM705.25,105.09v-15.48l-10.94,15.48h10.94Z" />
          <g>
            <path d="M77.61,679.53h-8.35l4.03-6.77h11.67v48.03h-7.34v-41.26Z" />
            <path d="M105.4,685c.22-3.89,1.87-7.2,4.1-9.36,3.31-3.17,7.34-3.67,10.51-3.67,3.67,0,7.27.72,10.37,3.96,2.52,2.59,3.46,5.69,3.46,9.14,0,2.3-.43,4.32-1.66,6.34-1.3,2.09-2.95,3.31-4.32,4.03,2.45.94,3.96,2.59,4.75,3.82,1.37,2.02,2.02,4.68,2.02,7.42,0,4.75-1.8,8.43-4.1,10.73-3.46,3.46-7.99,4.18-11.74,4.18s-7.63-.72-10.73-4.03c-2.16-2.3-3.74-6.12-4.1-9.79h7.06c.36,2.16,1.37,4.03,2.59,5.19,1.01.94,2.81,2.16,5.83,2.16,2.23,0,4.32-.87,5.62-2.02,1.37-1.3,2.52-3.53,2.52-6.77,0-1.58-.29-3.89-2.16-5.69-2.09-2.02-4.68-2.16-6.19-2.16h-1.44v-6.19h1.01c3.1,0,5.04-1.01,6.12-2.09,1.15-1.15,1.87-2.95,1.87-5.11,0-2.52-1.08-4.03-1.87-4.82-1.66-1.58-3.67-1.8-5.11-1.8-1.73,0-3.74.29-5.33,1.95-1.66,1.73-2.02,4.32-2.02,4.61h-7.06Z" />
          </g>
          <g>
            <path d="M677.61,679.53h-8.35l4.03-6.77h11.67v48.03h-7.34v-41.26Z" />
            <path d="M730.89,675.06l-11.45,14.47c1.08-.22,2.02-.29,3.02-.29,5.62,0,9.14,2.45,11.09,4.46,2.59,2.74,4.25,6.84,4.25,11.23s-1.51,8.93-4.75,12.1c-4.03,3.96-9.22,4.54-12.39,4.54-4.18,0-8.71-.86-12.38-4.68-2.52-2.67-4.18-6.19-4.18-10.87,0-3.53.79-6.26,2.3-9.22,1.8-3.6,3.67-5.76,5.83-8.57l13.32-17.14,5.33,3.96ZM714.11,698.18c-1.58,1.51-2.81,4.1-2.81,7.13,0,2.45.94,5.33,2.81,7.13,1.51,1.44,4.39,2.66,6.91,2.66,2.23,0,4.97-.87,6.77-2.66,1.8-1.8,2.81-4.68,2.81-7.13s-1.01-5.33-2.81-7.13c-1.66-1.66-4.32-2.66-6.77-2.66s-5.18,1.01-6.91,2.66Z" />
          </g>
          <g>
            <path d="M277.61,479.53h-8.35l4.03-6.77h11.67v48.03h-7.34v-41.26Z" />
            <path d="M310.08,516.39c-5.04-5.76-6.12-13.32-6.12-19.59s1.08-13.9,6.12-19.66c3.02-3.46,6.62-5.18,10.87-5.18s7.85,1.73,10.87,5.18c5.04,5.76,6.12,13.46,6.12,19.66s-1.08,13.83-6.12,19.59c-3.02,3.46-6.55,5.18-10.87,5.18s-7.85-1.73-10.87-5.18ZM314.47,482.41c-2.66,3.96-3.31,10.15-3.31,14.33s.65,10.37,3.31,14.4c2.09,3.17,4.61,3.96,6.48,3.96s4.39-.79,6.48-3.96c2.66-4.03,3.31-10.15,3.31-14.4s-.65-10.37-3.31-14.33c-2.09-3.17-4.61-3.96-6.48-3.96s-4.39.79-6.48,3.96Z" />
          </g>
          <g>
            <path d="M477.61,479.53h-8.35l4.03-6.77h11.67v48.03h-7.34v-41.26Z" />
            <path d="M518.5,479.53h-8.35l4.03-6.77h11.67v48.03h-7.34v-41.26Z" />
          </g>
          <path d="M90.56,518.48l11.31-14.47c-.94.22-1.73.29-2.59.29-5.69,0-9.29-2.52-11.23-4.46-2.45-2.45-4.39-5.98-4.39-10.95s1.87-9.07,4.75-12.02c3.02-3.1,7.06-4.9,12.39-4.9,6.55,0,10.37,2.66,12.39,4.75,2.02,2.09,4.18,5.54,4.18,10.87,0,3.46-.79,6.19-2.3,9.14-1.8,3.6-3.67,5.76-5.83,8.57l-13.32,17.14-5.33-3.96ZM107.34,495.15c1.8-1.87,2.81-4.61,2.81-7.13s-1.01-5.11-2.81-6.84c-1.8-1.73-4.39-2.74-6.84-2.74-2.66,0-5.26,1.22-6.84,2.74-1.58,1.58-2.81,4.1-2.81,7.06,0,2.66,1.01,5.33,2.81,7.13,1.58,1.51,4.1,2.66,6.77,2.66,2.45,0,5.04-.94,6.91-2.88Z" />
          <g>
            <path d="M677.61,479.53h-8.35l4.03-6.77h11.67v48.03h-7.34v-41.26Z" />
            <path d="M735.21,520.79h-32.26l16.63-20.16c1.66-2.02,4.18-5.18,5.76-7.49,1.37-2.02,2.52-4.1,2.52-6.91,0-4.03-2.66-7.78-7.99-7.78s-8.21,4.18-8.5,8.71h-7.06c.21-4.68,2.16-8.42,4.03-10.51,1.73-1.94,5.19-4.68,11.23-4.68,10.23,0,15.48,6.98,15.48,14.47,0,3.96-1.51,7.2-3.46,10.08-1.73,2.59-3.96,5.26-6.84,8.64l-7.49,8.86h17.93v6.77Z" />
          </g>
          <path d="M310.44,275.06l-11.45,14.47c1.08-.22,2.02-.29,3.02-.29,5.62,0,9.14,2.45,11.09,4.46,2.59,2.74,4.25,6.84,4.25,11.23s-1.51,8.93-4.75,12.1c-4.03,3.96-9.22,4.54-12.39,4.54-4.18,0-8.71-.86-12.38-4.68-2.52-2.67-4.18-6.19-4.18-10.87,0-3.53.79-6.26,2.3-9.22,1.8-3.6,3.67-5.76,5.83-8.57l13.32-17.14,5.33,3.96ZM293.66,298.18c-1.58,1.51-2.81,4.1-2.81,7.13,0,2.45.94,5.33,2.81,7.13,1.51,1.44,4.39,2.66,6.91,2.66,2.23,0,4.97-.86,6.77-2.66,1.8-1.8,2.81-4.68,2.81-7.13s-1.01-5.33-2.81-7.13c-1.66-1.66-4.32-2.67-6.77-2.67s-5.18,1.01-6.91,2.67Z" />
          <path d="M507.56,279.53h-23.62v-6.77h35.72l-30.24,49.68-5.76-3.6,23.91-39.32Z" />
          <path d="M114.4,279.53h-14.83l-2.38,7.99c.72-.07,1.51-.14,2.23-.14,4.03,0,8.14,1.37,11.09,4.25,2.3,2.23,4.68,6.05,4.68,12.31,0,5.26-1.66,9.5-4.9,12.75-3.82,3.75-8.42,4.9-13.32,4.9-2.81,0-6.12-.36-9.22-2.16-.72-.43-3.46-2.09-5.69-5.54l5.54-4.61c.14.36,1.44,2.74,3.67,4.18,1.58,1.08,3.82,1.66,6.26,1.66,3.89,0,6.12-1.51,7.34-2.66,1.44-1.44,3.1-4.03,3.1-8.14s-1.37-6.34-2.88-7.78c-2.38-2.23-5.54-2.66-7.85-2.66-2.09,0-3.67.29-5.62,1.01-1.51.58-2.88,1.22-4.25,2.16l7.13-24.27h19.87v6.77Z" />
          <path d="M713.46,299.69c1.8,2.38,2.16,5.04,2.16,7.2,0,4.9-1.87,8.21-3.82,10.22-2.23,2.38-5.83,4.46-11.3,4.46s-9.07-2.09-11.3-4.46c-1.94-2.02-3.82-5.33-3.82-10.22,0-2.16.36-4.83,2.16-7.2,1.08-1.51,2.81-2.95,5.04-3.89-2.02-.86-3.38-2.3-4.25-3.6-1.22-1.94-1.73-4.39-1.73-6.55,0-3.82,1.37-7.42,4.03-10.01,1.51-1.44,4.61-3.67,9.87-3.67s8.35,2.23,9.87,3.67c2.66,2.59,4.03,6.19,4.03,10.01,0,2.16-.5,4.61-1.73,6.55-.86,1.3-2.23,2.74-4.25,3.6,2.23.94,3.96,2.38,5.04,3.89ZM694.81,301.2c-1.44,1.44-2.23,3.75-2.23,5.83,0,1.87.72,4.03,2.16,5.62,1.01,1.15,2.81,2.45,5.76,2.45s4.75-1.3,5.76-2.45c1.44-1.58,2.16-3.74,2.16-5.62,0-2.09-.79-4.39-2.23-5.83-1.44-1.44-3.6-2.23-5.69-2.23s-4.25.79-5.69,2.23ZM695.25,280.39c-1.22,1.22-2.02,3.17-2.02,5.33s.86,3.96,1.94,5.04c1.3,1.37,3.46,2.16,5.33,2.16s4.03-.79,5.33-2.16c1.08-1.08,1.94-2.81,1.94-5.04s-.79-4.1-2.02-5.33c-1.22-1.15-3.02-1.94-5.26-1.94s-4.03.79-5.26,1.94Z" />
        </g>
      </g>
    </svg>
  );
}

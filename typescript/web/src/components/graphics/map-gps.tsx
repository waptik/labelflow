import * as React from "react";

function SvgMapGps(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>
) {
  return (
    <svg
      id="map-gps_svg__Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 96 96"
      ref={svgRef}
      {...props}
    >
      <defs>
        <style>
          {
            ".map-gps_svg__cls-1{fill:#9fc98a}.map-gps_svg__cls-2{fill:#bbd79f}.map-gps_svg__cls-5{fill:#7190c4}.map-gps_svg__cls-8{fill:#39426a}"
          }
        </style>
      </defs>
      <path
        className="map-gps_svg__cls-1"
        d="M28.3 56.75L25 81.63l-.07.54-.43 3.24L1 97l11.75-46.34 3.17-1.74.87-.48 5.71-3.12a51.32 51.32 0 005.8 11.43z"
      />
      <path
        className="map-gps_svg__cls-2"
        d="M28.3 56.75L25 81.63l-11.22 5.53a4 4 0 01-5.65-4.57l8.66-34.15 5.71-3.12a51.32 51.32 0 005.8 11.43z"
      />
      <path
        className="map-gps_svg__cls-1"
        d="M48 76.11V97L24.5 85.41l3.8-28.66c1 1.52 2.08 3 3.16 4.32A71.94 71.94 0 0048 76.11z"
      />
      <path
        className="map-gps_svg__cls-2"
        d="M48 76.11V93l-14.36-7a8 8 0 01-4.39-8.23l2.21-16.65A71.94 71.94 0 0048 76.11z"
      />
      <path
        className="map-gps_svg__cls-1"
        d="M71.5 85.41L48 97V76.11s1.15-.71 3-2.07a72.16 72.16 0 0016.7-17.29l3.36 25.36z"
      />
      <path
        className="map-gps_svg__cls-2"
        d="M71.06 82.11l-14.29 7A4 4 0 0151 85.57V74a72.16 72.16 0 0016.7-17.25z"
      />
      <path
        className="map-gps_svg__cls-1"
        d="M95 97L71.5 85.41l-3.8-28.66a51.32 51.32 0 005.8-11.43l1.46.8 8.29 4.54L93.7 91.88z"
      />
      <path
        className="map-gps_svg__cls-2"
        d="M93.7 91.88l-10.58-5.22a18 18 0 01-9.88-13.78L70.7 53.75a52.88 52.88 0 004.3-7.63l8.29 4.54z"
      />
      <path
        d="M75.85 34.55a43.33 43.33 0 01-2.35 10.77 51.32 51.32 0 01-5.8 11.43A71.52 71.52 0 0148 76.1a71.52 71.52 0 01-19.7-19.35 51.32 51.32 0 01-5.8-11.43A42.69 42.69 0 0120 31a26.81 26.81 0 01.18-3.12A28 28 0 0144 3.28c16-2.29 29.9 9.77 31.73 25.23a29.65 29.65 0 01.12 6.04z"
        fill="#cf4055"
      />
      <path
        d="M75.75 28.51a42.93 42.93 0 01-2.25 9.81 51.32 51.32 0 01-5.8 11.43 69.62 69.62 0 01-12.18 13.67 11.48 11.48 0 01-15 0A69.62 69.62 0 0128.3 49.75a51.32 51.32 0 01-5.8-11.43 43.18 43.18 0 01-2.32-10.44A28 28 0 0144 3.28C60.07 1 73.92 13.05 75.75 28.51z"
        fill="#dc5d6b"
      />
      <circle className="map-gps_svg__cls-5" cx={48} cy={31} r={20} />
      <path
        className="map-gps_svg__cls-5"
        d="M68 31a20 20 0 01-40 0 18.86 18.86 0 01.1-2 20 20 0 0139.8 0 18.86 18.86 0 01.1 2z"
      />
      <ellipse cx={48} cy={29} rx={19.9} ry={18} fill="#89a3ce" />
      <path
        d="M61.82 40.06a1 1 0 01-.5-.13 1 1 0 01-.32-1.37 15 15 0 00-11.5-22.48 1 1 0 11.2-2 17 17 0 0113 25.49 1 1 0 01-.88.49z"
        fill="#a5b9db"
      />
      <path
        className="map-gps_svg__cls-8"
        d="M96 96.75L84.22 50.41a1.06 1.06 0 00-.49-.63l-9-4.94A43.79 43.79 0 0077 31a29 29 0 00-58 0 43.79 43.79 0 002.29 13.84l-9 4.94a1.06 1.06 0 00-.49.63L0 96.75a1 1 0 00.34 1A1 1 0 001 98a1 1 0 00.44-.1L24.5 86.53 47.56 97.9a.93.93 0 00.8 0L71.5 86.53 94.56 97.9a1 1 0 00.44.1 1 1 0 00.63-.22 1 1 0 00.37-1.03zM48 4a27 27 0 0127 27 41.89 41.89 0 01-2.44 14c-.34.94-.71 1.89-1.11 2.83a52.13 52.13 0 01-4.58 8.37c-.41.61-.82 1.2-1.24 1.78l-.18.25c-.39.54-.8 1.07-1.21 1.6l-.23.29c-.4.51-.81 1-1.23 1.51l-.2.24c-.43.51-.86 1-1.3 1.48-.43.48-.86.94-1.29 1.39l-.19.2c-.41.43-.83.85-1.24 1.26-.08.08-.15.16-.23.23l-1.21 1.17-.2.18c-.41.39-.82.76-1.22 1.12l-1.18 1-.15.13c-.37.32-.73.62-1.09.91l-.18.15L52 72l-.14.11c-.68.53-1.31 1-1.86 1.4l-.07.06-.75.53h-.07l-.62.44-.5.33-.5-.33-.62-.44h-.07l-.8-.55v-.06c-.55-.4-1.17-.86-1.85-1.39L44 72l-1-.8-.23-.2q-.52-.42-1.08-.9l-.15-.1-1.17-1-1.22-1.11-.2-.2c-.4-.37-.8-.76-1.2-1.15l-.25-.24c-.4-.41-.82-.82-1.23-1.26-.07-.06-.13-.14-.2-.21l-1.31-1.43v-.06c-.43-.48-.85-1-1.28-1.47l-.22-.26c-.41-.48-.81-1-1.21-1.49a3.92 3.92 0 01-.25-.32c-.41-.51-.8-1-1.19-1.57l-.21-.29c-.4-.55-.8-1.12-1.18-1.7v-.05c-.61-.91-1.19-1.83-1.73-2.75a48.81 48.81 0 01-4-8.45A41.93 41.93 0 0121 31 27 27 0 0148 4zM13.61 51.33L22 46.75c.14.38.31.75.46 1.12s.29.71.45 1.07c.27.62.56 1.24.86 1.85.16.31.29.62.45.92.44.86.91 1.71 1.4 2.56l.1.19c.5.85 1 1.69 1.58 2.53l-2.89 21.53-.83 6.23L2.5 95.14zM29 59.43c.4.55.81 1.08 1.22 1.6l.23.31 1.21 1.49c.07.07.13.15.2.23L33 64.47l.11.12c.42.47.83.91 1.24 1.35l.25.27q.6.63 1.2 1.23l.21.21c.39.39.77.76 1.15 1.12l.1.1L38.45 70l.25.22c.37.33.73.66 1.09 1l.22.19 1 .87.08.06 1 .83.22.17.9.7.2.16.79.59.11.09.71.51.18.13.61.43.19.05.44.3.17.11.29.19.09.06v18.73l-21.4-10.56zm20 35.96V76.66l.09-.06.29-.19.17-.11.45-.3.17-.12.61-.43.18-.13.71-.52.11-.08.79-.59.2-.16.9-.7.22-.17 1-.82.11-.08 1-.86.23-.19c.36-.31.72-.63 1.09-1l.25-.23c.39-.35.77-.7 1.16-1.08l.12-.11c.37-.35.75-.72 1.13-1.1l.22-.23c.4-.39.79-.8 1.19-1.22l.27-.28c.4-.43.81-.87 1.22-1.33l.13-.15c.39-.43.77-.88 1.16-1.34l.21-.25q.6-.72 1.2-1.47l.25-.33c.41-.51.8-1 1.2-1.57v-.06l3.36 25.4zm23.42-10.64l-.83-6.23L68.74 57c.56-.84 1.08-1.69 1.58-2.54a.54.54 0 00.07-.13c.51-.86 1-1.73 1.43-2.61.15-.3.29-.6.44-.91.3-.62.6-1.24.87-1.86.16-.35.3-.71.44-1.06s.33-.75.47-1.13l8.35 4.58 11.11 43.8z"
      />
      <path
        className="map-gps_svg__cls-8"
        d="M48 52a20.92 20.92 0 0015.92-7.35.5.5 0 00.12-.13A21 21 0 1048 52zM29.05 32H39a46 46 0 00.82 7.94A25 25 0 0033 42.6 18.94 18.94 0 0129.05 32zM33 19.4a25 25 0 006.86 2.66A46 46 0 0039 30H29a18.94 18.94 0 014-10.6zM48 12c2.13 0 4.41 3.24 5.77 8.51A33.86 33.86 0 0148 21a33.86 33.86 0 01-5.77-.49C43.59 15.24 45.87 12 48 12zm0 11a36 36 0 006.21-.54A44.53 44.53 0 0155 30H41a44.53 44.53 0 01.77-7.54A36 36 0 0048 23zm19 7H57a46 46 0 00-.82-7.94A25 25 0 0063 19.4 18.94 18.94 0 0167 30zm-4 12.6a25 25 0 00-6.86-2.66A46 46 0 0057 32h10a18.94 18.94 0 01-4 10.6zM48 50c-2.13 0-4.41-3.24-5.77-8.51a34.22 34.22 0 0111.54 0C52.41 46.76 50.13 50 48 50zm0-11a36 36 0 00-6.21.54A44.53 44.53 0 0141 32h14a44.53 44.53 0 01-.77 7.54A36 36 0 0048 39zm-13.69 5.14a23.38 23.38 0 016-2.25 20.47 20.47 0 003.38 7.59 18.92 18.92 0 01-9.38-5.34zm18 5.34a20.47 20.47 0 003.38-7.59 23.38 23.38 0 016 2.25 18.92 18.92 0 01-9.35 5.34zm9.35-31.62a23.38 23.38 0 01-6 2.25 20.47 20.47 0 00-3.38-7.59 18.92 18.92 0 019.41 5.34zm-18-5.34a20.47 20.47 0 00-3.38 7.59 23.38 23.38 0 01-6-2.25 18.92 18.92 0 019.38-5.34z"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgMapGps);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;

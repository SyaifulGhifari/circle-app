import Box from '@mui/material/Box';

export default function Loading() {
  return (
    <Box>
      <svg
        style={{
          margin: 'auto',
          background: 'none',
          display: 'block',
          shapeRendering: 'auto',
        }}
        width='271px'
        height='271px'
        viewBox='0 0 100 100'
        preserveAspectRatio='xMidYMid'
      >
        <circle
          cx='50'
          cy='50'
          r='19'
          stroke-width='5'
          stroke='#1d3743'
          stroke-dasharray='29.845130209103033 29.845130209103033'
          fill='none'
          stroke-linecap='round'
        >
          <animateTransform
            attributeName='transform'
            type='rotate'
            dur='1.5384615384615383s'
            repeatCount='indefinite'
            keyTimes='0;1'
            values='0 50 50;360 50 50'
          ></animateTransform>
        </circle>
        <circle
          cx='50'
          cy='50'
          r='13'
          stroke-width='5'
          stroke='#71c9ce'
          stroke-dasharray='20.420352248333657 20.420352248333657'
          stroke-dashoffset='20.420352248333657'
          fill='none'
          stroke-linecap='round'
        >
          <animateTransform
            attributeName='transform'
            type='rotate'
            dur='1.5384615384615383s'
            repeatCount='indefinite'
            keyTimes='0;1'
            values='0 50 50;-360 50 50'
          ></animateTransform>
        </circle>
      </svg>
    </Box>
  );
}

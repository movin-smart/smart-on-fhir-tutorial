declare module 'react-mic' {
  import * as React from 'react';

  export interface ReactMicProps {
    record: boolean;
    className?: string;
    onStop: (recordedBlob: any) => void;
    onData: (data: any) => void;
    strokeColor?: string;
    backgroundColor?: string;
    mimeType?: string;
  }

  export class ReactMic extends React.Component<ReactMicProps> {}
}

// custom-types.d.ts
interface SpeechRecognition {
    new(): SpeechRecognition;
    start(): void;
    stop(): void;
    // Add other properties and methods as needed
}

declare var webkitSpeechRecognition: {
    prototype: SpeechRecognition;
    new(): SpeechRecognition;
};

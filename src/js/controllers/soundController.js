export class SoundController {
    static play(name) {
        const path = '/src/sounds';
        const sounds = {
            pop: 'pop.mp3',
            hello1: 'hello_1.mp3',
            hello2: 'hello_2.mp3',
            hello3: 'hello_3.wav',
            hello4: 'hello_4.mp3'
        };

        if (!(name in sounds)) {
            return;
        }

        let audio = new Audio(`${path}/${sounds[name]}`);
        audio.play();
    }
}

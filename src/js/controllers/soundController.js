export class SoundController {
    static play(name) {
        this.path = '/src/sounds';
        this.sounds = {
            pop: 'pop.mp3'
        };
        
        if (!(name in this.sounds)) {
            return;
        }

        let audio = new Audio(`${this.path}/${this.sounds[name]}`);
        audio.play();
    }
}

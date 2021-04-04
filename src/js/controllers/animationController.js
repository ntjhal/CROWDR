export class AnimationController {
    static drop(object) {
        if (object == null) {
            return;
        }

        object.style.transform = 'rotate(360deg)';
        object.style.transition = 'all .2s ease-in-out';
    }

    static removeTransform(object) {
        object.style.transform = null;
    }
}

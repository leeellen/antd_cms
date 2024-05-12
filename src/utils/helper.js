export const getPreview = (file, callback) => {
    if (typeof file === 'string') {
        return callback(file);
    }

    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
};

export function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

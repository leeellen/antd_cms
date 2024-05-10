export const getPreview = (file, callback) => {
    if (typeof file === 'string') {
        return callback(file);
    }

    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
};

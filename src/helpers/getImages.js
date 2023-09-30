const fs = require('node:fs/promises');
const path = require('node:path');

const getIamges = async (dirPath) => { //dirpath es una ruta dentro de src

    const formats = ['.png', '.gif', '.jpg', '.jpeg', 'webp', '.svg']

    //Leer el directorio donde estan las imagenes
    const imagesPath = path.join(__dirname, '..', dirPath);

    //leer el directorio donde estan las imagenes
    const images = await fs.readdir(imagesPath);
    const filtered = images.filter((img) => 
        formats.includes(path.extname(img)))
    return filtered.map((img) => ({
        filename : img ,
        path: `${imagesPath}/${img}` ,
        cid: img.split('.')[0]
    }))


}



module.exports = getIamges;
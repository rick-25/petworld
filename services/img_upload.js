const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const FormData = require('form-data');
const fs = require('fs');



const API_KEY = 'db861406a29ba25ad096e6a55056a15d';
const URL = 'https://api.imgbb.com/1/upload?key=' + API_KEY;


const upload_image = async (img_path) => {

    const form = new FormData();
    form.append('image', fs.createReadStream(img_path), {
        contentType: 'image/jpeg',
        filename: 'temp.jpg',
        name: 'file',
    });

    let res = await fetch(URL, {
        method: 'POST',
        body: form,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });

    res = await res.json();
    console.log(res);

};

module.exports = upload_image;
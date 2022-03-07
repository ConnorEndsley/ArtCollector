const BASE_URL = 'https://api.harvardartmuseums.org';
const KEY = 'apikey=7b7362ce-0091-4539-8838-347893a4c451';

async function fetchObjects() {
    const url = `${ BASE_URL }/object?${ KEY }`;
 
    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

fetchObjects().then(x => console.log(x));
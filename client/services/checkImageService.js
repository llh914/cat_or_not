const API_KEY ='AIzaSyAcsYaQL_6Tl7dNZ6oGlMRv1-aK5uhZY4M';
const API_URL = 'https://vision.googleapis.com/v1/images:annotate?key=' + API_KEY;

function thereIsACat(descriptions) {
    return descriptions.find((description) => {
        return description.toLowerCase().split(' ').indexOf('cat') !== -1;
    });
}

export function checkCat(image, setMessage) {
    const content = image.split(',').pop();
    const body = {
       "requests": [
         {
           "image": {
               content
            },
            "features": [
                {
                    "type": "LABEL_DETECTION"
                }
            ]
         }
       ]
     }

    const request = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(body)
    };

    return fetch(API_URL, request)
            .then(response => response.json())
            .then((response) => {
                const labels = response.responses[0].labelAnnotations
                const descriptions = labels.map((label) => {
                    return label.description;
                });

                setMessage(null, !!thereIsACat(descriptions));
            })
            .catch(() => setMessage(true));
}
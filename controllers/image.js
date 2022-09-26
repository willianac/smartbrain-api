import fetch from "node-fetch";

export const handleClarifaiCall = (req, res) => {
    const USER_ID = 'willianac';
    const PAT = '3d3dffec5b5c4a73a8968d5c5c2e2519';
    const APP_ID = 'my-first-application';
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '45fb9a671625463fa646c3523a3087d5';    
    const IMAGE_URL = req.body.input;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    .then(response => response.json())
    .then(result => res.json(result))
}

export const handleImage = (req, res, db) => {
    const id = req.body.id;
    db('users').increment('entries', 1).where('id', '=', id).returning('entries')
    .then(currentEntries => res.json(currentEntries[0]))
    .catch(err => res.json('Unable to find id')) 
}
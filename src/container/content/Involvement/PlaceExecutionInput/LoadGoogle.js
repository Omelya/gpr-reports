import {Loader} from "@googlemaps/js-api-loader";

const loadGoogle = () => {
    const loader = new Loader({
        apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        version: "weekly",
        libraries: ["places"]
    });

    loader
        .load()
        .then((google) => {
            window.place = new google.maps.places.AutocompleteService()
        })
}

export default loadGoogle;

var options = {
    enableHighAccuracy: true,
    maximumAge: 0
};
const fallbackLocation = { latitude: 48.8575, longitude: 2.2982 }
let i = 0;
function constructImageURL(photoObj) {
    return "https://farm" + photoObj.farm +
        ".staticflickr.com/" + photoObj.server +
        "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
}
function showPhotos(dataObj) {
    console.log(dataObj)
    let img = document.createElement('img')
    const button = document.getElementById("next")
    button.addEventListener("click", function () {
        if (i <= 3) {
            i++
        }
        else {
            i = 0
        }
        img.src = constructImageURL(dataObj.photos.photo[i])
        document.getElementById("photoContainer").appendChild(img)
    })

    img.src = constructImageURL(dataObj.photos.photo[i])
    document.getElementById("photoContainer").appendChild(img)

    // console.log(constructImageURL(dataObj.photos.photo[0]))   -------test to make sure img source is valid
}
function processResponse(response) {
    let dataPromise = response.json() //hydrate the data
    dataPromise.then(showPhotos)

}
function retrievePictures(coords) {
    console.log("Lat: " + coords.latitude)
    console.log("Lon: " + coords.longitude)
    const url = "https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=0d2b0694288b25933ba2393c688cf8ce&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&page=1&lat=" + coords.latitude + "&lon=" + coords.longitude + "&text=mountain"

    let fetchPromise = fetch(url)
    fetchPromise.then(processResponse)
}
function useRealLocation(pos) {
    retrievePictures(pos.coords)
}
function useFallbackLocation() {
    retrievePictures(fallbackLocation)
}
navigator.geolocation.getCurrentPosition(useRealLocation, useFallbackLocation, options);


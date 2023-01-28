module.exports = {
  name: "dog",
  code: `$title[1;A cute doggo for $username]
  $attachment[$jsonRequest[https://api.toxy.ga/api/dog;url;An error occurred while retrieving the doggo];doggo.png]
  $image[1;attachment://doggo.png]
  $color[1;RANDOM]`
}
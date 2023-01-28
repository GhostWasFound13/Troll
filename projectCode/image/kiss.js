module.exports = ({
 name: "kiss",
 category: "image",
  code: `
 
 $color[1;f1852a]
 $description[1;<@$authorID> kissed <@$mentioned[1]>]
 $image[1;$jsonRequest[https://no-api-key.com/api/v2/kiss;image;https://no-api-key.com/image/kiss/39598.gif]]
 
 $onlyIf[$mentioned[1]!=;You want to kiss yourself? or me :flushed:]`
})
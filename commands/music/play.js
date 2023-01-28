module.exports = {
    name: "play",
    $if: "v4",
    code: `
		$title[1;music is playing]
		$description[1;$replaceText[$playTrack[youtube;$message];Added; ]]
		$color[BLACK]
      $if[$hasPlayer==false]
          $joinVc
      $endif
  
      $onlyif[$voiceId!=;you need to join voice channel to play a track or music]
      `,
  };
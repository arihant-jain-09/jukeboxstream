const MusicPlayer = require('./MusicPlayer.js');
const biglist = require('./songList.js');

// console.log(biglist[0]);

musicComp = new MusicPlayer(biglist);
// musicComp.playSong('1673106654813', true);
// const songDetails = biglist[0];
// console.log(musicComp.total_Song_Count);
// musicComp.addSong(
//   'linustech',
//   'Ubuntu_2023-01-13T06:22:03.460Z.webp',
//   '1673590923465',
//   'electronic',
//   'Ubuntu',
//   'www.cover.com'
// );
// musicComp.intializeList(biglist);
console.log(musicComp.musiclist);
console.log(musicComp.playMusicFromQueue());
console.log(musicComp.getCurrentSong());
async function getPlayed() {
  const played = await musicComp.playSong('1673590923465', true);
  return played;
}
getPlayed();
console.log(musicComp.total_Song_Count);

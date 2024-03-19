const Queue = require('./Queue');
const Song = require('./Song.js');
const axios = require('axios');

module.exports = class MusicPlayer {
  constructor(songs) {
    this.musiclist = songs || [];
    this.musicQ = new Queue();
    this.total_Song_Count = songs ? songs.length : 0;
    this.isPlaying = false;
    this.currentSong = null;
    if (songs?.length > 0) {
      this.musicQ.append(songs[0]);
    }
  }
  intializeList(list) {
    return new MusicPlayer(list);
  }
  addSong(artist, s3Name, id, genre, title, cover) {
    const song = new Song(artist, cover, genre, id, s3Name, title);
    this.musiclist.splice(this.total_Song_Count, 0, song);
    this.total_Song_Count++;
  }

  addSongToQueue(id) {
    let exists = false;
    for (let i = 0; i < this.total_Song_Count; i++) {
      if (this.musiclist[i].id.S === id) {
        exists = true;
        [...this.musiclist].splice(i, 1);
        this.total_Song_Count--;
        console.log('song is present in first half');
        console.log('The song ' + this.musiclist[i].title.S);
        this.musicQ.append(this.musiclist[i]);
        this.musiclist = [...this.musiclist, this.musiclist[i]];
        this.isPlaying = true;
        return;
      }
    }
    for (let i = this.total_Song_Count; i < this.musiclist.length; i++) {
      if (this.musiclist[i].id.S === id) {
        exists = true;
        console.log('Song is present in second half');
        console.log('The song ' + this.musiclist[i].title.S);
        this.musicQ.append(this.musiclist[i]);
        this.isPlaying = true;
        return;
      }
    }
    if (!exists) {
      console.log('Song not found');
    }
  }

  playNextSong() {
    if (this.musicQ.getSize() > 0) {
      console.log(this.getCurrentSong());
      console.log(this.printQueue());
      // let val = this.musicQ.nextValue(this.currentSong);
      // this.setCurrentSong(val);
      // this.isPlaying = true;
    }
  }

  playMusicFromQueue() {
    if (this.musicQ.getSize() > 0) {
      this.setCurrentSong(this.musicQ.head);
      this.isPlaying = true;
    }
  }

  setCurrentSong(val) {
    this.currentSong = val;
  }

  getCurrentSong() {
    return this.currentSong;
  }

  playSong = async (id, addToQ) => {
    let exists = false;
    let src;
    for (let i = 0; i < this.total_Song_Count; i++) {
      if (this.musiclist[i].id.S === id) {
        try {
          const { data } = await axios.get(
            `http://localhost:5000/api/streams/${this.musiclist[i].id.S}`
          );
          // const { data } = await getM3u8(this.musiclist[i].id.S);
          if ((data.status = 200)) {
            src = data.body;
            exists = true;
            [...this.musiclist].splice(i, 1);
            this.total_Song_Count--;
            console.log('song is present in first half');
            console.log('The song ' + this.musiclist[i].title.S);
            if (addToQ) {
              let val = this.musicQ.append(this.musiclist[i]);
              this.setCurrentSong(val);
            }
            this.musiclist = [...this.musiclist, this.musiclist[i]];
            this.isPlaying = true;
          }
        } catch (error) {
          console.log(error);
        }
        return src;
      }
    }
    for (let i = this.total_Song_Count; i < this.musiclist.length; i++) {
      if (this.musiclist[i].id.S === id) {
        exists = true;
        console.log('Song is present in second half');
        console.log('The song ' + this.musiclist[i].title.S);
        if (addToQ) {
          let val = this.musicQ.append(this.musiclist[i]);
          this.isPlaying = true;
          this.setCurrentSong(val);
        }
        return;
      }
    }
    if (!exists) {
      console.log('Song not found');
    }
  };
  playRandomSong() {
    let rand_int = Math.floor(Math.random() * this.total_Song_Count);
    console.log(rand_int);
    let playingSong = this.musiclist[rand_int];
    [...this.musiclist].splice(rand_int, 1);
    this.total_Song_Count--;
    this.musicQ.append(playingSong);
    console.log('The song ' + playingSong.title.S + ' added to the queue');
    this.musiclist = [...this.musiclist, playingSong];
  }

  printQueue() {
    console.log('The current queue contains: ');
    return this.musicQ.print();
  }

  closeMusicPlayer() {
    console.log('......Close Music Player......');
    this.musicQ.head = null;
    this.total_Song_Count = this.musiclist.length;
  }
};

// player.addSong({
//   artist: {
//     S: "sugar",
//   },
//   s3Name: "Daddy_calling_2023-01-14T19:58:42.848Z.webp",
//   id: {
//     S: "1673726322855",
//   },
//   genre: {
//     L: [
//       {
//         S: "energy",
//       },
//     ],
//   },
//   title: {
//     S: "Daddy_calling",
//   },
//   cover:
//     "https://d3mr523ank7elu.cloudfront.net/Daddy_calling_2023-01-14T19:58:42.848Z/Daddy_calling_2023-01-14T19:58:42.848Z.webp?Expires=1674729243&Key-Pair-Id=K3S7F2IVCRPOE7&Signature=lzz1ih9AlCy5skGuKlx6bFIwQKLAo~kVl8Z2zYMbwYADQ2oCfuzwhi9ocar2pjtTwPgM931qaWu~E~BHu7vwzZEWXoond2bVDTaA1QFjgG93R~Tl2P7vR-hZIcn0UhhUW3xKmswdRN7QuqLnQ-Gn~GHyUyVHch7u3fdtBY34G153TzFzZ808TCkklUfE~pJhctVCu3Tgew3UiEdnKPtyVtEliFYbiTILzhrE4XamgJ3L~nca6m0jlqyPwtcckQCjBATymRIbPYehQMTojzvYqHuYRse5T~LZ8USZfMW760vZIZzL~0V6i01tYO7fUami0essuHxm7siz-PGT-yS3eQ__",
// });

// player.addSong({
//   artist: {
//     S: "linustech",
//   },
//   s3Name: "Ubuntu_2023-01-13T06:22:03.460Z.webp",
//   id: {
//     S: "1673590923465",
//   },
//   genre: {
//     L: [
//       {
//         S: "energy",
//       },
//     ],
//   },
//   title: {
//     S: "Ubuntu",
//   },
//   cover:
//     "https://d3mr523ank7elu.cloudfront.net/Ubuntu_2023-01-13T06:22:03.460Z/Ubuntu_2023-01-13T06:22:03.460Z.webp?Expires=1674729243&Key-Pair-Id=K3S7F2IVCRPOE7&Signature=t7ZlDjHF3ArNK7m42WExd20tSJWTkqBTtnbZhx7Zn7N4apImzFiIHux0LCBn2owjAjfNlgxKHn10xzeO6AOmIQo8l8Ktdh-OENfqXdaN8VeIC1epPzyJjponr5z308re64Zu6c0eslZscLgPRwbzkSXj7d2132UMCOZqPNIIqOgoOu-FAwMFvIDCQzJkD3WUY908H~AbczCmHe27m4E3jJKQFwaHI8imBG0HIMiyomZuoZ3jtlmRlDuDm5WU5zTDd8xBH2lNu~2NRMWqu~T02sdJxdbvAISXPRFVUeqnJHRGOLYuJxk3WZ7zWKhhbQUuuhr6VT9yz4NTZq2cxvOs-g__",
// });

// player.playRandomSong();
// player.playRandomSong();
// player.playRandomSong();
// player.playRandomSong();
// player.playSongFromQueue();
// console.log(player.musiclist);
// player.playSong("1673590923465", true);
// console.log(player.musicQ.peek());
// player.musicQ.dequeue();
// console.log(player.musicQ.peek());
// player.musicQ.dequeue();
// console.log(player.musicQ.peek());
// player.musicQ.dequeue();
// console.log(player.musicQ.peek());

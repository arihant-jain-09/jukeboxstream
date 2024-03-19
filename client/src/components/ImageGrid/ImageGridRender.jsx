import React from 'react';

const ImageGridRender = ({ initialSongs }) => {
  const [musiclist, setMusicList] = useState(initialSongs || []);
  const [musicQ, setMusicQueue] = useState([]);
  const [totalSongCount, setTotalSongCount] = useState(
    initialSongs ? initialSongs.length : 0
  );
  // const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    if (initialSongs && initialSongs.length > 0) {
      setMusicQueue([initialSongs[0]]);
    }
  }, [initialSongs]);

  const addSong = (artist, s3Name, id, genre, title, cover) => {
    const newSong = { artist, s3Name, id, genre, title, cover };
    setMusicList((prevList) => [...prevList, newSong]);
    setTotalSongCount((prevCount) => prevCount + 1);
  };

  const addSongToQueue = (id) => {
    const songIndex = musiclist.findIndex((song) => song.id.S === id);

    if (songIndex !== -1) {
      const updatedList = [...musiclist];
      const songToAdd = updatedList.splice(songIndex, 1)[0];

      setTotalSongCount((prevCount) => prevCount - 1);
      console.log('Song is present in the list');
      console.log('The song ' + songToAdd.title.S);
      setMusicQueue((prevQueue) => [...prevQueue, songToAdd]);
      setIsPlaying(true);
    } else {
      console.log('Song not found');
    }
  };

  const playNextSong = () => {
    if (musicQ.length > 0) {
      console.log(currentSong);
      console.log(printQueue());
      // Implement the logic to play the next song
    }
  };

  const playMusicFromQueue = () => {
    if (musicQ.length > 0) {
      setCurrentSong(musicQ[0]);
      setIsPlaying(true);
    }
  };

  // Add other functions as needed

  const printQueue = () => {
    console.log('The current queue contains: ');
    console.log(musicQ);
  };

  const closeMusicPlayer = () => {
    console.log('......Close Music Player......');
    setMusicQueue([]);
    setTotalSongCount(musiclist.length);
  };
  return <div>ImageGridRender</div>;
};

export default ImageGridRender;

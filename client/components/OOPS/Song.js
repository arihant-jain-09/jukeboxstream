module.exports = class Song {
  //constructor
  constructor(params) {
    const { artist, cover, genre, id, s3Name, title } = params;
    this.artist = artist;
    this.cover = cover;
    this.genre = genre;
    this.id = id;
    this.s3Name = s3Name;
    this.title = title;
  }

  //getter and setter
};

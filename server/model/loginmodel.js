const db = require("./model");
exports.createuser = (userdeatils, callback) => {
  let Name = userdeatils.Name;
  let Email = userdeatils.Email;
  let Password = userdeatils.Password;
  let query1 = `Select * from users where Email='${Email}'`;
  db.query(query1, (err, result) => {
    if (err) {
      callback(null, err);
      return;
    }
    console.log(result);

    if (result.length > 0) {
      // console.log(result.length);
      callback({ alreadyExists: true }, null);
      return;
    }
    let query = `Insert into users(Name,Email,Password) values ("${Name}","${Email}","${Password}")`;

    db.query(query, (err) => {
      if (err) {
        // console.log(err);
        callback(null, err);
        return;
      }
      callback();
      return;
    });
  });
};
exports.LoginUser = (Logindata, callback) => {
  const { Email, Password } = Logindata;

  let query = `SELECT * FROM users WHERE Email='${Email}'`;
  db.query(query, (err, result) => {
    if (err) {
      callback(err, null);
    }
    if (result.length > 0) {
      console.log(result);
      if (result[0].Password === Password) {
        callback(null, { Message: "Login Successfull", ...result });
        return;
      } else {
        callback(null, { Message: "Wrong password" });
        return;
      }
    } else {
      console.log(result);
      callback(null, { Message: "Invalid UserName" });
      return;
    }
  });
};

exports.getalbums = (callback) => {
  let query = `
    SELECT a.*, 
           GROUP_CONCAT(s.song_name) AS song_filenames,
           GROUP_CONCAT(s.song_id) AS song_ids
    FROM albums a
    LEFT JOIN songs s ON a.id = s.album_id
    GROUP BY a.id
  `;
  db.query(query, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      const albumsWithSongs = result.map((album) => {
        const song_filenames = album.song_filenames
          ? album.song_filenames.split(",")
          : [];
        const song_ids = album.song_ids ? album.song_ids.split(",") : [];
        const songs = song_filenames.map((song_filename, index) => ({
          song_filename,
          song_id: song_ids[index],
        }));
        return {
          id: album.id,
          title: album.title,
          genre: album.genre,
          artist: album.artist,
          coverImage: album.coverImage,
          releaseYear: album.releaseYear,
          songs,
        };
      });
      callback(null, albumsWithSongs);
    }
  });
};

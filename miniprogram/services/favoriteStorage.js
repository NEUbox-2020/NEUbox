wx.cloud.init();

var favoriteStorage = {
  db: wx.cloud.database(),

  saveFavoriteAsync: function (favorite, callback) {
    this.favoriteCollection.add({
      data: favorite,
      success: function (result) {
        callback();
      }
    })
  },

  getFavoritesAsync: function (callback) {
    this.favoriteCollection.where({ isFavorite: true }).get({
      success: function (result) {
        callback(result.data);
      }
    });
  }
};

favoriteStorage.favoriteCollection = favoriteStorage.db.collection("favorites");

module.exports = favoriteStorage;
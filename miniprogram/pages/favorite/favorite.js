// miniprogram/pages/favorite/favorite.js

var favoritePageViewModel = null;

var _favoriteStorage = require("../../services/favoriteStorage.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    favorites: []
  },

  insertButton_bindtap: function (event) {
    _favoriteStorage.saveFavoriteAsync({ isFavorite: true }, function () { });
  },

  readButton_bindtap: function (event) {
    _favoriteStorage.getFavoritesAsync(function (favorites) {
      favoritePageViewModel.setData({ favorites: favorites });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    favoritePageViewModel = this;
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
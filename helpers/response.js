module.exports = {

  notFound: function(res) {
    res.status(404).json({error: 'Not found!'});
  },

  unexpectedError: function(req, res, err) {
    console.log(req.method, req.path, err);

    res.status(500).json({error: 'Unexpected error!'});
  }
};

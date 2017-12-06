import request from 'request';

exports.github = (req, res) => {
  console.log(req.body.searched);
  request('https://jobs.github.com/positions.json?search=' + req.body.searched, function (error, response, body) {
    res.send(body);
  });
};



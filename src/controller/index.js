import request from 'request';
import model from './../database/controller';

const controller = {
  github: (req, res) => {
    console.log(req.body.searched);
    request('https://jobs.github.com/positions.json?search=' 
        + req.body.searched, function (error, response, body) {
      res.send(body);
    });
  },
  company: {
    get: (req, res) => {
      console.log('in get', req.query)
      if (Object.keys(req.query).length === 0) {
        model.company.getAll((err, data) => {
          res.status(200).send(JSON.stringify({companies: data}));
        });
      } else if (req.query.id && Object.keys(req.query).length === 1) {
        model.company.get(req.query.id,(err, data) => {
          res.status(200).send(JSON.stringify({company: data}));
        });
      } else {
        model.company.query(req.query, (err, data) => {
          res.status(200).send(JSON.stringify({companies: data}));  		
        });
      };
    },
  },
  contact: {
    get: (req, res) => {
      if (Object.keys(req.query).length === 0) {
        model.contact.getAll((err, data) => {
          res.status(200).send(JSON.stringify({contacts: data}));
        });
      } else if (req.query.id && Object.keys(req.query).length === 1) {
        model.contact.get(req.query.id,(err, data) => {
          res.status(200).send(JSON.stringify({contact: data}));
        });
      } else {
        model.contact.query(req.query, (err, data) => {
          res.status(200).send(JSON.stringify({contacts: data}));  		
        });
      };
    },
  },
  event: {
    get: (req, res) => {
      if (Object.keys(req.query).length === 0) {
        model.event.getAll((err, data) => {
          res.status(200).send(JSON.stringify({events: data}));
        });
      } else if (req.query.id && Object.keys(req.query).length === 1) {
        model.event.get(req.query.id,(err, data) => {
          res.status(200).send(JSON.stringify({event: data}));
        });
      } else {
        model.event.query(req.query, (err, data) => {
          res.status(200).send(JSON.stringify({events: data}));  		
        });
      };
    },
  },
  job: {
    get: (req, res) => {
      if (Object.keys(req.query).length === 0) {
        model.job.getAll((err, data) => {
          res.status(200).send(JSON.stringify({jobs: data}));
        });
      } else if (req.query.id && Object.keys(req.query).length === 1) {
        model.job.get(req.query.id,(err, data) => {
          res.status(200).send(JSON.stringify({job: data}));
        });
      } else {
        model.job.query(req.query, (err, data) => {
          res.status(200).send(JSON.stringify({jobs: data}));  		
        });
      };
    },
  },
  resource: {
    get: (req, res) => {
      if (Object.keys(req.query).length === 0) {
        model.resource.getAll((err, data) => {
          res.status(200).send(JSON.stringify({resources: data}));
        });
      } else if (req.query.id && Object.keys(req.query).length === 1) {
        model.resource.get(req.query.id,(err, data) => {
          res.status(200).send(JSON.stringify({resource: data}));
        });
      } else {
        model.resource.query(req.query, (err, data) => {
          res.status(200).send(JSON.stringify({resources: data}));  		
        });
      };
    },
  },
  user: {
    get: (req, res) => {
      if (Object.keys(req.query).length === 0) {
        model.user.getAll((err, data) => {
          res.status(200).send(JSON.stringify({users: data}));
        });
      } else if (req.query.id && Object.keys(req.query).length === 1) {
        model.user.get(req.query.id,(err, data) => {
          res.status(200).send(JSON.stringify({user: data}));
        });
      } else {
        model.user.query(req.query, (err, data) => {
          res.status(200).send(JSON.stringify({users: data}));  		
        });
      };
    },
  },
};
export default controller;
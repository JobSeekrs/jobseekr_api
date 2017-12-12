import { log, debug } from '../'
import request from 'request';
<<<<<<< HEAD
import db from '../database/controller';
import company from './local/company';
import contact from './local/contact';
import event from './local/event';
import job from './local/job';
import resource from './local/resource';
import user from './local/user';
import github from './external-api/github.js';
=======
<<<<<<< HEAD
import data from './../database/controller';
import company from './internal/company';
import contact from './internal/contact';
import event from './internal/event';
import job from './internal/job';
import resource from './internal/resource';
import user from './internal/user';
import github from './external/github.js';
>>>>>>> [add]

export default {
  model: db,
  company: company,
  contact: contact,
  event: event,
  job: job,
  resource: resource,
  user: user,
  github: github
};
=======
import model from './../database/controller';
import { read } from 'fs';

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
    post: (req, res) => {
      console.log('in company post', req.body);
      model.company.post(req.body, () => {
        res.status(200).send('company info posted');
      });
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
    post: (req, res) => { 
      console.log('in controller contact post', req.body);
      model.contact.post(req.body, (err, data) => {
        if (err) {
          console.log(err);
        }
        res.status(200).send('contact info inserted into DB');
      });
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
    post: (req, res) => {
      console.log('in job post', req.body);
      model.job.post(req.body, () => {
        res.status(200).send('job info posted');
      });
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
>>>>>>> [add]

import data from './../';

const TYPE = 'company';

export default  {
  get: (req, res) => {
    if (Object.keys(req.query).length === 0) {
      data.model[TYPE].getAll((err, data) => {
        res.status(200).send(JSON.stringify(data));
      });
    } else if (req.query.id && Object.keys(req.query).length === 1) {
      data.model[TYPE].get(req.query.id,(err, data) => {
        res.status(200).send(JSON.stringify(data));
      });
    } else {
      data.model[TYPE].query(req.query, (err, data) => {
        res.status(200).send(JSON.stringify(data));  		
      });  
    };
  },
};

import { log, debug } from '../../'
import request from 'request';

// export default {
//   post: (req, res) => {
//     console.log(req.body.searched);
//     request('https://jobs.github.com/positions.json?search='  + req.body.searched, 
//       function (error, response, body) {
//         res.send(body);
//       }
//     );
//   }
// };

export default {
  post: (req, res) => {
    request('https://authenticjobs.com/api/?api_key=b2a41d0ac3e14ba92be9ee4b0d810a93&format=json&method=aj.jobs.search&keywords=' + req.body.searched + '&perpage=100', 
      function (error, response, body) {
        res.send(body);
      }
    );
  }
}
const fs = require('fs');
const path = require('path');
const chalk = require('../utils/chalk-messages.js');
const axios = require("axios");
const { nextTick } = require('process');

async function returnLegacyCluster(agc_id) {

	try {
      
      const axiosRequest = axios({
         method: 'get',
         // url: `https://agcfarmlands.herokuapp.com/api/v1/agcs/?${agc_id}`,
         // url: `http://127.0.0.1:9090/api/v1/agcs/agc/?${agc_id}`,
         url: `http://127.0.0.1:9090/api/v1/agcs/`,
         crossDomain: true,
         responseType: 'application/json',
         headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            // 'Authorization': ''
         },
         data: {

         }
      });

      // GET RESPONSE FROM API CALL
      const apiResponse = await axiosRequest;
      const clusterData = JSON.stringify(apiResponse.data);
      console.log(clusterData);
      return clusterData;
	}

	catch (_error) {
		console.error(_error.message);
	};
};

exports.getAPIData = async (req, res, next) => {
   console.log(chalk.success(`called [ getAPIData ] controller fn.`))
   res.locals.returnedClusters = await returnLegacyCluster();
   // console.log(chalk.console(res.locals.returnedClusters));
   next();
}

exports.renderAGVDashboard = async (req, res, next) => {

   // console.log(chalk.console(res.locals.returnedClusters));

   console.log(chalk.success(`SUCCESSFULLY CALLED 'renderAGVDashboard' VIEW CONTROLLER FN. `));

   try {

      const fileData = fs.readFileSync(path.resolve(`${__approotdir}/localdata/parcelized-clusters.geojson`), {encoding: 'utf8'})
      const fsClusters = JSON.parse(fileData);
      console.log(fsClusters);
      
      // RENDER THE agv-dashboard.pug TEMPLATE
      res.status(200).render('agv-dashboard', {
         title: "AGV Dashboard - SSR Alpha",
         user: "NIRSAL",
         geoclustersData: fsClusters.data.parcelized_agcs,
      });

      next();

   } catch (renderAGVErr) {

      console.log(chalk.fail(`renderAGVErr: ${renderAGVErr.message}`));
   }
};

exports.renderAGVLeftSidebar = async (req, res, next) => {
   console.log(chalk.highlight(`rendering data on sidebar`))
};
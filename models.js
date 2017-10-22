const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://lvrhezkcmgixbg:45f7e32948687b185020c1e896d1f962abb50fa970cb362ffe3c08aed15feb72@ec2-107-20-255-96.compute-1.amazonaws.com:5432/db4oh5itse51u8', {
      dialect:  'postgres',
      protocol: 'postgres',
      dialectOptions: {
         ssl: true
      },
      logging:  true, //false
});


const Report = sequelize.define('report', {
  user_id: Sequelize.STRING,
  date: Sequelize.DATE,
  steps: Sequelize.INTEGER,
  activeMinutes: Sequelize.INTEGER,
  caloriesOut: Sequelize.INTEGER,
  distance: Sequelize.INTEGER,
  floors: Sequelize.INTEGER
});


const Challenge = sequelize.define('report', {
  user_id: Sequelize.STRING,
  startDate: Sequelize.DATE,
  endDate: Sequelize.DATE,
  title: Sequelize.STRING,
  amount_usd: Sequelize.INTEGER
});

exports.getModels = function() {
    return new Promise(function(resolve, reject) {
        sequelize.sync().then(function() {
          resolve({
              Report: Report,
              Challenge: Challenge
          });
        });
    });
};

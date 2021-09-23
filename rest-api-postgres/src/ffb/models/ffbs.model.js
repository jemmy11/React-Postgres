const sequelize = require('../../common/services/sequelize.service').sequelize;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const FFB = sequelize.define('ffbs', 
	{
		id: {
			  type: Sequelize.UUID,
			  defaultValue: Sequelize.UUIDV4,
			  allowNull: false,
			  primaryKey: true
			},
		estate: Sequelize.STRING,
		harvestDate: Sequelize.DATEONLY,
		ripe: Sequelize.INTEGER,
		unripe: Sequelize.INTEGER,
		rotten: Sequelize.INTEGER,
		underripe: Sequelize.INTEGER,
		overripe: Sequelize.INTEGER,
	});
	
FFB.sync({ force: true })
  .then(() => {
    console.log('FFB is created');
	
	FFB.bulkCreate([
      { estate: 'A', harvestDate: '2021-09-01', ripe: 120, unripe: 10, rotten: 2, underripe: 5, overripe: 15 },
      { estate: 'A', harvestDate: '2021-09-02', ripe: 200, unripe: 8, rotten: 0, underripe: 6, overripe: 10 },
      { estate: 'A', harvestDate: '2021-09-03', ripe: 150, unripe: 0, rotten: 3, underripe: 5, overripe: 0 },
      { estate: 'A', harvestDate: '2021-09-04', ripe: 250, unripe: 10, rotten: 5, underripe: 35, overripe: 15 },
      { estate: 'A', harvestDate: '2021-09-05', ripe: 220, unripe: 1, rotten: 2, underripe: 5, overripe: 5 },
      { estate: 'B', harvestDate: '2021-09-01', ripe: 100, unripe: 0, rotten: 0, underripe: 0, overripe: 10 },
      { estate: 'B', harvestDate: '2021-09-02', ripe: 320, unripe: 10, rotten: 6, underripe: 5, overripe: 15 },
      { estate: 'B', harvestDate: '2021-09-03', ripe: 220, unripe: 0, rotten: 2, underripe: 15, overripe: 5 },
      { estate: 'B', harvestDate: '2021-09-04', ripe: 250, unripe: 10, rotten: 3, underripe: 5, overripe: 15 },
      { estate: 'B', harvestDate: '2021-09-05', ripe: 175, unripe: 3, rotten: 2, underripe: 17, overripe: 25 },
      { estate: 'C', harvestDate: '2021-09-01', ripe: 420, unripe: 10, rotten: 8, underripe: 5, overripe: 15 },
      { estate: 'C', harvestDate: '2021-09-02', ripe: 320, unripe: 8, rotten: 10, underripe: 18, overripe: 25 },
      { estate: 'C', harvestDate: '2021-09-03', ripe: 220, unripe: 15, rotten: 7, underripe: 23, overripe: 17 },
      { estate: 'C', harvestDate: '2021-09-04', ripe: 150, unripe: 0, rotten: 4, underripe: 7, overripe: 14 },
      { estate: 'C', harvestDate: '2021-09-05', ripe: 120, unripe: 9, rotten: 2, underripe: 5, overripe: 0 }
    ]);
});

exports.findByFilter = (filterData) => {
	if(filterData.estate !== undefined && filterData.harvestDate !== undefined) {
		return FFB.findAll({ attributes: ['estate', 'harvestDate', 'ripe', 'unripe', 'rotten', 'underripe', 'overripe'],
				where: {
				  estate: {
					[Op.or]: [].concat(filterData.estate)
				  },
				  harvestDate: filterData.harvestDate
				}
			})
			.then(function(ffbs) {
			return ffbs;
		});
	}
	else if(filterData.harvestDate !== undefined) {
		return FFB.findAll({ attributes: ['estate', 'harvestDate', 'ripe', 'unripe', 'rotten', 'underripe', 'overripe'],
				where: { harvestDate: filterData.harvestDate }
			})
			.then(function(ffbs) {
			return ffbs;
		});
	}
	else if(filterData.estate !== undefined) {
		return FFB.findAll({ attributes: ['estate', 'harvestDate', 'ripe', 'unripe', 'rotten', 'underripe', 'overripe'],
				where: {
				  estate: {
					[Op.or]: [].concat(filterData.estate)
				  }
				}
			})
			.then(function(ffbs) {
			return ffbs;
		});
	}
	else {
		return FFB.findAll({ attributes: ['estate', 'harvestDate', 'ripe', 'unripe', 'rotten', 'underripe', 'overripe'] })
			.then(function(ffbs) {
			return ffbs;
		});
	}
};


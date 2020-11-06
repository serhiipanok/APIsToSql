'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tests', {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER
      // },
      name: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      ask: {
        type: Sequelize.FLOAT
      },
      baseCurrency: {
        type: Sequelize.STRING
      },
      basket: {
        type: Sequelize.TEXT
      },      
      bid: {
        type: Sequelize.FLOAT
      },      
      change1h: {
        type: Sequelize.FLOAT
      },      
      change24h: {
        type: Sequelize.FLOAT
      },      
      changeBod: {
        type: Sequelize.FLOAT
      },       
      description: {
        type: Sequelize.STRING
      },      
      enabled: {
        type: Sequelize.BOOLEAN
      },      
      expired: {
        type: Sequelize.BOOLEAN
      },      
      expiry: {
        type: Sequelize.DATE
      },          
      expiryDescription: {
        type: Sequelize.STRING
      },      
      group: {
        type: Sequelize.STRING
      },      
      imfFactor: {
        type: Sequelize.FLOAT
      },      
      index: {
        type: Sequelize.FLOAT
      },      
      last: {
        type: Sequelize.FLOAT
      },      
      lowerBound: {
        type: Sequelize.FLOAT
      }, 
      marginPrice: {
        type: Sequelize.FLOAT
      },      
      mark: {
        type: Sequelize.FLOAT
      },       
      minProvideSize: {
        type: Sequelize.FLOAT
      },      
      moveStart: {
        type: Sequelize.STRING
      },      
      perpetual: {
        type: Sequelize.BOOLEAN
      },      
      positionLimitWeight: {
        type: Sequelize.FLOAT
      },
      postOnly: {
        type: Sequelize.BOOLEAN
      },      
      price: {
        type: Sequelize.FLOAT
      },      
      priceIncrement: {
        type: Sequelize.FLOAT
      },      
      quoteCurrency: {
        type: Sequelize.STRING
      },      
      quoteVolume24h: {
        type: Sequelize.FLOAT
      },      
      restricted: {
        type: Sequelize.BOOLEAN
      },      
      sizeIncrement: {
        type: Sequelize.FLOAT
      },      
      type: {
        type: Sequelize.STRING
      },
      underlying: {
        type: Sequelize.STRING
      },      
      underlyingDescription: {
        type: Sequelize.STRING
      },
      volumeUsd24h: {
        type: Sequelize.FLOAT
      },      
      underlyingMark: {
        type: Sequelize.FLOAT
      },      
      totalNav: {
        type: Sequelize.FLOAT
      },      
      totalCollateral: {
        type: Sequelize.FLOAT
      },      
      targetComponents: {
        type: Sequelize.TEXT
      },      
      pricePerShare: {
        type: Sequelize.FLOAT
      },      
      positionsPerShare: {
        type: Sequelize.STRING
      },      
      positionPerShare: {
        type: Sequelize.FLOAT
      },      
      outstanding: {
        type: Sequelize.FLOAT
      },      
      leverage: {
        type: Sequelize.FLOAT
      },      
      currentLeverage: {
        type: Sequelize.FLOAT
      },      
      contractAddress: {
        type: Sequelize.STRING
      },      
      bep2AssetName: {
        type: Sequelize.STRING
      },      
      volume: {
        type: Sequelize.FLOAT
      },      
      upperBound: {
        type: Sequelize.FLOAT
      }, 
      greeks: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tests');
  }
};

const CronJob = require("cron").CronJob;
const moment = require("moment");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const testdb = require("./models").Tests;
const service = require("./service");

let settings;
let configs;

const TIME_TO_SCHEDULE = "1 * * * * *";
const localTimeZone = moment.tz.guess();

try {
  settings = require("./config/setting.json");
  configs = require("./config/config.json");
} catch (e) {
  console.log(
    `[${moment(new Date()).format(
      "YYYY-MM-DD HH:mm:ss"
    )}] :: Error importing settings: `,
    e
  );
}

if (testdb === undefined) console.log("There is no table!");
else
  console.log(
    `MySQL server Connected!\n user name: ${configs.development.username}\n password: ${configs.development.password}`
  );

class Cron {
  init() {
    if (settings && settings.cronSettings) {
      let timeZone = settings.cronSettings.timezone
        ? settings.cronSettings.timezone
        : localTimeZone;
      if (settings.cronSettings.enabled) {
        this.processImportTasks();
        this.initAutoTasksProcess(timeZone);
      } else {
        console.log(
          `[${moment(new Date()).format(
            "YYYY-MM-DD HH:mm:ss"
          )}] :: Cron is disabled by settings configuration.`
        );
      }
    } else {
      console.log(
        `[${moment(new Date()).format(
          "YYYY-MM-DD HH:mm:ss"
        )}] :: Cron settings are missing, check /config/settings.js`
      );
    }
  }
  // to process/generate tasks based on auto-tasks rules
  initAutoTasksProcess(timeZone) {
    let job = new CronJob(
      TIME_TO_SCHEDULE,
      async () => {
        this.processImportTasks();
      },
      null,
      true,
      timeZone
    );
    console.log(
      `[${moment(new Date()).format(
        "YYYY-MM-DD HH:mm:ss"
      )}] :: Cron init SCHEDULE Tasks job: ${
        job.running
      }, timezone: ${timeZone}`
    );
  }

  mergeArray(data) {
    const newDatas = data.map((item) => {
      if (Object.keys(item).includes("targetComponents")) {
        let targetComponents = item.targetComponents.join(";");
        return { ...item, targetComponents };
      } else return item;
    });
    return newDatas;
  }

  async processImportTasks() {
    const firstData = await service.getData("markets");
    const secondData = await service.getData("futures");
    const newData = await service.getData("etfs");
    const thirdData = this.mergeArray(newData);
    try {
      let newSecondData = secondData;
      let nameArray = secondData.map((item) => item.name);
      let newArray = firstData.filter((item) => !nameArray.includes(item.name));
      newSecondData.push(...newArray);

      nameArray = newSecondData.map((item) => item.name);
      newArray = thirdData.filter(
        (item) => !nameArray.includes(item.name)
      );

      newSecondData.push(...newArray);
      nameArray = newSecondData.map((item) => item.name);

      let currentNameArray = await testdb.findAll({
        attributes: ["name"],
        where: {
          name: {
            [Op.in]: nameArray,
          },
        },
      });

      let newMarketAndFutureDatas = [];
      if (currentNameArray && currentNameArray.length > 0) {
        nameArray = currentNameArray.map((item) => item.getDataValue("name"));
        newMarketAndFutureDatas = newSecondData.filter(
          (item) => !nameArray.includes(item.name)
        );
        await testdb.bulkCreate(newMarketAndFutureDatas);
      } else await testdb.bulkCreate(newSecondData);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new Cron();

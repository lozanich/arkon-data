import faker from "faker";
import moment from "moment";

export const buildFakeTask = () => {
  const totalDuration = Math.floor(Math.random() * (3600 - 2880 + 1) + 2880);
  const advance = (totalDuration / 100) * 80 + Math.floor(Math.random() * 300);
  const percentAdvance = (100 * advance) / totalDuration;
  const dateBetwwen = faker.date.between(
    moment().add(-4, "week").format("YYYY-MM-DD"),
    moment().format("YYYY-MM-DD")
  );

  return {
    id: faker.datatype.uuid(),
    name: faker.lorem.word(),
    description: faker.lorem.sentence(),
    duration: totalDuration,
    advance,
    percentAdvance,
    done: percentAdvance === 100 ? true : false,
    status: "stop", // cases: stop, pause, start
    finishedAt: "",
    createdAt: dateBetwwen,
    updatedAt: dateBetwwen,
  };
};

import faker from "faker";

export const buildFakeTask = () => {
  const totalDuration = Math.floor(Math.random() * (3600 - 2880 + 1) + 2880);
  const advance = (totalDuration / 100) * 80 + Math.floor(Math.random() * 300);
  const percentAdvance = (100 * advance) / totalDuration;

  return {
    id: faker.datatype.uuid(),
    name: faker.lorem.word(),
    description: faker.lorem.sentence(),
    duration: totalDuration,
    advance,
    percentAdvance,
    done: percentAdvance === 100 ? true : false,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  };
};

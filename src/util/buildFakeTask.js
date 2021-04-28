import faker from "faker";

export const buildFakeTask = () => {
  const totalDuration = Math.floor(Math.random() * (60 - 48 + 1) + 48);
  const advance = (totalDuration / 100) * 80 + Math.floor(Math.random() * 5);
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

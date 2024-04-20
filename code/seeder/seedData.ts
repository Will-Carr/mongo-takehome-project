import { seedProducts } from "./seedProducts"


const seedData = async () => {
  await seedProducts();
};

export default seedData;

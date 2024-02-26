import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

// prismaClient.$use(async (params, next) => {
//   const model = params.model;
//   const action = params.action;

//   const result = await next(params);

//   if (model === "User" && action === "create") {
//     const user = result as User;

//     await prismaClient.userProfile.create({
//       data: {
//         userId: user.id,
//         nickname: fakerKO.internet.displayName(),
//         oneLiner: "한줄 소개를 입력하세요",
//       },
//     });
//   }
//   return result;
// });

export default prismaClient;

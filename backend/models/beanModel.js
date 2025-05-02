import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllBeans = () => prisma.bean.findMany();
export const getBeanById = (id) => prisma.bean.findUnique({ where: { id: Number(id) } });
export const createBean = (data) => prisma.bean.create({ data });
export const updateBean = (id, data) => prisma.bean.update({ where: { id: Number(id) }, data });
export const deleteBean = (id) => prisma.bean.delete({ where: { id: Number(id) } });

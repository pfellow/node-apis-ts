import prisma from '../db';

// Get all
export const getProducts = async (req: any, res: any) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id
    },
    include: {
      products: true
    }
  });

  res.json({ data: user?.products });
};

//Get one
export const getOneProduct = async (req: any, res: any) => {
  const prodId = req.params.id;
  const product = await prisma.product.findFirst({
    where: { id: prodId, belongsToId: req.user.id }
  });

  res.json({ data: product });
};

//Create product
export const createProduct = async (req: any, res: any, next: any) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id
      }
    });
    res.json({ data: product });
  } catch (err) {
    next(err);
  }
};

//Update product
export const updateProduct = async (req: any, res: any) => {
  const updatedProduct = await prisma.product.update({
    where: {
      id: req.params.id,
      belongsToId: req.user.id
    },
    data: {
      name: req.body.name
    }
  });
  res.json({ data: updatedProduct });
};

//Delete product
export const deleteProduct = async (req: any, res: any) => {
  const deletedProduct = await prisma.product.delete({
    where: {
      id: req.params.id,
      belongsToId: req.user.id
    }
  });
  res.json({ data: deletedProduct });
};

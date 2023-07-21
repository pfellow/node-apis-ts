import prisma from '../db';

// Get all
export const getUpdates = async (req: any, res: any) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id
    },
    include: {
      updates: true
    }
  });

  const updates = products.reduce((allUpdates: any, product: any) => {
    return [...allUpdates, ...product.updates];
  }, []);

  res.json({ data: updates });
};

//Get one
export const getOneUpdate = async (req: any, res: any) => {
  const updateID = req.params.id;
  const update = await prisma.update.findUnique({
    where: { id: updateID }
  });

  res.json({ data: update });
};

//Create update
export const createUpdate = async (req: any, res: any) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productID
    }
  });

  if (!product) {
    return res.json({ message: 'No product found!' });
  }

  const update = await prisma.update.create({
    data: req.body
  });

  res.json({ data: update });
};

//Update
export const updateUpdate = async (req: any, res: any) => {
  const updateID = req.params.id;

  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id
    },
    include: {
      updates: true
    }
  });

  const updates = products.reduce((allUpdates: any, product: any) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const match = updates.find((update) => update.id === updateID);

  if (!match) {
    res.status(400);
    res.json({ message: 'No products or updates found!' });
  }

  const updatedProduct = await prisma.update.update({
    where: {
      id: updateID
    },
    data: req.body
  });
  res.json({ data: updatedProduct });
};

//Delete product
export const deleteUpdate = async (req: any, res: any) => {
  const updateID = req.params.id;

  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id
    },
    include: {
      updates: true
    }
  });

  const updates = products.reduce((allUpdates: any, product: any) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const match = updates.find((update) => update.id === updateID);

  if (!match) {
    res.status(400);
    res.json({ message: 'No products or updates found!' });
  }

  const deletedUpdate = await prisma.update.delete({
    where: {
      id: updateID
    }
  });
  res.json({ data: deletedUpdate });
};

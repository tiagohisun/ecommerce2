import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, MongoClientOptions, ObjectId } from 'mongodb';

const uri = 'mongodb://127.0.0.1:27017/ecommerce2';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as MongoClientOptions);

  try {
    await client.connect();
    const db = client.db('ecommerce2');
    const productsCollection = db.collection('products');

    if (req.method === 'GET') {
      const products = await productsCollection.find().toArray();
      res.status(200).json(products);
    } else if (req.method === 'POST') {
      const newProduct = req.body;
      const result = await productsCollection.insertOne(newProduct);
      res.status(201).json({ ...newProduct, _id: result.insertedId });
    } else if (req.method === 'DELETE') {
      const { productId } = req.query;
      if (typeof productId === 'string') {
        const result = await productsCollection.deleteOne({ _id: new ObjectId(productId) });
        res.status(200).json({ deletedCount: result.deletedCount });
      } else {
        res.status(400).json({ error: 'Invalid product ID' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error processing request' });
  } finally {
    await client.close();
  }
};

export default handler;

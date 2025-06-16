// pages/api/cards.js

import { runCors } from "@/lib/cors"; // Adjust the path if necessary

let cardData = [
  { id: 1, title: 'Card 1', description: 'Description for card 1', price: 100 },
  { id: 2, title: 'Card 2', description: 'Description for card 2', price: 200 },
  { id: 3, title: 'Card 3', description: 'Description for card 3', price: 300 },
];

export default async (req, res) => {
  // Apply CORS middleware
  await runCors(req, res, () => {});

  switch (req.method) {
    case 'GET':
      // Return the list of cards
      res.status(200).json(cardData);
      break;

    case 'POST':
      // Handle adding a new card
      const { title, description, price } = req.body;

      if (!title || !description || !price) {
        return res.status(400).json({ error: 'Please provide title, description, and price' });
      }

      const newCard = {
        id: cardData.length + 1,
        title,
        description,
        price,
      };

      cardData.push(newCard);
      res.status(201).json(newCard); // Return the newly created card
      break;

    case 'PUT':
      // Handle updating an existing card
      const { id, updatedTitle, updatedDescription, updatedPrice } = req.body;

      const cardIndex = cardData.findIndex((card) => card.id === id);
      if (cardIndex === -1) {
        return res.status(404).json({ error: 'Card not found' });
      }

      const updatedCard = {
        id,
        title: updatedTitle,
        description: updatedDescription,
        price: updatedPrice,
      };

      cardData[cardIndex] = updatedCard;
      res.status(200).json(updatedCard); // Return the updated card
      break;

    case 'DELETE':
      // Handle deleting a card
      const { cardId } = req.body;

      const deleteIndex = cardData.findIndex((card) => card.id === cardId);
      if (deleteIndex === -1) {
        return res.status(404).json({ error: 'Card not found' });
      }

      cardData.splice(deleteIndex, 1);
      res.status(204).end(); // No content, successful deletion
      break;

    default:
      // Method not allowed
      res.status(405).json({ error: 'Method Not Allowed' });
  }
};

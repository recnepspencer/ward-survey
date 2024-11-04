// src/utils/createController.ts

import { NextResponse } from 'next/server';
import {
  createItem,
  findManyItems,
  findUniqueItem,
  updateItem,
  deleteItem,
} from '../services/crudService';
import { ModelName } from '../types/prisma';

interface HandlerOptions {
  model: ModelName;
  validate?: (data: any) => any; // Optional validation function
  customGetAll?: (items: any[]) => any; // Optional custom formatting for getAll
  customGetById?: (item: any) => any; // Optional custom formatting for getById
  createFunction?: (data: any, req?: Request) => Promise<any>;
}

export const createControllers = ({
  model,
  validate,
  customGetAll,
  customGetById,
  createFunction,
}: HandlerOptions) => {
  
  // GET handler: Fetch one or all items
  const getHandler = async (req: Request) => {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (id) {
      const item = await findUniqueItem(model, { id });
      if (!item) {
        return NextResponse.json({ error: `${model} not found` }, { status: 404 });
      }
      // Apply custom formatting if provided
      if (customGetById) {
        return NextResponse.json(customGetById(item));
      }
      return NextResponse.json(item);
    } else {
      const items = await findManyItems(model);
      // Apply custom formatting if provided
      if (customGetAll) {
        return NextResponse.json(customGetAll(items));
      }
      return NextResponse.json(items);
    }
  };

  // POST handler: Create a new item
  const postHandler = async (req: Request) => {
    let data = await req.json();
    if (validate) {
      try {
        data = validate(data);
      } catch (error) {
        return NextResponse.json({ error: 'Validation failed', details: error }, { status: 400 });
      }
    }

    // Use the custom create function if provided, passing `data` and `req`
    let newItem;
    try {
      if (createFunction) {
        newItem = await createFunction(data, req); // Pass `req` here
      } else {
        newItem = await createItem(model, data);
      }
    } catch (error) {
      throw error; // Let the errorHandler handle it
    }

    // Exclude sensitive fields or apply custom formatting
    if (customGetById) {
      newItem = customGetById(newItem);
    }

    return NextResponse.json(newItem, { status: 201 });
  };




  // PUT handler: Update an existing item
  const putHandler = async (req: Request) => {
    const data = await req.json();
    const { id, ...updateData } = data;
    if (!id) {
      return NextResponse.json({ error: `${model} ID is required` }, { status: 400 });
    }
    const updatedItem = await updateItem(model, { id }, updateData);
    return NextResponse.json(updatedItem);
  };

  // DELETE handler: Delete an item
  const deleteHandler = async (req: Request) => {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: `${model} ID is required` }, { status: 400 });
    }
    await deleteItem(model, { id });
    return NextResponse.json({ message: `${model} deleted successfully` }, { status: 200 });
  };

  return { getHandler, postHandler, putHandler, deleteHandler };
};

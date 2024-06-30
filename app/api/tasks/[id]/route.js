import { dbConnect } from "../../../../utils/connection/connection";
import { NextResponse } from "next/server";
import { Todo } from "../../../../utils/model/model";

/**
 * This function updates a todo item in a database using a PATCH request.
 * @param request - The `request` parameter is the HTTP request object that contains information about
 * the incoming request, such as headers, body, and query parameters.
 * @returns a JSON response. If the update operation is successful, it will return the updated todo
 * object. If there is an error, it will return the error message.
 */
export async function PATCH(request, { params }) {
  await dbConnect();
  const id = params.id;
  const body = await request.json();
  try {
    const todo = await Todo.findByIdAndUpdate(id, body);
    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error.massage);
  }
}

/**
 * The above function is an asynchronous function that deletes a todo item from a database using its
 * ID.
 * @returns a JSON response. If the deletion of the todo item is successful, it will return the deleted
 * todo item as a JSON object. If there is an error, it will return the error message as a JSON object.
 */
export async function DELETE(request, { params }) {
  await dbConnect();
  const id = params.id;
  try {
    const todo = await Todo.findByIdAndDelete(id);
    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error.massage);
  }
}

/**
 * The above function is an asynchronous function that retrieves a todo item by its ID from a database
 * and returns it as a JSON response.
 * @returns The code is returning a JSON response. If the `Todo` is found, it will return the `todo`
 * object as a JSON response. If there is an error, it will return the error message as a JSON
 * response.
 */
export async function GET(request,{ params }) {
  await dbConnect();
  const id = params.id;
  try {
    const todo = await Todo.findById(id);
    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error.massage);
  }
}

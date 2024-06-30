import { dbConnect } from "@/utils/connection/connection";
import { Todo } from "@/utils/model/model";
import { NextResponse } from "next/server";

/**
 * The above function is an asynchronous function that retrieves seat status data from a database and
 * returns it as a JSON response.
 * @returns a JSON response with the seatstatus data and a status code of 200 if the Todo.find()
 * operation is successful. If there is an error, it returns a JSON response with an error message and
 * a status code of 404.
 */
export const GET = async () => {
  await dbConnect();
  try {
    const seatstatus = await Todo.find();
    console.log("seatstatus",seatstatus)
    return NextResponse.json({ seatstatus }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { massage: `request failed due to ${error.massage}`},
      { status: 404 }
    );
  }
};

/**
 * This JavaScript function handles a POST request to create a new task in a Todo database.
 * @param request - The `request` parameter is the HTTP request object that contains information about
 * the incoming request, such as the request method, headers, and body. In this code snippet, it is
 * used to extract the JSON body of the request using the `request.json()` method.
 * @returns The code is returning a JSON response with the created tasks if the creation is successful,
 * along with a status code of 200. If there is an error, it returns a JSON response with an error
 * message and a status code of 404.
 */
export const POST = async (request) => {
  await dbConnect();
  const body = await request.json();
  try {
    const tasks = await Todo.create(body);
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { massage: `request failed due to ${error.massage} ` },
      { status: 404 }
    );
  }
};

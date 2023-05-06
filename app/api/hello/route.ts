export async function GET(req:Request){
 console.log("Hi from Hello Route");
 return new Response("Hello");
}
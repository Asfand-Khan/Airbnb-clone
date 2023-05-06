export async function POST(req:Request){
    const body =await req.json(); 
    console.log(body);
    return new Response("Post Route");
}

export async function GET(){
    console.log("Hi from Blah Get");
}